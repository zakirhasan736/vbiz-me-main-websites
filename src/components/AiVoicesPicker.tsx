'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Play, Square, Volume2 } from 'lucide-react';
import {
  LIVE_AGENT_DEFAULT_VOICE,
  LIVE_AGENT_MALE_VOICES,
  type LiveAgentVoiceOption,
} from '@/lib/live-agent-voices';

const SELECTION_KEY = 'vbizme-preferred-live-agent-voice';

type AiVoicesPickerProps = {
  activeVoice: string;
};

export function AiVoicesPicker({ activeVoice }: AiVoicesPickerProps) {
  const [selectedVoice, setSelectedVoice] = useState(activeVoice);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [loadingVoice, setLoadingVoice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(SELECTION_KEY);
    if (saved && LIVE_AGENT_MALE_VOICES.some((v) => v.id === saved)) {
      setSelectedVoice(saved);
    }
  }, []);

  const stopPreview = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPlayingVoice(null);
  }, []);

  useEffect(() => () => stopPreview(), [stopPreview]);

  const selectVoice = (voiceId: string) => {
    setSelectedVoice(voiceId);
    localStorage.setItem(SELECTION_KEY, voiceId);
    setError(null);
  };

  const playPreview = async (voice: LiveAgentVoiceOption) => {
    if (loadingVoice) return;

    if (playingVoice === voice.id) {
      stopPreview();
      return;
    }

    stopPreview();
    setLoadingVoice(voice.id);
    setError(null);

    try {
      const response = await fetch('/api/live-agent/voice-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voice: voice.id }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Preview unavailable');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        stopPreview();
      };
      audio.onerror = () => {
        setError(`Could not play ${voice.id} preview.`);
        stopPreview();
      };

      await audio.play();
      setPlayingVoice(voice.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not play voice preview.');
      stopPreview();
    } finally {
      setLoadingVoice(null);
    }
  };

  return (
    <div>
      <p className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-300">
        <span className="font-medium text-zinc-100">Live on site:</span>{' '}
        <span className="font-mono text-amber-200/90">{activeVoice}</span>
        <span className="text-zinc-500"> · </span>
        <span className="font-medium text-zinc-100">Your pick:</span>{' '}
        <span className="font-mono text-emerald-300/90">{selectedVoice}</span>
        <span className="mt-1 block text-xs text-zinc-500">
          Click a voice to select it, then press Play to hear a sample.
        </span>
      </p>

      {error && (
        <p className="mt-3 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {LIVE_AGENT_MALE_VOICES.map((voice) => {
          const isActive = voice.id === activeVoice;
          const isSelected = voice.id === selectedVoice;
          const isPlaying = playingVoice === voice.id;
          const isLoading = loadingVoice === voice.id;

          return (
            <li key={voice.id}>
              <div
                className={`rounded-2xl border px-5 py-4 transition-colors ${
                  isSelected
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : isActive
                      ? 'border-amber-500/40 bg-amber-500/5'
                      : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => selectVoice(voice.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-lg font-semibold text-zinc-50">
                        {voice.id}
                      </span>
                      {voice.recommended && (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                          Recommended
                        </span>
                      )}
                      {isActive && (
                        <span className="rounded-full bg-zinc-100/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                          Live now
                        </span>
                      )}
                      {isSelected && (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">
                      <span className="text-zinc-300">{voice.tone}</span>
                      {' — '}
                      {voice.bestFor}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => void playPreview(voice)}
                    disabled={Boolean(loadingVoice) && !isLoading}
                    aria-label={
                      isPlaying ? `Stop ${voice.id} preview` : `Play ${voice.id} voice sample`
                    }
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isPlaying
                        ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-200'
                        : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800'
                    } disabled:opacity-40`}
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : isPlaying ? (
                      <Square size={16} fill="currentColor" />
                    ) : (
                      <Play size={18} className="ml-0.5" fill="currentColor" />
                    )}
                  </button>
                </div>

                {isPlaying && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300/90">
                    <Volume2 size={12} className="animate-pulse" />
                    Playing sample…
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 text-sm text-zinc-400 leading-relaxed">
        <h2 className="text-base font-semibold text-zinc-200">Send your choice</h2>
        <p className="mt-2">
          Tell the team: <span className="font-mono text-emerald-300">{selectedVoice}</span>
        </p>
        <p className="mt-3 text-zinc-500">
          Server setting:{' '}
          <code className="text-amber-200/90">LIVE_AGENT_VOICE=&quot;{selectedVoice}&quot;</code>
        </p>
        {selectedVoice === LIVE_AGENT_DEFAULT_VOICE && (
          <p className="mt-2 text-xs text-zinc-500">
            {LIVE_AGENT_DEFAULT_VOICE} is the current default executive voice.
          </p>
        )}
      </section>
    </div>
  );
}
