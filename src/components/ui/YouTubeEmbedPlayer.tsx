'use client';

import { Play } from 'lucide-react';
import { type ReactNode, useMemo } from 'react';
import { useYouTubeEmbed } from '@/hooks/use-youtube-embed';
import { useYouTubeIframeControls } from '@/hooks/use-youtube-iframe-controls';
import {
  VideoPlayerControls,
  useVideoTouchReveal,
} from '@/components/ui/VideoPlayerControls';
import type { YouTubeEmbedOptions } from '@/lib/youtube-embed';

type YouTubeEmbedPlayerProps = {
  videoId: string;
  title: string;
  className?: string;
  playWhenInView?: boolean;
  enabled?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  /** Hide native YouTube controls — use custom buttons instead. */
  showYouTubeControls?: boolean;
  customControls?: boolean;
  fit?: 'contain' | 'cover';
  waitForAutoplay?: boolean;
  tapToPlayOnWebKit?: boolean;
  children?: ReactNode;
};

/** YouTube iframe with hidden native UI + custom play/pause/mute. Safari starts paused + muted. */
export function YouTubeEmbedPlayer({
  videoId,
  title,
  className = '',
  playWhenInView = true,
  enabled = true,
  autoplay = false,
  muted: _muted = true,
  showYouTubeControls = false,
  customControls = true,
  fit = 'contain',
  waitForAutoplay = false,
  tapToPlayOnWebKit = true,
  children,
}: YouTubeEmbedPlayerProps) {
  const embedOptions = useMemo<YouTubeEmbedOptions>(
    () => ({
      autoplay,
      mute: true,
      controls: showYouTubeControls,
      playsinline: true,
      modestbranding: true,
      fs: false,
    }),
    [autoplay, showYouTubeControls],
  );

  const {
    rootRef,
    embedSrc,
    isWebKit,
    showTapPrompt,
    thumbnailUrl,
    startPlayback,
  } = useYouTubeEmbed({
    videoId,
    embedOptions,
    enabled,
    playWhenInView,
    tapToPlayOnWebKit,
    waitForAutoplay,
    autoplay,
    unloadWhenHidden: true,
  });

  const autoplayInUrl = Boolean(
    embedSrc?.includes('autoplay=1') && !isWebKit,
  );

  const {
    iframeRef,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    onIframeLoad,
  } = useYouTubeIframeControls(Boolean(embedSrc), autoplayInUrl);

  const { forceCenterVisible, onTouchStart } = useVideoTouchReveal();
  const showCenterPlay = isWebKit ? !isPlaying : forceCenterVisible || !isPlaying;

  const fitClass =
    fit === 'cover'
      ? 'youtube-embed-player__iframe--cover'
      : 'youtube-embed-player__iframe--contain';

  return (
    <div
      ref={rootRef}
      onTouchStart={onTouchStart}
      className={`group/video youtube-embed-player youtube-embed-player--chromeless relative h-full w-full min-h-0 overflow-hidden bg-brand-deep ${isWebKit ? 'youtube-embed-player--webkit' : ''} ${className}`}
    >
      {embedSrc ? (
        <iframe
          ref={iframeRef}
          className={`youtube-embed-player__iframe ${fitClass}`}
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="eager"
          onLoad={onIframeLoad}
        />
      ) : showTapPrompt ? (
        <button
          type="button"
          className="youtube-embed-player__poster absolute inset-0 z-[5] flex items-center justify-center border-0 p-0 cursor-pointer"
          onClick={startPlayback}
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <span className="youtube-embed-player__play-btn relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white">
            <Play size={26} fill="currentColor" className="ml-1" aria-hidden="true" />
          </span>
        </button>
      ) : (
        <div className="absolute inset-0 bg-brand-deep" aria-hidden="true" />
      )}

      {children}

      {customControls && embedSrc ? (
        <VideoPlayerControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          showVideo={Boolean(embedSrc)}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          forceCenterVisible={showCenterPlay}
          centerLabel={`Play ${title}`}
        />
      ) : null}
    </div>
  );
}
