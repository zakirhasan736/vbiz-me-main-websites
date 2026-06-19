'use client';

import { useLayoutEffect, useState } from 'react';
import { usePageTransition } from '@/components/providers/page-transition-context';

/** Banner content mounted + page transition clear — sync so GSAP matches SSR title state immediately */
export function useHeroAnimateReady() {
  const { revealReady, animationKey } = usePageTransition();
  const [ready, setReady] = useState(revealReady);

  useLayoutEffect(() => {
    setReady(revealReady);
  }, [revealReady, animationKey]);

  return {
    animateReady: revealReady && ready,
    animationKey,
  };
}
