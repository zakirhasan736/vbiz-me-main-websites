'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { HeroTitleFxOverlay } from '@/components/hero/HeroTitleFxOverlay';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import { prefersReducedMotion } from '@/lib/hero-gsap-animation';
import {
  bindHeroTitleScrollFx,
  runHeroIntroScene,
} from '@/lib/hero-cinema/run-hero-intro-scene';

/** Wraps LCP title + FX overlay; runs word-by-word cinema on overlay only. */
export function HeroTitleStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!animateReady || !stage) return;

    const reduced = prefersReducedMotion();
    let intro: gsap.core.Timeline | null = null;
    let unbindScroll = () => {};

    const ctx = gsap.context(() => {
      intro = runHeroIntroScene(stage, reduced);
      unbindScroll = bindHeroTitleScrollFx(stage, reduced);
    }, stage);

    return () => {
      intro?.kill();
      unbindScroll();
      ctx.revert();
    };
  }, [animateReady, animationKey]);

  return (
    <div ref={stageRef} className="hero-title-stage mb-6">
      {children}
      <HeroTitleFxOverlay />
    </div>
  );
}
