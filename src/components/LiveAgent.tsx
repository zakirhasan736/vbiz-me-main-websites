'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Loader2, Volume2, MicOff, AlertCircle } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, StartSensitivity, EndSensitivity } from '@google/genai';
import {
  createMicProcessingChain,
  encodeMicChunk,
  LIVE_AGENT_MIC_CONSTRAINTS,
  LIVE_AGENT_VAD,
} from '@/lib/live-agent-audio';
import {
  buildAgentSilenceRecoveryNudge,
  buildUserSilenceNudge,
  detectUserSpeechLevel,
  LIVE_AGENT_AGENT_SILENCE_MS,
  LIVE_AGENT_NUDGE_COOLDOWN_MS,
  LIVE_AGENT_USER_SILENCE_MS,
  LIVE_AGENT_USER_SPEECH_THRESHOLD,
} from '@/lib/live-agent-conversation';
import {
  buildLiveAgentSystemPrompt,
  DEFAULT_CARD_DATA,
  LIVE_AGENT_GREETING_TEXT,
  LIVE_AGENT_GREETING_TRIGGER,
} from '@/lib/live-agent-prompt';
import { LIVE_AGENT_AVATAR, LIVE_AGENT_VOICE } from '@/lib/site-assets';

const SYSTEM_PROMPT = buildLiveAgentSystemPrompt(DEFAULT_CARD_DATA, undefined, {
  voice: true,
});

async function resolveLiveAgentApiKey(): Promise<string> {
  const bakedKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || '';
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost && bakedKey) return bakedKey;

  try {
    const response = await fetch('/api/live-agent/config', { cache: 'no-store' });
    const data = (await response.json()) as { apiKey?: string; message?: string };
    if (response.ok && data.apiKey) return data.apiKey;
    if (bakedKey) return bakedKey;
    throw new Error(data.message || 'Set GEMINI_API_KEY in .env and restart the app.');
  } catch (err) {
    if (bakedKey) return bakedKey;
    throw err instanceof Error ? err : new Error('Could not load Live Agent config.');
  }
}

type LiveAgentProps = {
  initialOpen?: boolean;
  autoConnect?: boolean;
};

export function LiveAgent({ initialOpen = false, autoConnect = false }: LiveAgentProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [keyReady, setKeyReady] = useState(false);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const pcmContextRef = useRef<AudioContext | null>(null);
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  
  const nextStartTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const checkSpeakingRef = useRef<number>(0);
  const _lastAudioTime = useRef<number>(0);
  const isMutedRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const aiRef = useRef<GoogleGenAI | null>(null);
  const isConnectedRef = useRef(false);
  const isConnectingRef = useRef(false);
  const lastUserActivityRef = useRef(0);
  const lastNudgeSentRef = useRef(0);
  const userSilenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const agentSilenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeCountRef = useRef(0);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  const clearSilenceTimers = () => {
    if (userSilenceTimerRef.current) {
      clearTimeout(userSilenceTimerRef.current);
      userSilenceTimerRef.current = null;
    }
    if (agentSilenceTimerRef.current) {
      clearTimeout(agentSilenceTimerRef.current);
      agentSilenceTimerRef.current = null;
    }
  };

  const sendConversationNudge = (text: string) => {
    if (!sessionRef.current || !isConnectedRef.current) return;

    const now = Date.now();
    if (now - lastNudgeSentRef.current < LIVE_AGENT_NUDGE_COOLDOWN_MS) return;
    if (isSpeakingRef.current) return;

    lastNudgeSentRef.current = now;
    nudgeCountRef.current += 1;

    try {
      if (typeof sessionRef.current.sendRealtimeInput === 'function') {
        sessionRef.current.sendRealtimeInput({ text });
      } else if (typeof sessionRef.current.send === 'function') {
        sessionRef.current.send({ text });
      }
    } catch (e) {
      console.warn('Could not send conversation nudge:', e);
    }
  };

  const scheduleUserSilenceNudge = () => {
    if (userSilenceTimerRef.current) {
      clearTimeout(userSilenceTimerRef.current);
    }

    userSilenceTimerRef.current = setTimeout(() => {
      userSilenceTimerRef.current = null;
      const quietFor = Date.now() - lastUserActivityRef.current;
      if (quietFor < LIVE_AGENT_USER_SILENCE_MS - 800) return;
      if (isSpeakingRef.current || isMutedRef.current) return;
      sendConversationNudge(buildUserSilenceNudge());
    }, LIVE_AGENT_USER_SILENCE_MS);
  };

  const scheduleAgentSilenceRecovery = () => {
    if (agentSilenceTimerRef.current) {
      clearTimeout(agentSilenceTimerRef.current);
    }

    agentSilenceTimerRef.current = setTimeout(() => {
      agentSilenceTimerRef.current = null;
      if (isSpeakingRef.current) return;
      const sinceUser = Date.now() - lastUserActivityRef.current;
      if (sinceUser > LIVE_AGENT_AGENT_SILENCE_MS + 3000) return;
      sendConversationNudge(buildAgentSilenceRecoveryNudge());
    }, LIVE_AGENT_AGENT_SILENCE_MS);
  };

  const noteUserSpeech = () => {
    const wasIdle = Date.now() - lastUserActivityRef.current > 900;
    lastUserActivityRef.current = Date.now();

    if (userSilenceTimerRef.current) {
      clearTimeout(userSilenceTimerRef.current);
      userSilenceTimerRef.current = null;
    }

    if (wasIdle && !isSpeakingRef.current && !isMutedRef.current) {
      scheduleAgentSilenceRecovery();
    }
  };

  useEffect(() => {
    const unlockAudio = () => {
      void pcmContextRef.current?.resume();
      void audioContextRef.current?.resume();
    };

    document.addEventListener('click', unlockAudio, { once: true, passive: true });
    document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    document.addEventListener('keydown', unlockAudio, { once: true, passive: true });

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    void resolveLiveAgentApiKey()
      .then((key) => {
        if (cancelled) return;
        aiRef.current = new GoogleGenAI({ apiKey: key });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Could not load Live Agent config.');
      })
      .finally(() => {
        if (!cancelled) setKeyReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!autoConnect || !keyReady || !aiRef.current) return;

    setIsOpen(true);
    void startConnection();
  }, [autoConnect, keyReady]);

  useEffect(() => {
    const onPageHide = () => disconnect();
    window.addEventListener('pagehide', onPageHide);

    return () => {
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  const initAudioOutput = () => {
    if (!pcmContextRef.current) {
      pcmContextRef.current = new AudioContext({ sampleRate: 24000, latencyHint: 'interactive' });
      nextStartTimeRef.current = pcmContextRef.current.currentTime;
    }
  };

  const playChunk = (audioBuffer: AudioBuffer) => {
    const pcmContext = pcmContextRef.current;
    if (!pcmContext) return;

    if (agentSilenceTimerRef.current) {
      clearTimeout(agentSilenceTimerRef.current);
      agentSilenceTimerRef.current = null;
    }

    if (pcmContext.state === 'suspended') void pcmContext.resume();
    const source = pcmContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(pcmContext.destination);

    source.onended = () => {
      scheduledSourcesRef.current = scheduledSourcesRef.current.filter((s) => s !== source);
    };
    scheduledSourcesRef.current.push(source);

    if (nextStartTimeRef.current < pcmContext.currentTime) {
      nextStartTimeRef.current = pcmContext.currentTime;
    }
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
    _lastAudioTime.current = Date.now() + Math.ceil(audioBuffer.duration * 1000);
  };

  const monitorSpeaking = () => {
    const isCurrentlySpeaking = Date.now() < _lastAudioTime.current;
    if (isCurrentlySpeaking !== isSpeaking) {
      setIsSpeaking(isCurrentlySpeaking);
      if (!isCurrentlySpeaking && isConnectedRef.current) {
        scheduleUserSilenceNudge();
      }
    }
    checkSpeakingRef.current = requestAnimationFrame(monitorSpeaking);
  };

  const disconnect = () => {
    clearSilenceTimers();
    try {
      if (sessionRef.current) {
        sessionRef.current.close();
        sessionRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      if (processorRef.current) {
        processorRef.current.onaudioprocess = null;
        processorRef.current.disconnect();
        processorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (pcmContextRef.current) {
         pcmContextRef.current.close();
         pcmContextRef.current = null;
      }
      if (checkSpeakingRef.current) {
        cancelAnimationFrame(checkSpeakingRef.current);
      }
    } catch (e) {
      console.warn("Disconnect error", e);
    }
    
    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    isConnectedRef.current = false;
    isConnectingRef.current = false;
  };

  const startConnection = async () => {
    if (isConnectedRef.current || isConnectingRef.current || !aiRef.current) return;

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);
    initAudioOutput();
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia(LIVE_AGENT_MIC_CONSTRAINTS);
      mediaStreamRef.current = stream;
      
      const audioContext = new AudioContext({ latencyHint: 'interactive' });
      audioContextRef.current = audioContext;
      await audioContext.resume();

      await pcmContextRef.current?.resume();
      
      const sessionPromise = aiRef.current.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
             voiceConfig: { prebuiltVoiceConfig: { voiceName: LIVE_AGENT_VOICE } },
          },
          realtimeInputConfig: {
            automaticActivityDetection: {
              disabled: false,
              startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_HIGH,
              endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
              prefixPaddingMs: LIVE_AGENT_VAD.prefixPaddingMs,
              silenceDurationMs: LIVE_AGENT_VAD.silenceDurationMs,
            },
          },
          systemInstruction: SYSTEM_PROMPT,
          tools: [{
            functionDeclarations: [
              {
                name: "callUser",
                description: "Execute this to call the business owner or user by phone.",
                parameters: { type: Type.OBJECT, properties: {} }
              },
              {
                name: "emailUser",
                description: "Execute this to send an email to the business owner or user.",
                parameters: { type: Type.OBJECT, properties: {} }
              },
              {
                name: "openVideos",
                description: "Execute this to open YouTube intro videos based on a query.",
                parameters: { 
                  type: Type.OBJECT, 
                  properties: { query: { type: Type.STRING, description: "Search query for videos" } },
                }
              },
              {
                name: "saveContact",
                description: "Execute this to save the business owner's contact info (vCard) to the user's device.",
                parameters: { type: Type.OBJECT, properties: {} }
              },
              {
                name: "openNotepad",
                description: "Execute this to open the notepad/guestbook section for leaving notes.",
                parameters: { type: Type.OBJECT, properties: {} }
              }
            ]
          }],
        },
        callbacks: {
          onopen: () => {
            isConnectedRef.current = true;
            isConnectingRef.current = false;
            setIsConnected(true);
            setIsConnecting(false);
            lastUserActivityRef.current = Date.now();
            nudgeCountRef.current = 0;
            
            // start monitoring speaking state
            checkSpeakingRef.current = requestAnimationFrame(monitorSpeaking);
            
            // Proactive verbal introduction when the visitor lands on the site
            sessionPromise.then((session: any) => {
              sessionRef.current = session;
              try {
                const introPrompt = `${LIVE_AGENT_GREETING_TRIGGER} Introduce yourself aloud as the live AI assistant and say exactly: "${LIVE_AGENT_GREETING_TEXT}"`;
                if (typeof session.sendRealtimeInput === 'function') {
                  session.sendRealtimeInput({ text: introPrompt });
                } else if (typeof session.send === 'function') {
                  session.send({ text: introPrompt });
                }
              } catch (e) {
                console.warn("Could not send initial prompt:", e);
              }
            }).catch((e: any) => console.warn("Could not get session:", e));

            const { processor, silentOut } = createMicProcessingChain(audioContext, stream);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (isMutedRef.current) return;

              const inputData = e.inputBuffer.getChannelData(0);

              if (detectUserSpeechLevel(inputData) >= LIVE_AGENT_USER_SPEECH_THRESHOLD) {
                noteUserSpeech();
              }

              const payload = { audio: encodeMicChunk(inputData, audioContext.sampleRate) };

              try {
                if (sessionRef.current) {
                  sessionRef.current.sendRealtimeInput(payload);
                } else {
                  sessionPromise.then((session) => {
                    session.sendRealtimeInput(payload);
                  }).catch((err) => {
                    console.warn('Error sending input', err);
                  });
                }
              } catch (err) {
                console.warn('Error sending mic audio', err);
              }
            };
          },
          onmessage: (e: any) => {
             const message = e as LiveServerMessage;
             
             if (message.toolCall) {
               const functionCalls = message.toolCall.functionCalls;
               if (functionCalls && functionCalls.length > 0) {
                 for (const call of functionCalls) {
                   if (call.name === "callUser") {
                      window.location.href = `tel:+18607709893`;
                   } else if (call.name === "emailUser") {
                      window.location.href = `mailto:mcasanova@vbizme.com`;
                   } else if (call.name === "openVideos") {
                      const args = call.args as Record<string, string>;
                      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(args?.query || 'mc intro videos')}`, '_blank');
                   } else if (call.name === "saveContact") {
                      window.dispatchEvent(new CustomEvent('saveContactAction'));
                   } else if (call.name === "openNotepad") {
                      window.dispatchEvent(new CustomEvent('openNotepadAction'));
                   }
                   
                   if (sessionRef.current) {
                      sessionRef.current.sendToolResponse({
                        functionResponses: [{
                          id: call.id,
                          name: call.name,
                          response: { result: "Action executed successfully" }
                        }]
                      });
                   }
                 }
               }
             }

             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && pcmContextRef.current) {
                 const binary = atob(base64Audio);
                 const buffer = new ArrayBuffer(binary.length);
                 const view = new Uint8Array(buffer);
                 for (let i = 0; i < binary.length; i++) {
                   view[i] = binary.charCodeAt(i);
                 }
                 const pcm16 = new Int16Array(buffer);
                 
                 const pcmContext = pcmContextRef.current;
                 const audioBuffer = pcmContext.createBuffer(1, pcm16.length, 24000);
                 const channelData = audioBuffer.getChannelData(0);
                 for(let i=0; i<pcm16.length; i++) {
                   channelData[i] = pcm16[i] / 0x7fff;
                 }
                 
                 playChunk(audioBuffer);
             }
             
             if (message.serverContent?.interrupted) {
                 if (pcmContextRef.current) {
                     scheduledSourcesRef.current.forEach((source) => {
                       try { source.stop(); } catch (e) {}
                     });
                     scheduledSourcesRef.current = [];
                     nextStartTimeRef.current = pcmContextRef.current.currentTime;
                     _lastAudioTime.current = 0;
                 }
             }

             if (message.serverContent?.inputTranscription?.text) {
               noteUserSpeech();
             }

             if (message.serverContent?.turnComplete) {
               scheduleUserSilenceNudge();
             }
          },
          onerror: (err: any) => {
            const errDetails = err ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : "unknown";
            console.warn("Live API Error:", err, "Details:", errDetails);
            setError(`Connection error: ${err?.message || errDetails}`);
            disconnect();
          },
          onclose: () => {
             disconnect();
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.warn('Failed to start Live API', err);
      setError(err?.message || 'Could not start voice session.');
      disconnect();
    } finally {
      isConnectingRef.current = false;
    }
  };

  const toggleConnection = () => {
    if (isConnectedRef.current || isConnectingRef.current) {
      disconnect();
    } else {
      startConnection();
    }
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] flex flex-col items-end gap-4 pointer-events-none"
    >
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="pointer-events-auto bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5 shadow-sm w-72 min-h-[194px] flex flex-col gap-4 relative overflow-hidden"
          >
             {isSpeaking && (
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/30 via-transparent to-transparent opacity-50 animate-pulse pointer-events-none" />
             )}

            <div className="flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src={LIVE_AGENT_AVATAR.src}
                    alt={LIVE_AGENT_AVATAR.alt}
                    width={LIVE_AGENT_AVATAR.panel.width}
                    height={LIVE_AGENT_AVATAR.panel.height}
                    sizes={LIVE_AGENT_AVATAR.panel.sizes}
                    priority
                    className={`w-10 h-10 rounded-full object-cover border ${
                      isConnected ? 'border-zinc-100' : 'border-zinc-700'
                    } ${isSpeaking ? 'ring-2 ring-zinc-100/80 ring-offset-2 ring-offset-zinc-950' : ''}`}
                  />
                  {isSpeaking && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center">
                      <Volume2 size={10} className="text-zinc-100 animate-pulse" />
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-zinc-100 tracking-wide">Live AI Assistant</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest truncate max-w-[172px]">
                    {isConnecting
                      ? 'Connecting...'
                      : isConnected
                        ? isSpeaking
                          ? 'Speaking...'
                          : isMuted
                            ? 'Mic muted'
                            : 'Listening — ask me anything'
                        : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs flex items-center gap-1.5 p-2 bg-red-400/10 rounded-xl z-10 border border-red-500/20 min-h-9">
                <AlertCircle size={14} className="shrink-0" />
                <span className="line-clamp-2 leading-snug">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mt-2 z-10">
              {isConnected ? (
                <>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${isMuted ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
                  >
                    {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button
                    onClick={toggleConnection}
                    aria-label="End live AI assistant conversation"
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all active:scale-95 border border-red-400"
                  >
                    <Square size={20} fill="currentColor" />
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleConnection}
                  disabled={isConnecting || !keyReady}
                  aria-label={
                    isConnecting
                      ? 'Connecting to live AI assistant'
                      : 'Start live AI assistant conversation'
                  }
                  className="w-16 h-16 rounded-full bg-zinc-100 hover:bg-white disabled:opacity-50 flex items-center justify-center text-zinc-950 transition-all ml-auto hover:scale-105 active:scale-95 shadow-sm"
                >
                  {isConnecting ? <Loader2 size={24} className="animate-spin text-zinc-500" /> : <Mic size={24} strokeWidth={2.5} />}
                </button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 relative overflow-hidden shadow-sm ${
          isOpen ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200' : 'bg-zinc-100 text-zinc-950 hover:scale-105 active:scale-95'
        }`}
        aria-label={isOpen ? 'Close live AI assistant' : 'Open live AI assistant'}
      >
        <Image
          src={LIVE_AGENT_AVATAR.src}
          alt={LIVE_AGENT_AVATAR.alt}
          width={LIVE_AGENT_AVATAR.fab.width}
          height={LIVE_AGENT_AVATAR.fab.height}
          sizes={LIVE_AGENT_AVATAR.fab.sizes}
          priority
          className="w-full h-full object-cover"
        />
        {isConnected && !isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-zinc-400 rounded-full border-2 border-zinc-900 animate-ping" />
        )}
        {isConnected && !isOpen && (
           <span className="absolute top-0 right-0 w-3 h-3 bg-zinc-400 rounded-full border-2 border-zinc-900" />
        )}
      </button>

    </motion.div>
  );
}