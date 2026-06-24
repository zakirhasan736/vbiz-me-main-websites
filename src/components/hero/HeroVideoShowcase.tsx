'use client';

import { useCallback, useEffect, useState } from 'react';
import { HeroSlideEntrance } from '@/components/hero/HeroSlideEntrance';
import { FOUNDER_INTRO_VIDEO } from '@/lib/site-assets';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import { prefersReducedMotion } from '@/lib/motion-animation-utils';
import { SectionVideoPlayer } from '@/components/ui/SectionVideoPlayer';

/** Hero demo video — local MP4; muted autoplay after entrance settles (Safari-stable). */
export default function HeroVideoShowcase() {
  const { animateReady } = useHeroAnimateReady();
  const [pageLoaded, setPageLoaded] = useState(
    () => typeof document !== 'undefined' && document.readyState === 'complete',
  );
  const [entranceSettled, setEntranceSettled] = useState(() => prefersReducedMotion());

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
    if (!animateReady || entranceSettled) return;
    if (prefersReducedMotion()) {
      setEntranceSettled(true);
    }
  }, [animateReady, entranceSettled]);

  const handleEntranceComplete = useCallback(() => {
    setEntranceSettled(true);
  }, []);

  const shouldAutoplay = animateReady && pageLoaded && entranceSettled;

  return (
    <HeroSlideEntrance
      side="right"
      className="hero-banner-right lg:col-span-6 flex justify-center lg:justify-end relative md:pr-4 w-full"
      onEntranceComplete={handleEntranceComplete}
    >
      <div className="relative w-full flex justify-center lg:justify-end">
        <div className="hero-video-ambient-blur absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,380px)] aspect-square bg-brand-gold/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="hero-video-ambient-blur absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[min(100%,250px)] aspect-square bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="hero-video-showcase__panel hero-video-enter relative w-full max-w-[620px] bg-brand-surface/75 rounded-2xl border border-emerald-500/15 group shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(16,185,129,0.08)] overflow-hidden z-10">
          <div className="relative w-full aspect-video bg-brand-deep">
            <SectionVideoPlayer
              src={FOUNDER_INTRO_VIDEO}
              ariaLabel="Founder introduction demo video"
              playWhenInView={false}
              playbackEnabled={animateReady}
              autoplayAfterLoad={shouldAutoplay}
              autoplayOnSafari
              preloadOnSiteReady
              heroPlayback
              objectFit="contain"
              className="absolute inset-0 h-full w-full bg-brand-deep"
            />
          </div>
        </div>
      </div>
    </HeroSlideEntrance>
  );
}
