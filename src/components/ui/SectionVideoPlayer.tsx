'use client';

import { type ReactNode } from 'react';
import { useOptimizedVideoPlayback } from '@/hooks/use-optimized-video-playback';
import {
  VideoPlayerControls,
  useVideoTouchReveal,
} from '@/components/ui/VideoPlayerControls';

type SectionVideoPlayerProps = {
  src: string;
  ariaLabel: string;
  className?: string;
  playWhenInView?: boolean;
  playbackEnabled?: boolean;
  autoplayAfterLoad?: boolean;
  loop?: boolean;
  objectFit?: 'cover' | 'contain';
  /** Safari: start buffering when site is ready (use for hero). */
  preloadOnSiteReady?: boolean;
  /** Safari: muted autoplay when ready (homepage hero). */
  autoplayOnSafari?: boolean;
  children?: ReactNode;
};

/** Safari-optimized muted video with always-visible corner controls + hover/touch center control. */
export function SectionVideoPlayer({
  src,
  ariaLabel,
  className = 'absolute inset-0 h-full w-full object-cover',
  playWhenInView = true,
  playbackEnabled = true,
  autoplayAfterLoad = true,
  loop = true,
  objectFit = 'cover',
  preloadOnSiteReady = false,
  autoplayOnSafari = false,
  children,
}: SectionVideoPlayerProps) {
  const {
    rootRef,
    videoRef,
    videoSrc,
    isMuted,
    isPlaying,
    isSafari,
    showVideo,
    togglePlay,
    toggleMute,
  } = useOptimizedVideoPlayback({
    src,
    playWhenInView,
    playbackEnabled,
    autoplayWhenReady: autoplayAfterLoad,
    loop,
    preloadOnSiteReady,
    autoplayOnSafari,
  });

  const { forceCenterVisible, onTouchStart } = useVideoTouchReveal();
  const safariPaused = isSafari && !isPlaying && !autoplayOnSafari;

  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const opacityClass = showVideo
    ? 'opacity-100 site-video-player__media--ready'
    : 'opacity-0';
  const preloadValue = isSafari
    ? videoSrc
      ? 'auto'
      : 'none'
    : showVideo
      ? 'auto'
      : 'metadata';

  return (
    <div
      ref={rootRef}
      className="group/video site-video-player relative h-full w-full min-h-[200px] overflow-hidden"
      onTouchStart={onTouchStart}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          loop={loop}
          muted
          playsInline
          preload={preloadValue}
          disablePictureInPicture
          disableRemotePlayback
          aria-label={showVideo ? ariaLabel : undefined}
          className={`${className} ${fitClass} site-video-player__media ${opacityClass}`}
        />
      ) : (
        <div className="absolute inset-0 bg-brand-deep" aria-hidden="true" />
      )}

      {children}

      <VideoPlayerControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        showVideo={showVideo}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        forceCenterVisible={forceCenterVisible || safariPaused}
        centerLabel={`Play ${ariaLabel}`}
      />
    </div>
  );
}
