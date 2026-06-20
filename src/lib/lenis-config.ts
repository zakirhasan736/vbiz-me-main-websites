import type Lenis from 'lenis';

/** Cinematic programmatic scroll (anchors, back-to-top). */
export const LENIS_SCROLL_TO_DURATION = 0.6;

/** Soft ease-out — long cinematic deceleration at the end of scrollTo. */
export const LENIS_EASING = (t: number) => 1 - Math.pow(1 - t, 5);

/** Primary lerp — lower = silkier glide (not snappy). */
export const LENIS_LERP = 0.075;

/** Mobile / touch — faster response than desktop cinematic scroll. */
export const LENIS_LERP_MOBILE = 0.14;
export const LENIS_TOUCH_MULTIPLIER_MOBILE = 1.42;
export const LENIS_SYNC_TOUCH_LERP_MOBILE = 0.17;
export const LENIS_TOUCH_INERTIA_MOBILE = 1.65;

/** macOS Safari desktop — smooth wheel, responsive lerp (trackpad-optimised). */
export const LENIS_LERP_MACOS_SAFARI = 0.112;
export const LENIS_WHEEL_MULTIPLIER_MACOS_SAFARI = 0.92;
export const LENIS_TOUCH_INERTIA_MACOS_SAFARI = 1.72;

/** Other WebKit desktop (legacy fallback). */
export const LENIS_LERP_WEBKIT_DESKTOP = 0.1;
export const LENIS_WHEEL_MULTIPLIER_WEBKIT = 0.85;

export const LENIS_WHEEL_MULTIPLIER = 0.9;
export const LENIS_TOUCH_MULTIPLIER = 1.08;
export const LENIS_SYNC_TOUCH_LERP = 0.08;

const LENIS_MOBILE_OPTIONS: Partial<ConstructorParameters<typeof Lenis>[0]> = {
  syncTouch: true,
  syncTouchLerp: LENIS_SYNC_TOUCH_LERP_MOBILE,
  touchMultiplier: LENIS_TOUCH_MULTIPLIER_MOBILE,
  lerp: LENIS_LERP_MOBILE,
  touchInertiaExponent: LENIS_TOUCH_INERTIA_MOBILE,
  smoothWheel: true,
};

const LENIS_MACOS_SAFARI_OPTIONS: Partial<ConstructorParameters<typeof Lenis>[0]> = {
  syncTouch: false,
  smoothWheel: true,
  lerp: LENIS_LERP_MACOS_SAFARI,
  wheelMultiplier: LENIS_WHEEL_MULTIPLIER_MACOS_SAFARI,
  touchMultiplier: 1,
  touchInertiaExponent: LENIS_TOUCH_INERTIA_MACOS_SAFARI,
  overscroll: true,
};

const LENIS_WEBKIT_DESKTOP_OPTIONS: Partial<ConstructorParameters<typeof Lenis>[0]> = {
  syncTouch: false,
  smoothWheel: true,
  lerp: LENIS_LERP_WEBKIT_DESKTOP,
  wheelMultiplier: LENIS_WHEEL_MULTIPLIER_WEBKIT,
  touchMultiplier: 1,
};

const LENIS_PREVENT_SELECTOR =
  '.vcard-interactive-lane, .vcard-iframe-zone, .vcard-phone-mockup, .vcard-phone-screen, .vcard-iframe-shell, #industries-vcard-lane, .industry-vcard-mobile-modal, .portfolio-vcard-modal, .portfolio-vcard-modal-backdrop, .vcard-mobile-bottom-modal';

/**
 * Site-wide Lenis defaults (Chrome / Firefox desktop).
 * Safari profiles are applied in buildLenisOptions().
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

/**
 * True iOS / iPadOS only — NOT MacBooks (trackpad reports maxTouchPoints > 1).
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;

  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;

  return (
    navigator.platform === 'MacIntel' &&
    navigator.maxTouchPoints > 1 &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );
}

/** Phones / tablets with coarse primary pointer. */
export function isCoarseTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

/** Safari / WebKit — excludes Chromium, Edge, Firefox. */
export function isWebKitBrowser(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent;
  const isAppleWebKit = /AppleWebKit/i.test(ua);
  const isChromium = /Chrome|CriOS|Edg|OPR|Chromium/i.test(ua);
  const isFirefox = /Firefox|FxiOS/i.test(ua);

  if (isFirefox) return false;
  if (isAppleWebKit && !isChromium) return true;
  if (/Safari/i.test(ua) && !isChromium) return true;

  return false;
}

/** macOS Safari desktop — WebKit + mouse/trackpad primary input. */
export function isMacOSSafariDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isWebKitBrowser()) return false;
  if (isIOS() || isCoarseTouchDevice()) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** GSAP pin mode — transform avoids fixed-position pin bugs with Lenis on Safari. */
export function getScrollTriggerPinType(): 'transform' | 'fixed' {
  if (typeof document === 'undefined') return 'fixed';
  if (isWebKitBrowser() || isIOS()) return 'transform';
  return 'fixed';
}

export function buildLenisOptions(): ConstructorParameters<typeof Lenis>[0] {
  const reduced = prefersReducedScrollMotion();
  const coarseTouch = isCoarseTouchDevice();
  const macSafari = isMacOSSafariDesktop();
  const webkit = isWebKitBrowser();

  const options: ConstructorParameters<typeof Lenis>[0] = {
    ...LENIS_OPTIONS,
    prevent: shouldPreventLenisScroll,
    ...(reduced ? LENIS_REDUCED_MOTION_OPTIONS : {}),
  };

  if (reduced) return options;

  /* Touch phones / tablets — fast smooth syncTouch */
  if (coarseTouch || isIOS()) {
    return { ...options, ...LENIS_MOBILE_OPTIONS };
  }

  /* macOS Safari — optimised trackpad wheel smoothing */
  if (macSafari) {
    return { ...options, ...LENIS_MACOS_SAFARI_OPTIONS };
  }

  /* Other WebKit desktop */
  if (webkit) {
    return { ...options, ...LENIS_WEBKIT_DESKTOP_OPTIONS };
  }

  return options;
}

/** Keep Lenis from hijacking touch/wheel inside interactive zones. */
export function shouldPreventLenisScroll(node: HTMLElement): boolean {
  return Boolean(node.closest(LENIS_PREVENT_SELECTOR));
}

export function applyCinematicLenisOptions(instance: Lenis, reduced: boolean) {
  if (reduced) {
    Object.assign(instance.options, LENIS_REDUCED_MOTION_OPTIONS);
    return;
  }

  const coarseTouch = isCoarseTouchDevice();
  const macSafari = isMacOSSafariDesktop();
  const webkit = isWebKitBrowser();

  if (coarseTouch || isIOS()) {
    Object.assign(instance.options, { ...LENIS_MOBILE_OPTIONS, prevent: shouldPreventLenisScroll });
    return;
  }

  if (macSafari) {
    Object.assign(instance.options, { ...LENIS_MACOS_SAFARI_OPTIONS, prevent: shouldPreventLenisScroll });
    return;
  }

  if (webkit) {
    Object.assign(instance.options, { ...LENIS_WEBKIT_DESKTOP_OPTIONS, prevent: shouldPreventLenisScroll });
    return;
  }

  Object.assign(instance.options, {
    lerp: LENIS_LERP,
    smoothWheel: true,
    syncTouch: true,
    wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
    touchMultiplier: LENIS_TOUCH_MULTIPLIER,
    syncTouchLerp: LENIS_SYNC_TOUCH_LERP,
    prevent: shouldPreventLenisScroll,
  });
}

/** Tag <html> for WebKit / Safari-specific CSS. */
export function applyLenisDocumentClasses(reduced: boolean) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const webkit = isWebKitBrowser() && !reduced;

  root.classList.toggle('lenis-webkit', webkit);
  root.classList.toggle('lenis-safari-desktop', isMacOSSafariDesktop() && !reduced);
  root.classList.toggle('lenis-touch-smooth', (isIOS() || isCoarseTouchDevice()) && !reduced);
}

export function clearLenisDocumentClasses() {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.remove('lenis-webkit', 'lenis-safari-desktop', 'lenis-touch-smooth');
}
