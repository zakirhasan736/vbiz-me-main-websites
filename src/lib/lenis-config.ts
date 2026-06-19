import type Lenis from 'lenis';

/** Cinematic programmatic scroll (anchors, back-to-top). */
export const LENIS_SCROLL_TO_DURATION = 0.6;

/** Soft ease-out — long cinematic deceleration at the end of scrollTo. */
export const LENIS_EASING = (t: number) => 1 - Math.pow(1 - t, 5);
 
/** Primary lerp — lower = silkier, more cinematic glide (not snappy). */
export const LENIS_LERP = 0.075;

export const LENIS_WHEEL_MULTIPLIER = 0.9;
export const LENIS_TOUCH_MULTIPLIER = 1.08;
export const LENIS_SYNC_TOUCH_LERP = 0.08;

/**
 * Site-wide Lenis — cinematic smooth scroll.
 * Lower lerp + moderated wheel = buttery, premium feel (not twitchy or fast).
 */
export const LENIS_OPTIONS: ConstructorParameters<typeof Lenis>[0] = {
  lerp: LENIS_LERP,
  wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
  touchMultiplier: LENIS_TOUCH_MULTIPLIER,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: LENIS_SYNC_TOUCH_LERP,
  touchInertiaExponent: 1.9,
  autoRaf: false,
  autoResize: true,
  overscroll: true,
  anchors: {
    offset: -180,
    duration: LENIS_SCROLL_TO_DURATION,
    easing: LENIS_EASING,
  },
};

/** Instant scroll when user prefers reduced motion. */
export const LENIS_REDUCED_MOTION_OPTIONS: Partial<ConstructorParameters<typeof Lenis>[0]> = {
  lerp: 1,
  smoothWheel: false,
  syncTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 1,
};

export function prefersReducedScrollMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function buildLenisOptions(): ConstructorParameters<typeof Lenis>[0] {
  const reduced = prefersReducedScrollMotion();
  const coarseTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  const options: ConstructorParameters<typeof Lenis>[0] = {
    ...LENIS_OPTIONS,
    prevent: shouldPreventLenisScroll,
    ...(reduced ? LENIS_REDUCED_MOTION_OPTIONS : {}),
    // Native touch scroll on phones — syncTouch fights iframe + toggle interactions.
    ...(coarseTouch && !reduced ? { syncTouch: false, touchMultiplier: 1 } : {}),
  };

  return options;
}

/** Keep Lenis from hijacking touch/wheel inside live vCard phone lanes. */
export function shouldPreventLenisScroll(node: HTMLElement): boolean {
  return Boolean(
    node.closest(
      '.vcard-interactive-lane, .vcard-iframe-zone, .vcard-phone-mockup, .vcard-phone-screen, .vcard-iframe-shell, #industries-vcard-lane',
    ),
  );
}

export function applyCinematicLenisOptions(instance: Lenis, reduced: boolean) {
  if (reduced) {
    Object.assign(instance.options, LENIS_REDUCED_MOTION_OPTIONS);
    return;
  }

  const coarseTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  instance.options.lerp = LENIS_LERP;
  instance.options.smoothWheel = true;
  instance.options.syncTouch = !coarseTouch;
  instance.options.wheelMultiplier = LENIS_WHEEL_MULTIPLIER;
  instance.options.touchMultiplier = coarseTouch ? 1 : LENIS_TOUCH_MULTIPLIER;
  instance.options.syncTouchLerp = LENIS_SYNC_TOUCH_LERP;
  instance.options.prevent = shouldPreventLenisScroll;
}
