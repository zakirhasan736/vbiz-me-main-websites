'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import {
  PREMIUM_EASE,
  SLIDE_DISTANCE,
  SLIDE_VISIBLE_STATE,
  getSlideDuration,
  getSlideHiddenState,
  prefersReducedMotion,
} from '@/lib/motion-animation-utils';

type HeroSlideEntranceProps = {
  side: 'left' | 'right';
  children: ReactNode;
  className?: string;
  onEntranceComplete?: () => void;
};

export function HeroSlideEntrance({
  side,
  children,
  className = '',
  onEntranceComplete,
}: HeroSlideEntranceProps) {
  const { animateReady } = useHeroAnimateReady();

  if (prefersReducedMotion()) {
    return (
      <div data-hero-entrance className={className}>
        {children}
      </div>
    );
  }

  const distance = side === 'left' ? SLIDE_DISTANCE.XL : SLIDE_DISTANCE.LG;
  const direction = side === 'left' ? 'left' : 'right';
  const hidden = getSlideHiddenState(direction, distance, false);

  return (
    <motion.div
      data-hero-entrance
      data-hero-entrance-side={side}
      className={className}
      initial={hidden}
      animate={animateReady ? SLIDE_VISIBLE_STATE : hidden}
      transition={{
        duration: getSlideDuration(distance),
        ease: PREMIUM_EASE,
      }}
      onAnimationComplete={() => {
        if (animateReady) onEntranceComplete?.();
      }}
    >
      {children}
    </motion.div>
  );
}
