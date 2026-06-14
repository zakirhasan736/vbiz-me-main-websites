'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Mic, Square, Loader2, Volume2, MicOff, AlertCircle } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from '@google/genai';
import {
  buildLiveAgentSystemPrompt,
  DEFAULT_CARD_DATA,
  LIVE_AGENT_GREETING_TURN,
} from '@/lib/live-agent-prompt';
import {
  LIVE_MODELS,
  CONNECT_TIMEOUT_MS,
  MIC_TIMEOUT_MS,
  createLiveGenAIClient,
  getGoogleReferrerFixMessage,
  getLiveAgentSetupError,
  resolveLiveAgentApiKey,
  withTimeout,
} from '@/lib/live-agent-config';

const SYSTEM_PROMPT = buildLiveAgentSystemPrompt(DEFAULT_CARD_DATA, undefined, {
  voice: true,
});

export function LiveAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [keyReady, setKeyReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const hasGreetedRef = useRef(false);
  const isConnectingRef = useRef(false);
  const isConnectedRef = useRef(false);
  const isMutedRef = useRef(false);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const pcmContextRef = useRef<AudioContext | null>(null);
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextStartTimeRef = useRef<number>(0);
  const checkSpeakingRef = useRef<number>(0);
  const lastAudioTimeRef = useRef<number>(0);
  const autoStartAttemptedRef = useRef(false);

  const aiRef = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadKey = async () => {
      try {
        const key = await resolveLiveAgentApiKey();
        if (cancelled) return;
        setApiKey(key);
        aiRef.current = createLiveGenAIClient(key);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Could not load Live Agent config.';
        setError(message);
      } finally {
        if (!cancelled) setKeyReady(true);
      }
    };

    void loadKey();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const initAudioOutput = useCallback(async () => {
    if (!pcmContextRef.current) {
      pcmContextRef.current = new AudioContext({
        sampleRate: 24000,
        latencyHint: 'interactive',
      });
      nextStartTimeRef.current = pcmContextRef.current.currentTime;
    }

    if (pcmContextRef.current.state === 'suspended') {
      await pcmContextRef.current.resume();
    }
  }, []);

  const playChunk = useCallback((audioBuffer: AudioBuffer) => {
    const pcmContext = pcmContextRef.current;
    if (!pcmContext) return;

    if (pcmContext.state === 'suspended') {
      void pcmContext.resume();
    }

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
    lastAudioTimeRef.current = Date.now() + Math.ceil(audioBuffer.duration * 1000);
  }, []);

  const monitorSpeaking = useCallback(() => {
    const isCurrentlySpeaking = Date.now() < lastAudioTimeRef.current;
    setIsSpeaking((prev) => (prev === isCurrentlySpeaking ? prev : isCurrentlySpeaking));
    checkSpeakingRef.current = requestAnimationFrame(monitorSpeaking);
  }, []);

  const sendInitialGreeting = useCallback((session: { sendClientContent: (payload: typeof LIVE_AGENT_GREETING_TURN) => void }) => {
    if (hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    session.sendClientContent(LIVE_AGENT_GREETING_TURN);
  }, []);

  const disconnect = useCallback(() => {
    try {
      if (sessionRef.current) {
        sessionRef.current.close();
        sessionRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
      }
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (pcmContextRef.current) {
        void pcmContextRef.current.close();
        pcmContextRef.current = null;
      }
      if (checkSpeakingRef.current) {
        cancelAnimationFrame(checkSpeakingRef.current);
        checkSpeakingRef.current = 0;
      }
    } catch (e) {
      console.error('Disconnect error', e);
    }

    isConnectedRef.current = false;
    isConnectingRef.current = false;
    hasGreetedRef.current = false;
    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setStatusMessage(null);
  }, []);

  const startConnection = useCallback(async () => {
    if (isConnectedRef.current || isConnectingRef.current) return;

    const setupError = getLiveAgentSetupError();
    if (setupError) {
      setError(setupError);
      return;
    }

    if (!keyReady) {
      setError('Loading Live Agent configuration...');
      return;
    }

    if (!apiKey || !aiRef.current) {
      setError(
        'Gemini API key is missing on the server. Set GEMINI_API_KEY on your VPS and restart the app.',
      );
      return;
    }

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);
    setStatusMessage('Connecting to Gemini...');

    await initAudioOutput();

    let stream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let silentGain: GainNode | null = null;

    const startMicCapture = async () => {
      if (!sessionRef.current || processorRef.current) return;

      setStatusMessage('Requesting microphone...');

      try {
        stream = await withTimeout(
          navigator.mediaDevices.getUserMedia({ audio: true }),
          MIC_TIMEOUT_MS,
          'Microphone permission is required. Click the agent and allow mic access.',
        );
        mediaStreamRef.current = stream;

        audioContext = new AudioContext({ sampleRate: 16000, latencyHint: 'interactive' });
        audioContextRef.current = audioContext;
        await audioContext.resume();

        source = audioContext.createMediaStreamSource(stream);
        silentGain = audioContext.createGain();
        silentGain.gain.value = 0;

        const processor = audioContext.createScriptProcessor(512, 1, 1);
        processorRef.current = processor;
        source.connect(processor);
        processor.connect(silentGain);
        silentGain.connect(audioContext.destination);

        processor.onaudioprocess = (e) => {
          if (isMutedRef.current || !sessionRef.current) return;

          const inputData = e.inputBuffer.getChannelData(0);
          const pcm16 = new Int16Array(inputData.length);
          let hasAudio = false;

          for (let i = 0; i < inputData.length; i++) {
            pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;
            if (Math.abs(pcm16[i]) > 100) hasAudio = true;
          }

          if (!hasAudio) return;

          const uint8 = new Uint8Array(pcm16.buffer);
          let binary = '';
          for (let i = 0; i < uint8.byteLength; i++) {
            binary += String.fromCharCode(uint8[i]);
          }

          try {
            sessionRef.current.sendRealtimeInput({
              audio: {
                mimeType: 'audio/pcm;rate=16000',
                data: btoa(binary),
              },
            });
          } catch {
            /* socket closed */
          }
        };

        setStatusMessage('Connected');
      } catch (micErr) {
        const micMessage =
          micErr instanceof Error ? micErr.message : 'Microphone access failed.';
        console.warn('Mic setup failed:', micErr);
        setError(micMessage);
        setStatusMessage('Connected (voice reply needs mic)');
      }
    };

    try {
      const liveTools = [
        {
          functionDeclarations: [
            {
              name: 'callUser',
              description: 'Execute this to call the business owner or user by phone.',
              parameters: { type: Type.OBJECT, properties: {} },
            },
            {
              name: 'emailUser',
              description: 'Execute this to send an email to the business owner or user.',
              parameters: { type: Type.OBJECT, properties: {} },
            },
            {
              name: 'openVideos',
              description: 'Execute this to open YouTube intro videos based on a query.',
              parameters: {
                type: Type.OBJECT,
                properties: {
                  query: { type: Type.STRING, description: 'Search query for videos' },
                },
              },
            },
            {
              name: 'saveContact',
              description: "Execute this to save the business owner's contact info (vCard) to the user's device.",
              parameters: { type: Type.OBJECT, properties: {} },
            },
            {
              name: 'openNotepad',
              description: 'Execute this to open the notepad/guestbook section for leaving notes.',
              parameters: { type: Type.OBJECT, properties: {} },
            },
          ],
        },
      ] as never;

      const callbacks = {
        onmessage: (e: unknown) => {
          const message = e as LiveServerMessage;

          if (message.toolCall?.functionCalls?.length) {
            for (const call of message.toolCall.functionCalls) {
              if (call.name === 'callUser') {
                window.location.href = 'tel:+18607709893';
              } else if (call.name === 'emailUser') {
                window.location.href = 'mailto:mcasanova@vbizme.com';
              } else if (call.name === 'openVideos') {
                const args = call.args as Record<string, string>;
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(args?.query || 'mc intro videos')}`,
                  '_blank'
                );
              } else if (call.name === 'saveContact') {
                window.dispatchEvent(new CustomEvent('saveContactAction'));
              } else if (call.name === 'openNotepad') {
                window.dispatchEvent(new CustomEvent('openNotepadAction'));
              }

              sessionRef.current?.sendToolResponse({
                functionResponses: [
                  {
                    id: call.id,
                    name: call.name,
                    response: { result: 'Action executed successfully' },
                  },
                ],
              });
            }
          }

          const parts = message.serverContent?.modelTurn?.parts ?? [];
          for (const part of parts) {
            const base64Audio = part.inlineData?.data;
            if (!base64Audio || !pcmContextRef.current) continue;

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
            for (let i = 0; i < pcm16.length; i++) {
              channelData[i] = pcm16[i] / 0x7fff;
            }

            playChunk(audioBuffer);
          }

          if (message.serverContent?.interrupted && pcmContextRef.current) {
            scheduledSourcesRef.current.forEach((source) => {
              try {
                source.stop();
              } catch {
                /* ignore */
              }
            });
            scheduledSourcesRef.current = [];
            nextStartTimeRef.current = pcmContextRef.current.currentTime;
            lastAudioTimeRef.current = 0;
          }
        },
        onerror: (err: { message?: string }) => {
          console.error('Live API Error:', err);
          const detail = err?.message || 'Unknown error';
          setError(
            `Gemini rejected the connection (${detail}).\n\n${getGoogleReferrerFixMessage()}`,
          );
          disconnect();
        },
        onclose: () => {
          disconnect();
        },
      };

      let session: Awaited<ReturnType<GoogleGenAI['live']['connect']>> | null = null;
      let lastError: Error | null = null;

      for (const model of LIVE_MODELS) {
        setStatusMessage(`Connecting to ${model}...`);
        try {
          session = await withTimeout(
            aiRef.current.live.connect({
              model,
              config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                },
                systemInstruction: SYSTEM_PROMPT,
                tools: liveTools,
              },
              callbacks,
            }),
            CONNECT_TIMEOUT_MS,
            `Timed out connecting to Gemini (${model}).\n\n${getGoogleReferrerFixMessage()}`,
          );
          break;
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          console.warn(`Live model ${model} failed:`, err);
        }
      }

      if (!session) {
        throw (
          lastError ??
          new Error(`Could not connect to Gemini Live API.\n\n${getGoogleReferrerFixMessage()}`)
        );
      }

      sessionRef.current = session;
      isConnectedRef.current = true;
      isConnectingRef.current = false;
      setIsConnected(true);
      setIsConnecting(false);
      setStatusMessage('Starting greeting...');
      checkSpeakingRef.current = requestAnimationFrame(monitorSpeaking);

      sendInitialGreeting(session);

      void startMicCapture();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not start voice session.';
      console.error('Failed to start Live API', err);
      setError(message);
      setStatusMessage(null);
      disconnect();
    }
  }, [apiKey, disconnect, initAudioOutput, keyReady, monitorSpeaking, playChunk, sendInitialGreeting]);

  useEffect(() => {
    if (!keyReady || !apiKey || autoStartAttemptedRef.current) return;
    autoStartAttemptedRef.current = true;

    let removeListeners: (() => void) | null = null;
    let mounted = true;

    const tryAutoConnect = async () => {
      setIsOpen(true);
      await startConnection();
      if (mounted && isConnectedRef.current) {
        setIsOpen(true);
        return;
      }

      if (!mounted) return;

      const handleFirstGesture = async () => {
        setIsOpen(true);
        await startConnection();
        if (mounted && isConnectedRef.current) {
          setIsOpen(true);
        }
        removeListeners?.();
        removeListeners = null;
      };

      removeListeners = () => {
        window.removeEventListener('click', handleFirstGesture);
        window.removeEventListener('touchstart', handleFirstGesture);
        window.removeEventListener('keydown', handleFirstGesture);
      };

      window.addEventListener('click', handleFirstGesture);
      window.addEventListener('touchstart', handleFirstGesture);
      window.addEventListener('keydown', handleFirstGesture);
    };

    void tryAutoConnect();

    return () => {
      mounted = false;
      removeListeners?.();
    };
  }, [apiKey, keyReady, startConnection]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  const toggleConnection = () => {
    if (isConnectedRef.current || isConnectingRef.current) {
      disconnect();
    } else {
      void startConnection();
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
            transition={{ type: 'spring', bounce: 0, duration: 0.05 }}
            className="pointer-events-auto bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5 shadow-sm w-72 flex flex-col gap-4 relative overflow-hidden"
          >
            {isSpeaking && (
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/30 via-transparent to-transparent opacity-50 animate-pulse pointer-events-none" />
            )}

            <div className="flex items-center justify-between z-10 w-full">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isConnected ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-zinc-500'
                  }`}
                >
                  {isSpeaking ? (
                    <Volume2 size={18} className="animate-pulse" />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-zinc-100 tracking-wide">Live Agent</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    {isConnecting
                      ? statusMessage || 'Connecting...'
                      : isConnected
                        ? statusMessage || 'Connected'
                        : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs flex items-center gap-1.5 p-2 bg-red-400/10 rounded-xl z-10 border border-red-500/20">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mt-2 z-10">
              {isConnected ? (
                <>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                      isMuted
                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button
                    onClick={toggleConnection}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-all active:scale-95 border border-red-400"
                  >
                    <Square size={20} fill="currentColor" />
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleConnection}
                  disabled={isConnecting}
                  className="w-16 h-16 rounded-full bg-zinc-100 hover:bg-white disabled:opacity-50 flex items-center justify-center text-zinc-950 transition-all ml-auto hover:scale-105 active:scale-95 shadow-sm"
                >
                  {isConnecting ? (
                    <Loader2 size={24} className="animate-spin text-zinc-500" />
                  ) : (
                    <Mic size={24} strokeWidth={2.5} />
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            return;
          }
          setIsOpen(true);
          if (!isConnectedRef.current && !isConnectingRef.current) {
            void startConnection();
          }
        }}
        className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center transition-all duration-75 relative border ${
          isOpen
            ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border-zinc-800 shadow-sm'
            : 'bg-zinc-100 text-zinc-950 border-white hover:scale-105 shadow-sm active:scale-95'
        }`}
      >
        <Bot size={24} />
        {isConnected && !isOpen && (
          <>
            <span className="absolute top-0 right-0 w-3 h-3 bg-zinc-400 rounded-full border-2 border-zinc-900 animate-ping" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-zinc-400 rounded-full border-2 border-zinc-900" />
          </>
        )}
      </button>
    </motion.div>
  );
}
