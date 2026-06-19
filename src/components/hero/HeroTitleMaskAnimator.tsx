'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { HeroMaskFxOverlay } from '@/components/hero/HeroMaskFxOverlay';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import { runHeroIntroScene } from '@/lib/hero-cinema/run-mask-reveal-scene';
import { HERO_TITLE_LINES } from '@/lib/hero-title-copy';
import { prefersReducedMotion } from '@/lib/hero-gsap-animation';

const TITLE_TYPE =
  'text-[1.65rem] leading-[1.12] sm:text-5xl lg:text-[52px] font-medium tracking-tight sm:leading-tight text-white text-left';

/** Client-only mask overlay — LCP title is a server sibling, never touched by GSAP. */
export function HeroTitleMaskAnimator() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useLayoutEffect(() => {
    const stage = mountRef.current?.closest('.hero-title-stage') as HTMLElement | null;
    if (!animateReady || !stage) return;

    const reduced = prefersReducedMotion();
    let intro: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      intro = runHeroIntroScene(stage, reduced);
    }, stage);

    return () => {
      intro?.kill();
      ctx.revert();
    };
  }, [animateReady, animationKey]);

  return (
    <div ref={mountRef} className="hero-title-fx-mount absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
      <HeroMaskFxOverlay lines={HERO_TITLE_LINES} typeClass={TITLE_TYPE} variant="title" />
    </div>
  );
}
