'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

type VideoPlayerControlsProps = {
  isPlaying: boolean;
  isMuted: boolean;
  showVideo: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  forceCenterVisible?: boolean;
  centerLabel?: string;
  children?: ReactNode;
};

/** Top-right mute + pause always visible; center play/pause on hover and touch. */
export function VideoPlayerControls({
  isPlaying,
  isMuted,
  showVideo,
  onTogglePlay,
  onToggleMute,
  forceCenterVisible = false,
  centerLabel = 'Play video',
  children,
}: VideoPlayerControlsProps) {
  const showCenter = !isPlaying || forceCenterVisible;

  return (
    <>
      {children}

      <div className="site-video-controls site-video-controls--corner absolute top-3 right-3 z-40 flex items-center gap-2 sm:top-4 sm:right-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          disabled={!showVideo}
          className="site-video-control-btn site-video-control-btn--mute flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white shadow-lg transition-all hover:bg-black hover:text-brand-gold active:scale-95 disabled:opacity-40"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={14} strokeWidth={2} /> : <Volume2 size={14} strokeWidth={2} />}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          disabled={!showVideo}
          className="site-video-control-btn site-video-control-btn--pause flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-black shadow-lg transition-all hover:bg-yellow-300 active:scale-95 disabled:opacity-40"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause size={13} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={13} fill="currentColor" className="ml-0.5" strokeWidth={0} />
          )}
        </button>
      </div>

      <div
        className={`site-video-controls site-video-controls--center absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-200 ${
          showCenter
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none group-hover/video:opacity-100 group-hover/video:pointer-events-auto group-focus-within/video:opacity-100 group-focus-within/video:pointer-events-auto'
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          disabled={!showVideo}
          className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/95 text-black shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
          aria-label={isPlaying ? 'Pause video' : centerLabel}
        >
          {isPlaying ? (
            <Pause size={22} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={22} fill="currentColor" className="ml-1" strokeWidth={0} />
          )}
        </button>
      </div>
    </>
  );
}

export function useVideoTouchReveal(durationMs = 2800) {
  const [forceCenterVisible, setForceCenterVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onTouchStart = useCallback(() => {
    setForceCenterVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setForceCenterVisible(false), durationMs);
  }, [durationMs]);

  return { forceCenterVisible, onTouchStart };
}
