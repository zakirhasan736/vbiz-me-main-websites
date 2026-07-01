'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Mic, Square, Loader2, Volume2, MicOff, AlertCircle } from 'lucide-react';
import { loadLiveAgentRuntime } from '@/lib/live-agent-runtime';
import {
  createMicProcessingChain,
  encodeMicChunk,
  LIVE_AGENT_MIC_CONSTRAINTS,
  LIVE_AGENT_VAD,
} from '@/lib/live-agent-audio';
import {
  buildAgentSilenceRecoveryNudge,
  buildIdleWakeNudge,
  buildUserSilenceNudge,
  detectUserSpeechLevel,
  LIVE_AGENT_AGENT_SILENCE_MS,
  LIVE_AGENT_IDLE_WAKE_MS,
  LIVE_AGENT_NUDGE_COOLDOWN_MS,
  LIVE_AGENT_RECOVERY_NUDGE_COOLDOWN_MS,
  LIVE_AGENT_RESPONSE_TIMEOUT_MS,
  LIVE_AGENT_USER_SILENCE_MS,
  LIVE_AGENT_USER_SPEECH_THRESHOLD,
} from '@/lib/live-agent-conversation';
import {
  buildLiveAgentSystemPrompt,
  DEFAULT_CARD_DATA,
  buildLiveAgentGreetingIntroPrompt,
} from '@/lib/live-agent-prompt';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { isWebKitBrowser } from '@/lib/scroll-config';
import { LIVE_AGENT_AVATAR } from '@/lib/site-assets';
import { LIVE_AGENT_DEFAULT_VOICE, resolveLiveAgentVoice } from '@/lib/live-agent-voices';
import {
  buildAffirmativeProceedNudge,
  buildUnclearSpeechNudge,
  isFillerOnlyTranscript,
  isLikelyAffirmativeReply,
  isLikelyUnclearReply,
} from '@/lib/live-agent-affirmatives';
import {
  buildMultiQuestionNudge,
  buildMustAnswerQuestionNudge,
  looksLikeMultipleQuestions,
  looksLikeVisitorQuestion,
} from '@/lib/live-agent-questions';
import { LIVE_AGENT_POST_TURN_DELAY_MS } from '@/lib/live-agent-audio';

const SYSTEM_PROMPT = buildLiveAgentSystemPrompt(DEFAULT_CARD_DATA, undefined, {
  voice: true,
});

type LiveAgentConfig = {
  apiKey: string;
  voice: string;
};

async function resolveLiveAgentConfig(): Promise<LiveAgentConfig> {
  const bakedKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || '';
  const bakedVoice = resolveLiveAgentVoice();
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost && bakedKey) {
    return { apiKey: bakedKey, voice: bakedVoice };
  }

  try {
    const response = await fetch('/api/live-agent/config', { cache: 'no-store' });
    const data = (await response.json()) as {
      apiKey?: string;
      voice?: string;
      message?: string;
    };
    if (response.ok && data.apiKey) {
      return {
        apiKey: data.apiKey,
        voice: data.voice?.trim() || bakedVoice,
      };
    }
    if (bakedKey) return { apiKey: bakedKey, voice: bakedVoice };
    throw new Error(data.message || 'Set GEMINI_API_KEY in .env and restart the app.');
  } catch (err) {
    if (bakedKey) return { apiKey: bakedKey, voice: bakedVoice };
    throw err instanceof Error ? err : new Error('Could not load Live Agent config.');
  }
}

type LiveAgentProps = {
  initialOpen?: boolean;
  autoConnect?: boolean;
};

export function LiveAgent({ initialOpen = false, autoConnect = false }: LiveAgentProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [portalMounted, setPortalMounted] = useState(false);
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
  const checkSpeakingRef = useRef<number>(0);
  const _lastAudioTime = useRef<number>(0);
  const isMutedRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const aiRef = useRef<any>(null);
  const apiKeyRef = useRef<string | null>(null);
  const voiceRef = useRef<string>(LIVE_AGENT_DEFAULT_VOICE);
  const micPausedUntilRef = useRef(0);
  const isConnectedRef = useRef(false);
  const isConnectingRef = useRef(false);
  const lastUserActivityRef = useRef(0);
  const lastNudgeSentRef = useRef(0);
  const lastRecoveryNudgeSentRef = useRef(0);
  const userSilenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const agentSilenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const responseWatchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const responseWatchdogRetryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keepaliveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastServerActivityRef = useRef(0);
  const lastAgentResponseAtRef = useRef(0);
  const userTurnStartedAtRef = useRef(0);
  const needsReconnectRef = useRef(false);
  const skipGreetingOnConnectRef = useRef(false);
  const lastInputTranscriptRef = useRef('');
  const pendingTurnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turnSeqRef = useRef(0);
  const nudgeCountRef = useRef(0);
  const softReconnectRef = useRef<(() => Promise<void>) | null>(null);

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

  const clearResponseWatchdog = () => {
    if (responseWatchdogRef.current) {
      clearTimeout(responseWatchdogRef.current);
      responseWatchdogRef.current = null;
    }
    if (responseWatchdogRetryRef.current) {
      clearTimeout(responseWatchdogRetryRef.current);
      responseWatchdogRetryRef.current = null;
    }
  };

  const clearKeepalive = () => {
    if (keepaliveIntervalRef.current) {
      clearInterval(keepaliveIntervalRef.current);
      keepaliveIntervalRef.current = null;
    }
  };

  const syncSpeakingState = () => {
    if (Date.now() >= _lastAudioTime.current && isSpeakingRef.current) {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      micPausedUntilRef.current = 0;
    }
  };

  const ensureAudioContextsActive = () => {
    void audioContextRef.current?.resume();
    void pcmContextRef.current?.resume();
  };

  const sendConversationNudge = (
    text: string,
    options?: { recovery?: boolean; bypassCooldown?: boolean },
  ) => {
    if (!sessionRef.current || !isConnectedRef.current) return;

    const now = Date.now();
    const isRecovery = options?.recovery ?? false;
    const cooldownMs = isRecovery
      ? LIVE_AGENT_RECOVERY_NUDGE_COOLDOWN_MS
      : LIVE_AGENT_NUDGE_COOLDOWN_MS;
    const lastSent = isRecovery ? lastRecoveryNudgeSentRef.current : lastNudgeSentRef.current;

    if (!options?.bypassCooldown && now - lastSent < cooldownMs) return;
    if (isSpeakingRef.current) return;

    if (isRecovery) {
      lastRecoveryNudgeSentRef.current = now;
    } else {
      lastNudgeSentRef.current = now;
    }
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

  const startResponseWatchdog = (turnStartedAt: number) => {
    clearResponseWatchdog();
    const staleSession = needsReconnectRef.current;
    const firstDelay = staleSession ? 2_000 : LIVE_AGENT_RESPONSE_TIMEOUT_MS;

    responseWatchdogRef.current = setTimeout(() => {
      responseWatchdogRef.current = null;
      if (userTurnStartedAtRef.current !== turnStartedAt) return;
      if (lastAgentResponseAtRef.current >= turnStartedAt) return;
      syncSpeakingState();
      if (isSpeakingRef.current) return;

      if (staleSession || needsReconnectRef.current) {
        needsReconnectRef.current = false;
        void softReconnectRef.current?.();
        return;
      }

      sendConversationNudge(buildAgentSilenceRecoveryNudge(), {
        recovery: true,
        bypassCooldown: true,
      });

      responseWatchdogRetryRef.current = setTimeout(() => {
        responseWatchdogRetryRef.current = null;
        if (userTurnStartedAtRef.current !== turnStartedAt) return;
        if (lastAgentResponseAtRef.current >= turnStartedAt) return;
        syncSpeakingState();
        if (isSpeakingRef.current) return;

        needsReconnectRef.current = false;
        void softReconnectRef.current?.();
      }, LIVE_AGENT_RESPONSE_TIMEOUT_MS);
    }, firstDelay);
  };

  const clearPendingTurnHandling = () => {
    if (pendingTurnTimerRef.current) {
      clearTimeout(pendingTurnTimerRef.current);
      pendingTurnTimerRef.current = null;
    }
    turnSeqRef.current += 1;
  };

  const handleTurnEndNudges = (transcript: string) => {
    if (!transcript || !isConnectedRef.current) return;

    if (isFillerOnlyTranscript(transcript)) {
      sendConversationNudge(buildUnclearSpeechNudge(transcript), {
        recovery: true,
        bypassCooldown: true,
      });
      return;
    }

    if (isLikelyAffirmativeReply(transcript)) {
      sendConversationNudge(buildAffirmativeProceedNudge(transcript), {
        recovery: true,
        bypassCooldown: true,
      });
      return;
    }

    if (looksLikeMultipleQuestions(transcript)) {
      sendConversationNudge(buildMultiQuestionNudge(transcript), {
        recovery: true,
        bypassCooldown: true,
      });
      return;
    }

    if (looksLikeVisitorQuestion(transcript)) {
      sendConversationNudge(buildMustAnswerQuestionNudge(transcript), {
        recovery: true,
        bypassCooldown: true,
      });
      return;
    }

    if (isLikelyUnclearReply(transcript)) {
      sendConversationNudge(buildUnclearSpeechNudge(transcript), {
        recovery: true,
        bypassCooldown: true,
      });
    }
  };

  const scheduleTurnEndHandling = (transcript: string) => {
    clearPendingTurnHandling();
    const seq = turnSeqRef.current;

    pendingTurnTimerRef.current = setTimeout(() => {
      pendingTurnTimerRef.current = null;
      if (seq !== turnSeqRef.current || !isConnectedRef.current) return;
      handleTurnEndNudges(transcript);
    }, LIVE_AGENT_POST_TURN_DELAY_MS);
  };

  const startSessionKeepalive = () => {
    clearKeepalive();
    keepaliveIntervalRef.current = setInterval(() => {
      if (!isConnectedRef.current) return;
      ensureAudioContextsActive();

      const staleFor = Date.now() - lastServerActivityRef.current;
      if (lastServerActivityRef.current > 0 && staleFor > 90_000) {
        needsReconnectRef.current = true;
      }
    }, 15_000);
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
      syncSpeakingState();
      if (isSpeakingRef.current) return;
      const sinceUser = Date.now() - lastUserActivityRef.current;
      if (sinceUser > LIVE_AGENT_AGENT_SILENCE_MS + 12_000) return;
      sendConversationNudge(buildAgentSilenceRecoveryNudge(), {
        recovery: true,
        bypassCooldown: true,
      });
    }, LIVE_AGENT_AGENT_SILENCE_MS);
  };

  const noteUserSpeech = () => {
    clearPendingTurnHandling();
    const now = Date.now();
    const idleFor = now - lastUserActivityRef.current;
    const wokeFromIdle = idleFor >= LIVE_AGENT_IDLE_WAKE_MS;
    const turnStartedAt = now;

    ensureAudioContextsActive();
    syncSpeakingState();
    micPausedUntilRef.current = 0;
    lastUserActivityRef.current = now;
    userTurnStartedAtRef.current = turnStartedAt;

    if (userSilenceTimerRef.current) {
      clearTimeout(userSilenceTimerRef.current);
      userSilenceTimerRef.current = null;
    }

    if (wokeFromIdle && !isSpeakingRef.current && !isMutedRef.current) {
      sendConversationNudge(buildIdleWakeNudge(), {
        recovery: true,
        bypassCooldown: true,
      });
    }

    if (!isSpeakingRef.current && !isMutedRef.current) {
      scheduleAgentSilenceRecovery();
    }

    startResponseWatchdog(turnStartedAt);
  };

  useEffect(() => {
    const unlockAudio = () => {
      ensureAudioContextsActive();
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible' && isConnectedRef.current) {
        ensureAudioContextsActive();
      }
    };

    document.addEventListener('click', unlockAudio, { once: true, passive: true });
    document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    document.addEventListener('keydown', unlockAudio, { once: true, passive: true });
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    void resolveLiveAgentConfig()
      .then((config) => {
        if (cancelled) return;
        apiKeyRef.current = config.apiKey;
        voiceRef.current = config.voice;
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
    if (!autoConnect || !keyReady) return;

    scheduleAfterSiteLoad(() => {
      setIsOpen(true);
      // Attempt to start the live connection on all browsers.
      // Note: some browsers (especially Safari/iOS) may require a user gesture
      // before `getUserMedia` succeeds and will show a mic permission prompt.
      void startConnection().catch((err) => {
        console.warn('Auto-start live agent failed:', err);
      });
    });
  }, [autoConnect, keyReady]);

  useEffect(() => {
    const onPageHide = () => disconnect();
    window.addEventListener('pagehide', onPageHide);

    return () => {
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

  // Close live agent when site navigation opens (mobile drawer) so nav items are accessible
  useEffect(() => {
    const onNavOpen = () => {
      try {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('live-agent:minimize'));
      } catch (e) {}
    };

    const onNavClose = () => {
      try {
        window.dispatchEvent(new CustomEvent('live-agent:nav-closed'));
      } catch (e) {}
    };

    const onRestore = () => {
      try {
        setIsOpen(true);
      } catch (e) {}
    };

    window.addEventListener('site:nav-open', onNavOpen as EventListener);
    window.addEventListener('site:nav-close', onNavClose as EventListener);
    window.addEventListener('live-agent:restore', onRestore as EventListener);
    return () => {
      window.removeEventListener('site:nav-open', onNavOpen as EventListener);
      window.removeEventListener('site:nav-close', onNavClose as EventListener);
      window.removeEventListener('live-agent:restore', onRestore as EventListener);
    };
  }, []);

  useEffect(() => {
    setPortalMounted(true);
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
    const endMs = Date.now() + Math.ceil(audioBuffer.duration * 1000) + 280;
    _lastAudioTime.current = endMs;
    micPausedUntilRef.current = endMs;
    lastAgentResponseAtRef.current = Date.now();
    clearResponseWatchdog();
  };

  const monitorSpeaking = () => {
    const isCurrentlySpeaking = Date.now() < _lastAudioTime.current;
    if (isCurrentlySpeaking !== isSpeaking) {
      setIsSpeaking(isCurrentlySpeaking);
      if (!isCurrentlySpeaking && isConnectedRef.current) {
        scheduleUserSilenceNudge();
      }
    }
    checkSpeakingRef.current = window.setTimeout(
      monitorSpeaking,
      isCurrentlySpeaking ? 48 : 180,
    );
  };

  const disconnect = () => {
    clearSilenceTimers();
    clearResponseWatchdog();
    clearPendingTurnHandling();
    clearKeepalive();
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
        clearTimeout(checkSpeakingRef.current);
      }
    } catch (e) {
      console.warn('Disconnect error', e);
    }

    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    isConnectedRef.current = false;
    isConnectingRef.current = false;
  };

  const ensureAiClient = async () => {
    if (aiRef.current) return aiRef.current;

    const [runtime, config] = await Promise.all([
      loadLiveAgentRuntime(),
      apiKeyRef.current && voiceRef.current
        ? Promise.resolve({ apiKey: apiKeyRef.current, voice: voiceRef.current })
        : resolveLiveAgentConfig(),
    ]);

    apiKeyRef.current = config.apiKey;
    voiceRef.current = config.voice;
    aiRef.current = new runtime.GoogleGenAI({ apiKey: config.apiKey });
    return aiRef.current;
  };

  const startConnection = async () => {
    if (isConnectedRef.current || isConnectingRef.current) return;

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);
    initAudioOutput();

    try {
      const ai = await ensureAiClient();
      const runtime = await loadLiveAgentRuntime();
      if (!ai) return;

      const stream = await navigator.mediaDevices.getUserMedia(LIVE_AGENT_MIC_CONSTRAINTS);
      mediaStreamRef.current = stream;

      const audioContext = new AudioContext({ latencyHint: 'interactive' });
      audioContextRef.current = audioContext;
      await audioContext.resume();

      await pcmContextRef.current?.resume();

      const sessionPromise = ai.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: [runtime.Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceRef.current } },
          },
          realtimeInputConfig: {
            automaticActivityDetection: {
              disabled: false,
              startOfSpeechSensitivity: runtime.StartSensitivity.START_SENSITIVITY_LOW,
              endOfSpeechSensitivity: runtime.EndSensitivity.END_SENSITIVITY_HIGH,
              prefixPaddingMs: LIVE_AGENT_VAD.prefixPaddingMs,
              silenceDurationMs: LIVE_AGENT_VAD.silenceDurationMs,
            },
          },
          systemInstruction: SYSTEM_PROMPT,
          tools: [
            {
              functionDeclarations: [
                {
                  name: 'callUser',
                  description: 'Execute this to call the business owner or user by phone.',
                  parameters: { type: runtime.Type.OBJECT, properties: {} },
                },
                {
                  name: 'emailUser',
                  description: 'Execute this to send an email to the business owner or user.',
                  parameters: { type: runtime.Type.OBJECT, properties: {} },
                },
                {
                  name: 'openVideos',
                  description: 'Execute this to open YouTube intro videos based on a query.',
                  parameters: {
                    type: runtime.Type.OBJECT,
                    properties: {
                      query: { type: runtime.Type.STRING, description: 'Search query for videos' },
                    },
                  },
                },
                {
                  name: 'saveContact',
                  description:
                    "Execute this to save the business owner's contact info (vCard) to the user's device.",
                  parameters: { type: runtime.Type.OBJECT, properties: {} },
                },
                {
                  name: 'openNotepad',
                  description: 'Execute this to open the notepad/guestbook section for leaving notes.',
                  parameters: { type: runtime.Type.OBJECT, properties: {} },
                },
              ],
            },
          ],
        },
        callbacks: {
          onopen: () => {
            isConnectedRef.current = true;
            isConnectingRef.current = false;
            setIsConnected(true);
            setIsConnecting(false);
            lastUserActivityRef.current = Date.now();
            lastServerActivityRef.current = Date.now();
            nudgeCountRef.current = 0;

            checkSpeakingRef.current = window.setTimeout(monitorSpeaking, 48);
            startSessionKeepalive();

            sessionPromise
              .then((session: any) => {
                sessionRef.current = session;
                try {
                  const introPrompt = skipGreetingOnConnectRef.current
                    ? buildIdleWakeNudge()
                    : buildLiveAgentGreetingIntroPrompt();
                  skipGreetingOnConnectRef.current = false;
                  if (typeof session.sendRealtimeInput === 'function') {
                    session.sendRealtimeInput({ text: introPrompt });
                  } else if (typeof session.send === 'function') {
                    session.send({ text: introPrompt });
                  }
                } catch (e) {
                  console.warn('Could not send initial prompt:', e);
                }
              })
              .catch((e: any) => console.warn('Could not get session:', e));

            const { processor } = createMicProcessingChain(audioContext, stream);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (isMutedRef.current) return;

              const inputData = e.inputBuffer.getChannelData(0);
              const speechLevel = detectUserSpeechLevel(inputData);

              if (speechLevel >= LIVE_AGENT_USER_SPEECH_THRESHOLD) {
                micPausedUntilRef.current = 0;
                noteUserSpeech();
              } else if (Date.now() < micPausedUntilRef.current) {
                return;
              }

              if (audioContext.state === 'suspended') {
                void audioContext.resume();
              }

              const payload = { audio: encodeMicChunk(inputData, audioContext.sampleRate) };

              try {
                if (sessionRef.current) {
                  sessionRef.current.sendRealtimeInput(payload);
                } else {
                  sessionPromise
                    .then((session: any) => {
                      session.sendRealtimeInput(payload);
                    })
                    .catch((err: unknown) => {
                      console.warn('Error sending input', err);
                    });
                }
              } catch (err) {
                console.warn('Error sending mic audio', err);
              }
            };
          },
          onmessage: (e: any) => {
            const message = e;
            lastServerActivityRef.current = Date.now();

            if (message.goAway) {
              needsReconnectRef.current = true;
            }

            if (message.toolCall) {
              const functionCalls = message.toolCall.functionCalls;
              if (functionCalls && functionCalls.length > 0) {
                for (const call of functionCalls) {
                  if (call.name === 'callUser') {
                    window.location.href = `tel:+18607709893`;
                  } else if (call.name === 'emailUser') {
                    window.location.href = `mailto:mcasanova@vbizme.com`;
                  } else if (call.name === 'openVideos') {
                    const args = call.args as Record<string, string>;
                    window.open(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(args?.query || 'mc intro videos')}`,
                      '_blank',
                    );
                  } else if (call.name === 'saveContact') {
                    window.dispatchEvent(new CustomEvent('saveContactAction'));
                  } else if (call.name === 'openNotepad') {
                    window.dispatchEvent(new CustomEvent('openNotepadAction'));
                  }

                  if (sessionRef.current) {
                    sessionRef.current.sendToolResponse({
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
              for (let i = 0; i < pcm16.length; i++) {
                channelData[i] = pcm16[i] / 0x7fff;
              }

              playChunk(audioBuffer);
            }

            if (message.serverContent?.interrupted) {
              if (pcmContextRef.current) {
                scheduledSourcesRef.current.forEach((source) => {
                  try {
                    source.stop();
                  } catch (err) {
                    console.warn('Could not stop audio source', err);
                  }
                });
                scheduledSourcesRef.current = [];
                nextStartTimeRef.current = pcmContextRef.current.currentTime;
                _lastAudioTime.current = 0;
                micPausedUntilRef.current = 0;
              }
            }

            if (message.serverContent?.inputTranscription?.text) {
              lastInputTranscriptRef.current = message.serverContent.inputTranscription.text;
              noteUserSpeech();
            }

            if (message.serverContent?.turnComplete) {
              const transcript = lastInputTranscriptRef.current.trim();
              if (transcript) {
                scheduleTurnEndHandling(transcript);
              }
              lastInputTranscriptRef.current = '';
              scheduleUserSilenceNudge();
            }
          },
          onerror: (err: any) => {
            const errDetails = err ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : 'unknown';
            console.warn('Live API Error:', err, 'Details:', errDetails);
            setError(`Connection error: ${err?.message || errDetails}`);
            disconnect();
          },
          onclose: () => {
            disconnect();
          },
        },
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

  softReconnectRef.current = async () => {
    if (isConnectingRef.current) return;
    skipGreetingOnConnectRef.current = true;
    disconnect();
    await startConnection();
  };

  const toggleConnection = () => {
    if (isConnectedRef.current || isConnectingRef.current) {
      disconnect();
    } else {
      void startConnection();
    }
  };

  return portalMounted
    ? createPortal(
        <div className="live-ai-agent-root fixed bottom-6 right-6 lg:bottom-10 lg:right-10 flex flex-col items-end gap-4 pointer-events-none">
          {isOpen && (
            <div className="live-ai-agent-site-panel pointer-events-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-2xl w-72 min-h-[194px] flex flex-col gap-4 relative overflow-hidden">
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
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest truncate max-w-[172px]">
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
              <div className="text-red-300 text-base flex items-center gap-1.5 p-2 bg-red-950/50 rounded-xl z-10 border border-red-500/30 min-h-9">
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
                  {isConnecting ? (
                    <Loader2 size={24} className="animate-spin text-zinc-400" />
                  ) : (
                    <Mic size={24} strokeWidth={2.5} />
                  )}
                </button>
              )}
            </div>
          </div>
          )}
          {/* Minimized indicator: appears when agent is minimized due to nav open */}
          <AnimateMinimized />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`live-ai-agent-fab pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform duration-300 relative overflow-hidden shadow-lg ${
          isOpen
            ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            : 'bg-zinc-100 text-zinc-950 hover:scale-105 active:scale-95'
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
        </div>,
        document.body,
      )
    : null;
}

function AnimateMinimized() {
  // shows a small clickable bar when LiveAgent is minimized by the nav
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMinimize = () => setVisible(true);
    const onNavClosed = () => setVisible(false);

    window.addEventListener('live-agent:minimize', onMinimize as EventListener);
    window.addEventListener('live-agent:nav-closed', onNavClosed as EventListener);

    return () => {
      window.removeEventListener('live-agent:minimize', onMinimize as EventListener);
      window.removeEventListener('live-agent:nav-closed', onNavClosed as EventListener);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        setVisible(false);
        window.dispatchEvent(new CustomEvent('live-agent:restore'));
      }}
      className="pointer-events-auto h-auto py-3  px-3 rounded-xl bg-zinc-900 text-white text-[10px] leading-tight flex items-center justify-center shadow-md transition-transform hover:scale-75"
      aria-label="Restore Live AI assistant"
    >
    AI Assistant (minimized)
    </button>
  );
}
