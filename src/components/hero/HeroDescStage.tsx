'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { HeroDescFxOverlay } from '@/components/hero/HeroDescFxOverlay';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import { runHeroDescIntroScene } from '@/lib/hero-cinema/run-hero-desc-intro-scene';
import { prefersReducedMotion } from '@/lib/hero-gsap-animation';

/** Wraps LCP description + FX mask overlay. */
export function HeroDescStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!animateReady || !stage) return;

    const reduced = prefersReducedMotion();
    let intro: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      intro = runHeroDescIntroScene(stage, reduced);
    }, stage);

    return () => {
      intro?.kill();
      ctx.revert();
    };
  }, [animateReady, animationKey]);

  return (
    <div ref={stageRef} className="hero-desc-stage mb-6 sm:mb-8 max-w-2xl">
      {children}
      <HeroDescFxOverlay />
    </div>
  );
}
