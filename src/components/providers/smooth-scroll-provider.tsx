'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import { isMacOSSafariDesktop } from '@/lib/scroll-config';

/** Clear any inline overflow locks left by HMR or interrupted transitions. */
function ensureDocumentScrollUnlocked() {
  document.documentElement.style.removeProperty('overflow');
  document.documentElement.style.removeProperty('overflow-y');
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('overflow-y');
}

/** Keeps document scroll native — no smooth-scroll JS or anchor interception. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isInitialPathname = useRef(true);

  useEffect(() => {
    ensureDocumentScrollUnlocked();

    if (!isMacOSSafariDesktop()) return;

    const onPageShow = () => ensureDocumentScrollUnlocked();
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  useEffect(() => {
    ensureDocumentScrollUnlocked();

    if (isInitialPathname.current) {
      isInitialPathname.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return children;
}
