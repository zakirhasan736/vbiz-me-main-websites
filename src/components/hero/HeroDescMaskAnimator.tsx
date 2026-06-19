'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { HeroMaskFxOverlay } from '@/components/hero/HeroMaskFxOverlay';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import { runHeroDescIntroScene } from '@/lib/hero-cinema/run-mask-reveal-scene';
import { HERO_DESC_LINES } from '@/lib/hero-desc-copy';
import { prefersReducedMotion } from '@/lib/hero-gsap-animation';

const DESC_TYPE =
  'text-base sm:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed text-left';

/** Client-only mask overlay — LCP description is a server sibling, never touched by GSAP. */
export function HeroDescMaskAnimator() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useLayoutEffect(() => {
    const stage = mountRef.current?.closest('.hero-desc-stage') as HTMLElement | null;
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
    <div ref={mountRef} className="hero-desc-fx-mount absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
      <HeroMaskFxOverlay lines={HERO_DESC_LINES} typeClass={DESC_TYPE} variant="desc" />
    </div>
  );
}
