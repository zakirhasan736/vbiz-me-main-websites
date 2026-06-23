'use client';

import { useEffect } from 'react';
import { isWebKitBrowser } from '@/lib/scroll-config';

/** Adds `safari-light-motion` on `<html>` for targeted WebKit CSS trims. */
export function SafariPerfBoot() {
  useEffect(() => {
    if (isWebKitBrowser()) {
      document.documentElement.classList.add('safari-light-motion');
    }
  }, []);

  return null;
}
