'use client';

import { useLayoutEffect, useState } from 'react';
import { usePageTransition } from '@/components/providers/page-transition-context';

/** Banner content mounted + page transition clear — start GSAP immediately (no window load wait) */
export function useHeroAnimateReady() {
  const { revealReady, animationKey } = usePageTransition();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!revealReady) {
      setReady(false);
      return;
    }

    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, [revealReady, animationKey]);

  return {
    animateReady: revealReady && ready,
    animationKey,
  };
}
