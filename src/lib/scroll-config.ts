export function prefersReducedScrollMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;

  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;

  return (
    navigator.platform === 'MacIntel' &&
    navigator.maxTouchPoints > 1 &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );
}

export function isCoarseTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

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

export function isMacOSSafariDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isWebKitBrowser()) return false;
  if (isIOS() || isCoarseTouchDevice()) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/** ScrollTrigger pin mode — kept for legacy callers; native scroll no longer uses GSAP. */
export function getScrollTriggerPinType(): 'transform' | 'fixed' {
  if (typeof document === 'undefined') return 'fixed';
  if (isWebKitBrowser() || isIOS()) return 'transform';
  return 'fixed';
}
