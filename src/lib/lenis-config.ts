import type Lenis from 'lenis';

/** Duration for programmatic scrollTo (anchors, back-to-top). */
export const LENIS_SCROLL_TO_DURATION = 0.85;

/**
 * Lenis root options — lerp-based wheel scroll (no root duration; that made wheel feel sluggish).
 * Higher lerp + multipliers = responsive scroll that still eases smoothly.
 */
export const LENIS_OPTIONS: ConstructorParameters<typeof Lenis>[0] = {
  lerp: 0.15,
  wheelMultiplier: 1.25,
  touchMultiplier: 1.35,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.12,
  autoRaf: false,
  autoResize: true,
};
