'use client';

import { useSyncExternalStore } from 'react';

function subscribeMedia(query: string, callback: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

/** True below the lg breakpoint (1024px) — mobile/tablet bottom-sheet modals. */
export function useMobileViewport(maxWidthPx = 1023): boolean {
  const query = `(max-width: ${maxWidthPx}px)`;

  return useSyncExternalStore(
    (cb) => subscribeMedia(query, cb),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
