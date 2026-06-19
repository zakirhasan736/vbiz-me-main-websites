'use client';

import { usePageTransition } from '@/components/providers/page-transition-context';

/** Banner mask animators start as soon as the page transition gate is open. */
export function useHeroAnimateReady() {
  const { revealReady, animationKey } = usePageTransition();

  return {
    animateReady: revealReady,
    animationKey,
  };
}
