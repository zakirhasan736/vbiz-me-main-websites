'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePageTransition } from '@/components/providers/page-transition-context';
import { isMediaAssetAvailable } from '@/lib/media-availability';
import { isWebKitBrowser } from '@/lib/scroll-config';

function isVideoReady(video: HTMLVideoElement) {
  return video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

const SAFARI_PAUSE_DELAY_MS = 450;
const IN_VIEW_RATIO_ENTER = 0.12;
const IN_VIEW_RATIO_EXIT = 0.04;

export type UseOptimizedVideoPlaybackOptions = {
  src: string;
  playWhenInView?: boolean;
  playbackEnabled?: boolean;
  autoplayWhenReady?: boolean;
  loop?: boolean;
  /** Safari: buffer at site ready (hero). Other videos load when in view. */
  preloadOnSiteReady?: boolean;
  /** Safari: muted autoplay when ready (homepage hero only). */
  autoplayOnSafari?: boolean;
};

/**
 * Safari — preloads when site ready; muted autoplay only when `autoplayOnSafari` is set (hero).
 * Other browsers — muted autoplay when visible.
 */
export function useOptimizedVideoPlayback({
  src,
  playWhenInView = true,
  playbackEnabled = true,
  autoplayWhenReady = true,
  loop = true,
  preloadOnSiteReady = false,
  autoplayOnSafari = false,
}: UseOptimizedVideoPlaybackOptions) {
  const { revealReady } = usePageTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userStartedRef = useRef(false);
  const userPausedRef = useRef(false);
  const srcResolvedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const safariInitRef = useRef(false);
  const framePrimedRef = useRef(false);

  const [isSafari, setIsSafari] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete',
  );
  const [inView, setInView] = useState(!playWhenInView);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasMetadata, setHasMetadata] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const visible = (playWhenInView ? inView : true) && playbackEnabled;
  const effectiveAutoplay = autoplayWhenReady && (!isSafari || autoplayOnSafari);
  const siteReady = revealReady && pageLoaded;
  const canLoadSrc = isSafari
    ? siteReady && (preloadOnSiteReady || inView)
    : visible;

  useEffect(() => {
    setIsSafari(isWebKitBrowser());
  }, []);

  useEffect(() => {
    if (!isSafari || safariInitRef.current) return;
    safariInitRef.current = true;
    if (!autoplayOnSafari) {
      userPausedRef.current = true;
    }
  }, [isSafari, autoplayOnSafari]);

  useEffect(() => {
    if (pageLoaded) return;
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      setPageLoaded(true);
      return;
    }
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, [pageLoaded]);

  useEffect(() => {
    if (!playWhenInView) {
      setInView(true);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const clearPauseTimer = () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        if (entry.isIntersecting && ratio >= IN_VIEW_RATIO_ENTER) {
          clearPauseTimer();
          setInView(true);
          return;
        }

        if (!entry.isIntersecting || ratio <= IN_VIEW_RATIO_EXIT) {
          clearPauseTimer();
          pauseTimerRef.current = setTimeout(() => {
            setInView(false);
            pauseTimerRef.current = null;
          }, SAFARI_PAUSE_DELAY_MS);
        }
      },
      {
        rootMargin: isSafari ? '40px 0px' : '80px 0px',
        threshold: [0, IN_VIEW_RATIO_EXIT, IN_VIEW_RATIO_ENTER, 0.25],
      },
    );

    observer.observe(root);
    return () => {
      clearPauseTimer();
      observer.disconnect();
    };
  }, [playWhenInView, isSafari]);

  useEffect(() => {
    if (!canLoadSrc || srcResolvedRef.current) return;

    const isExternal = /^https?:\/\//i.test(src);

    if (isExternal) {
      srcResolvedRef.current = true;
      setVideoSrc(src);
      return;
    }

    let cancelled = false;
    void isMediaAssetAvailable(src).then((available) => {
      if (!cancelled && available) {
        srcResolvedRef.current = true;
        setVideoSrc(src);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [canLoadSrc, src]);

  const primeSafariFirstFrame = useCallback((video: HTMLVideoElement) => {
    if (!isSafari || framePrimedRef.current || !video.paused) return;
    framePrimedRef.current = true;
    try {
      if (video.currentTime < 0.01) {
        video.currentTime = 0.001;
      }
    } catch {
      /* seek may fail before data loaded */
    }
  }, [isSafari]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    setIsReady(isVideoReady(video));
    setHasMetadata(video.readyState >= HTMLMediaElement.HAVE_METADATA);

    const onReady = () => {
      setIsReady(true);
      primeSafariFirstFrame(video);
    };
    const onMetadata = () => {
      setHasMetadata(true);
      primeSafariFirstFrame(video);
    };
    const onPlaying = () => setIsPlaying(true);
    const onPause = () => {
      if (!video.ended) setIsPlaying(false);
    };
    const onError = () => {
      setIsReady(false);
      setHasMetadata(false);
      setIsPlaying(false);
    };

    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);
    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', onError);
    };
  }, [videoSrc, primeSafariFirstFrame]);

  const applyPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;
    video.loop = loop;
    video.playsInline = true;

    const wantsPlay =
      visible && isPlaying && (userStartedRef.current || effectiveAutoplay);

    if (!wantsPlay) {
      if (!video.paused) {
        video.pause();
      }
      playPromiseRef.current = null;
      return;
    }

    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return;
    }

    if (!video.paused && !video.ended) {
      return;
    }

    const playAttempt = video.play();
    playPromiseRef.current = playAttempt;
    playAttempt.catch(() => {
      if (playPromiseRef.current === playAttempt) {
        setIsPlaying(false);
      }
    });
  }, [videoSrc, isMuted, loop, visible, isPlaying, effectiveAutoplay]);

  useEffect(() => {
    applyPlayback();
  }, [applyPlayback]);

  useEffect(() => {
    if (!visible || !effectiveAutoplay) return;
    if (isReady && videoSrc && !userPausedRef.current) {
      setIsPlaying(true);
    }
  }, [visible, isReady, videoSrc, effectiveAutoplay]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
        return;
      }
      if (visible && isPlaying) {
        applyPlayback();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [visible, isPlaying, applyPlayback]);

  const togglePlay = useCallback(() => {
    userStartedRef.current = true;
    setIsPlaying((prev) => {
      const next = !prev;
      userPausedRef.current = !next;
      return next;
    });
  }, []);

  const play = useCallback(() => {
    userStartedRef.current = true;
    userPausedRef.current = false;
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    userPausedRef.current = true;
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const showVideo =
    Boolean(videoSrc) && (isReady || (isSafari && hasMetadata));

  return {
    rootRef,
    videoRef,
    videoSrc,
    isReady,
    isMuted,
    isPlaying,
    isSafari,
    inView: visible,
    showVideo,
    togglePlay,
    play,
    pause,
    toggleMute,
    setIsPlaying,
  };
}
