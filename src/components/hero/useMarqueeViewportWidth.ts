'use client';

import { type RefObject, useEffect } from 'react';

/** Sync --marquee-viewport-width to the marquee root so slot sizing matches the lane. */
export function useMarqueeViewportWidth(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sync = () => {
      const width = root.clientWidth;
      if (width > 0) {
        root.style.setProperty('--marquee-viewport-width', `${width}px`);
        root.style.setProperty('--slider-viewport-width', `${width}px`);
      }
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef]);
}
