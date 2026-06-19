'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import {
  buildHeroLeftTimeline,
  lockHeroSectionVisible,
  prefersReducedMotion,
  resetHeroSectionPending,
} from '@/lib/hero-gsap-animation';

/** Headless GSAP driver — title/description animate via CSS; this runs eyebrow/CTA/trust only. */
export function HeroBannerAnimator() {
  const mountRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useLayoutEffect(() => {
    const section = mountRef.current?.closest('.section-hero') as HTMLElement | null;
    if (!animateReady) {
      resetHeroSectionPending(section);
    }
  }, [animateReady, animationKey]);

  useGSAP(
    () => {
      const root = mountRef.current?.parentElement;
      if (!animateReady || !root) return;

      const section = root.closest('.section-hero') as HTMLElement | null;

      timelineRef.current?.kill();

      timelineRef.current = buildHeroLeftTimeline(root, prefersReducedMotion());

      timelineRef.current.eventCallback('onComplete', () => {
        lockHeroSectionVisible(section);
      });

      return () => {
        timelineRef.current?.kill();
        timelineRef.current = null;
      };
    },
    { scope: mountRef, dependencies: [animateReady, animationKey] },
  );

  return <span ref={mountRef} className="sr-only" aria-hidden="true" />;
}
