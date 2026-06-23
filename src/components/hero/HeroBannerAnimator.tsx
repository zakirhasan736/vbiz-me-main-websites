'use client';

import { useEffect, useRef } from 'react';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';

function unlockHeroSection(section: HTMLElement | null) {
  section?.classList.remove('hero-banner-pending');
}

/** Clears hero pending state immediately — no entrance animations. */
export function HeroBannerAnimator() {
  const mountRef = useRef<HTMLSpanElement>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useEffect(() => {
    const section = mountRef.current?.closest('.section-hero') as HTMLElement | null;
    if (!animateReady) return;
    unlockHeroSection(section);
  }, [animateReady, animationKey]);

  return <span ref={mountRef} className="sr-only" aria-hidden="true" />;
}
