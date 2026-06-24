'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { lockDocumentScroll, scrollToTop, unlockDocumentScroll } from '@/lib/scroll-utils';
import { usePageTransition } from '@/components/providers/page-transition-context';
import { LINE_EASE, PAGE_TRANSITION_EASE } from '@/lib/motion-animation-utils';

const CENTER_LINE_HEIGHT = 2;
const PANEL_MS = 0.38;
const LINE_MS = 0.32;

type OverlayPhase = 'idle' | 'cover' | 'covered' | 'reveal-line' | 'reveal-panels';

function isInternalRoute(href: string | null, pathname: string): href is string {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }
  if (href.startsWith('http://') || href.startsWith('https://')) {
    try {
      const url = new URL(href);
      return url.origin === window.location.origin && url.pathname !== pathname;
    } catch {
      return false;
    }
  }
  const path = href.split(/[?#]/)[0] || '/';
  return path !== pathname;
}

function waitForPageReady() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (document.readyState === 'complete') {
          resolve();
          return;
        }
        const onLoad = () => {
          window.removeEventListener('load', onLoad);
          resolve();
        };
        window.addEventListener('load', onLoad, { once: true });
        setTimeout(resolve, 50);
      });
    });
  });
}

function panelsOpenScale(phase: OverlayPhase): number {
  if (phase === 'cover' || phase === 'covered' || phase === 'reveal-line') return 1;
  return 0;
}

export function PageTransitionOverlay({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { notifyCoverStart, notifyRevealComplete } = usePageTransition();
  const [phase, setPhase] = useState<OverlayPhase>('idle');
  const isTransitioning = useRef(false);
  const isInitialPathname = useRef(true);
  const navigatedViaOverlay = useRef(false);
  const coverResolveRef = useRef<(() => void) | null>(null);
  const revealResolveRef = useRef<(() => void) | null>(null);

  const finishCover = useCallback(() => {
    coverResolveRef.current?.();
    coverResolveRef.current = null;
    setPhase('covered');
  }, []);

  const finishReveal = useCallback(() => {
    unlockDocumentScroll();
    notifyRevealComplete();
    isTransitioning.current = false;
    revealResolveRef.current?.();
    revealResolveRef.current = null;
    setPhase('idle');
  }, [notifyRevealComplete]);

  const playCover = useCallback(() => {
    return new Promise<void>((resolve) => {
      coverResolveRef.current = resolve;
      notifyCoverStart();
      lockDocumentScroll();
      setPhase('cover');
    });
  }, [notifyCoverStart]);

  const playReveal = useCallback(() => {
    return new Promise<void>((resolve) => {
      revealResolveRef.current = resolve;
      setPhase('reveal-line');
    });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isTransitioning.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const anchor = (e.target as Element | null)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const currentPath = pathname ?? '/';
      if (!isInternalRoute(href, currentPath)) return;

      e.preventDefault();
      e.stopPropagation();

      isTransitioning.current = true;
      navigatedViaOverlay.current = true;

      void (async () => {
        await playCover();
        scrollToTop();
        router.push(href!);
      })();
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, playCover, router]);

  useEffect(() => {
    if (isInitialPathname.current) {
      isInitialPathname.current = false;
      return;
    }

    if (!navigatedViaOverlay.current) return;
    navigatedViaOverlay.current = false;

    let cancelled = false;

    const finishRouteChange = async () => {
      if (cancelled) return;
      await waitForPageReady();
      if (cancelled) return;
      await playReveal();
    };

    void finishRouteChange();

    return () => {
      cancelled = true;
    };
  }, [pathname, playReveal]);

  useEffect(() => {
    return () => {
      unlockDocumentScroll();
    };
  }, []);

  const overlayVisible = phase !== 'idle';
  const panelScale = panelsOpenScale(phase);
  const lineScale = phase === 'reveal-line' ? 1 : 0;

  return (
    <>
      {children}
      <div
        className="page-transition-overlay fixed inset-0 z-[10000] overflow-hidden pointer-events-none"
        style={{ pointerEvents: overlayVisible ? 'auto' : 'none' }}
        aria-hidden={!overlayVisible}
      >
        <motion.div
          className="page-transition-panel page-transition-panel--top"
          style={{ transformOrigin: 'top center' }}
          initial={false}
          animate={{ scaleY: panelScale }}
          transition={{ duration: PANEL_MS, ease: PAGE_TRANSITION_EASE }}
          onAnimationComplete={() => {
            if (phase === 'cover') finishCover();
            if (phase === 'reveal-panels') finishReveal();
          }}
        />
        <motion.div
          className="page-transition-panel page-transition-panel--bottom"
          style={{ transformOrigin: 'bottom center' }}
          initial={false}
          animate={{ scaleY: panelScale }}
          transition={{ duration: PANEL_MS, ease: PAGE_TRANSITION_EASE }}
        />
        <motion.div
          className="page-transition-line"
          style={{
            top: `calc(50% - ${CENTER_LINE_HEIGHT / 2}px)`,
            height: CENTER_LINE_HEIGHT,
            transformOrigin: 'center center',
          }}
          initial={false}
          animate={{ scaleX: lineScale }}
          transition={{ duration: LINE_MS, ease: LINE_EASE }}
          onAnimationComplete={() => {
            if (phase === 'reveal-line') setPhase('reveal-panels');
          }}
        />
      </div>
    </>
  );
}
