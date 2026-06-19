'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import {
  buildHeroLeftTimeline,
  lockHeroSectionVisible,
  prefersReducedMotion,
  resetHeroSectionPending,
} from '@/lib/hero-gsap-animation';

/** Client shell — runs GSAP on SSR banner markup inside `children`. */
export function HeroBannerAnimator({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useLayoutEffect(() => {
    const section = rootRef.current?.closest('.section-hero') as HTMLElement | null;
    if (!animateReady) {
      resetHeroSectionPending(section);
    }
  }, [animateReady, animationKey]);

  useGSAP(
    () => {
      if (!animateReady || !rootRef.current) return;

      const section = rootRef.current.closest('.section-hero') as HTMLElement | null;

      timelineRef.current?.kill();

      timelineRef.current = buildHeroLeftTimeline(
        rootRef.current,
        prefersReducedMotion(),
      );

      timelineRef.current.eventCallback('onComplete', () => {
        lockHeroSectionVisible(section);
      });

      return () => {
        timelineRef.current?.kill();
        timelineRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [animateReady, animationKey] },
  );

  return (
    <div
      ref={rootRef}
      className="hero-banner-left lg:col-span-6 flex flex-col relative z-999 items-start text-left"
    >
      {children}
    </div>
  );
}
