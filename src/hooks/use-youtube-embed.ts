'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion-animation-utils';
import { isWebKitBrowser } from '@/lib/scroll-config';
import {
  buildYouTubeEmbedSrc,
  getYouTubeThumbnailUrl,
  type YouTubeEmbedOptions,
} from '@/lib/youtube-embed';

type UseYouTubeEmbedOptions = {
  videoId: string;
  embedOptions: YouTubeEmbedOptions;
  enabled?: boolean;
  playWhenInView?: boolean;
  /** Safari / WebKit — require user tap before mounting iframe. */
  tapToPlayOnWebKit?: boolean;
  /** Non-WebKit — wait until autoplay is allowed before first iframe mount. */
  waitForAutoplay?: boolean;
  autoplay?: boolean;
  /** WebKit — remove iframe when scrolled out of view to reduce lag. */
  unloadWhenHidden?: boolean;
};

export function useYouTubeEmbed({
  videoId,
  embedOptions,
  enabled = true,
  playWhenInView = true,
  tapToPlayOnWebKit = true,
  waitForAutoplay = false,
  autoplay = false,
  unloadWhenHidden = true,
}: UseYouTubeEmbedOptions) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isWebKit, setIsWebKit] = useState(false);
  const [inView, setInView] = useState(!playWhenInView);
  const [userStarted, setUserStarted] = useState(false);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  const needsTap = isWebKit && tapToPlayOnWebKit;

  useEffect(() => {
    setIsWebKit(isWebKitBrowser());
  }, []);

  useEffect(() => {
    if (!playWhenInView) {
      setInView(true);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: isWebKit ? '0px 0px' : '80px 0px',
        threshold: isWebKit ? 0.2 : 0.12,
      },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [playWhenInView, isWebKit]);

  const startPlayback = useCallback(() => {
    setUserStarted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEmbedSrc(null);
      return;
    }

    if (!enabled || !inView) {
      if (isWebKit && unloadWhenHidden) {
        setEmbedSrc(null);
        setUserStarted(false);
      }
      return;
    }

    if (needsTap && !userStarted) {
      return;
    }

    if (waitForAutoplay && !autoplay && !isWebKit) {
      return;
    }

    setEmbedSrc((current) => {
      if (current) return current;

      const allowAutoplay =
        !isWebKit &&
        !needsTap &&
        (embedOptions.autoplay ?? autoplay) &&
        !(waitForAutoplay && !autoplay);

      return buildYouTubeEmbedSrc(videoId, {
        ...embedOptions,
        controls: embedOptions.controls ?? false,
        autoplay: allowAutoplay,
        mute: true,
        fs: embedOptions.fs ?? false,
      });
    });
  }, [
    enabled,
    inView,
    isWebKit,
    unloadWhenHidden,
    needsTap,
    userStarted,
    waitForAutoplay,
    autoplay,
    videoId,
    embedOptions,
  ]);

  const showTapPrompt = needsTap && !userStarted && enabled && inView && !prefersReducedMotion();
  const thumbnailUrl = getYouTubeThumbnailUrl(videoId);

  return {
    rootRef,
    embedSrc,
    isWebKit,
    inView,
    showTapPrompt,
    thumbnailUrl,
    startPlayback,
  };
}
