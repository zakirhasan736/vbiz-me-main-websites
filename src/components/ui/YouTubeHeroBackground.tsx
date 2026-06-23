'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion-animation-utils';
import { isWebKitBrowser } from '@/lib/scroll-config';
import { buildYouTubeEmbedSrc } from '@/lib/youtube-embed';

type YouTubeHeroBackgroundProps = {
  videoId: string;
  title?: string;
};

/** Elementor-style cover-fit YouTube iframe for page hero backgrounds. */
export function YouTubeHeroBackground({
  videoId,
  title = 'Background video',
}: YouTubeHeroBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);
  const [isWebKit, setIsWebKit] = useState(false);
  const [inView, setInView] = useState(false);

  const backgroundOptions = useMemo(
    () => ({
      autoplay: true,
      mute: true,
      controls: false,
      loop: true,
      fs: false,
      playsinline: true,
      modestbranding: true,
    }),
    [],
  );

  useEffect(() => {
    setIsWebKit(isWebKitBrowser());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: isWebKit ? '0px 0px' : '120px 0px',
        threshold: isWebKit ? 0.15 : 0.01,
      },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [isWebKit]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEmbedSrc(null);
      return;
    }

    if (!inView) {
      if (isWebKit) {
        setEmbedSrc(null);
      }
      return;
    }

    setEmbedSrc((current) => {
      if (current) return current;
      return buildYouTubeEmbedSrc(videoId, backgroundOptions);
    });
  }, [inView, isWebKit, videoId, backgroundOptions]);

  return (
    <div
      ref={rootRef}
      className={`page-hero-youtube-bg absolute inset-0 z-0 overflow-hidden pointer-events-none${isWebKit ? ' page-hero-youtube-bg--webkit' : ''}`}
      aria-hidden="true"
    >
      {embedSrc ? (
        <div className="page-hero-youtube-bg__frame">
          <iframe
            className="page-hero-youtube-bg__embed"
            src={embedSrc}
            title={title}
            role="presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
            tabIndex={-1}
          />
        </div>
      ) : null}
    </div>
  );
}
