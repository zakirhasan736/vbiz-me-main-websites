'use client';

import { useSyncExternalStore } from 'react';

function subscribeMedia(query: string, callback: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getDesktopMatch() {
  return window.matchMedia('(min-width: 768px)').matches;
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export type PartnerMarqueeLayout = 'static' | 'desktop' | 'mobile';

/** Mount one marquee variant at a time — avoids duplicate logo nodes hidden via CSS. */
export function usePartnerMarqueeLayout(): PartnerMarqueeLayout {
  const reducedMotion = useSyncExternalStore(
    (cb) => subscribeMedia('(prefers-reduced-motion: reduce)', cb),
    getReducedMotion,
    () => false,
  );

  const isDesktop = useSyncExternalStore(
    (cb) => subscribeMedia('(min-width: 768px)', cb),
    getDesktopMatch,
    () => false,
  );

  if (reducedMotion) return 'static';
  return isDesktop ? 'desktop' : 'mobile';
}

export function useIsPartnerMarqueeDesktop(): boolean {
  return useSyncExternalStore(
    (cb) => subscribeMedia('(min-width: 768px)', cb),
    getDesktopMatch,
    () => false,
  );
}
