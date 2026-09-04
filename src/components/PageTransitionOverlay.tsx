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
/** Failsafe if framer-motion never fires onAnimationComplete (Safari / reduced motion). */
const COVER_FAILSAFE_MS = PANEL_MS * 1000 + 180;
const LINE_FAILSAFE_MS = LINE_MS * 1000 + 180;
const REVEAL_FAILSAFE_MS = PANEL_MS * 1000 + 180;
const STUCK_TRANSITION_MS = 2500;

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

/** Header / footer chrome — never trap these behind the page-transition click lock. */
function isSiteChromeAnchor(anchor: Element): boolean {
  return Boolean(anchor.closest('[data-site-navbar], footer, [data-site-footer]'));
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
  const phaseRef = useRef<OverlayPhase>('idle');
  const isTransitioning = useRef(false);
  const isInitialPathname = useRef(true);
  /** Kept true until reveal actually starts — survives React Strict Mode effect remounts. */
  const navigatedViaOverlay = useRef(false);
  const coverResolveRef = useRef<(() => void) | null>(null);
  const revealResolveRef = useRef<(() => void) | null>(null);
  const coverFinishedRef = useRef(false);
  const revealFinishedRef = useRef(false);

  const setOverlayPhase = useCallback((next: OverlayPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const forceResetTransition = useCallback(() => {
    coverResolveRef.current = null;
    revealResolveRef.current = null;
    coverFinishedRef.current = false;
    revealFinishedRef.current = false;
    navigatedViaOverlay.current = false;
    isTransitioning.current = false;
    unlockDocumentScroll();
    setOverlayPhase('idle');
    notifyRevealComplete();
  }, [notifyRevealComplete, setOverlayPhase]);

  const finishCover = useCallback(() => {
    if (coverFinishedRef.current) return;
    coverFinishedRef.current = true;
    coverResolveRef.current?.();
    coverResolveRef.current = null;
    setOverlayPhase('covered');
  }, [setOverlayPhase]);

  const finishReveal = useCallback(() => {
    if (revealFinishedRef.current) return;
    revealFinishedRef.current = true;
    unlockDocumentScroll();
    notifyRevealComplete();
    isTransitioning.current = false;
    navigatedViaOverlay.current = false;
    revealResolveRef.current?.();
    revealResolveRef.current = null;
    setOverlayPhase('idle');
  }, [notifyRevealComplete, setOverlayPhase]);

  const playCover = useCallback(() => {
    return new Promise<void>((resolve) => {
      coverFinishedRef.current = false;
      coverResolveRef.current = resolve;
      notifyCoverStart();
      lockDocumentScroll();
      setOverlayPhase('cover');
    });
  }, [notifyCoverStart, setOverlayPhase]);

  const playReveal = useCallback(() => {
    return new Promise<void>((resolve) => {
      revealFinishedRef.current = false;
      revealResolveRef.current = resolve;
      setOverlayPhase('reveal-line');
    });
  }, [setOverlayPhase]);

  // Failsafe: animation complete callbacks can miss on some browsers / reduced motion.
  useEffect(() => {
    if (phase === 'cover') {
      const t = window.setTimeout(finishCover, COVER_FAILSAFE_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === 'reveal-line') {
      const t = window.setTimeout(() => setOverlayPhase('reveal-panels'), LINE_FAILSAFE_MS);
      return () => window.clearTimeout(t);
    }
    if (phase === 'reveal-panels') {
      const t = window.setTimeout(finishReveal, REVEAL_FAILSAFE_MS);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [phase, finishCover, finishReveal, setOverlayPhase]);

  // Absolute failsafe: never leave nav permanently blocked after a route change.
  useEffect(() => {
    if (phase === 'idle' && !isTransitioning.current) return;
    const t = window.setTimeout(() => {
      if (isTransitioning.current || phaseRef.current !== 'idle') {
        forceResetTransition();
      }
    }, STUCK_TRANSITION_MS);
    return () => window.clearTimeout(t);
  }, [pathname, phase, forceResetTransition]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest('a');
      if (!anchor) return;

      // Community (and other heavy pages) can leave the transition lock stuck after arrival.
      // Hover still works, but capture-phase preventDefault makes nav clicks do nothing.
      // Always let header/footer Links navigate natively.
      if (isSiteChromeAnchor(anchor)) {
        if (isTransitioning.current || phaseRef.current !== 'idle') {
          forceResetTransition();
        }
        return;
      }

      if (isTransitioning.current) {
        // Recover instead of permanently swallowing in-page links.
        forceResetTransition();
      }

      const href = anchor.getAttribute('href');
      const currentPath = pathname ?? '/';
      if (!isInternalRoute(href, currentPath)) return;

      e.preventDefault();
      e.stopPropagation();

      isTransitioning.current = true;
      navigatedViaOverlay.current = true;
      coverFinishedRef.current = false;
      revealFinishedRef.current = false;

      void (async () => {
        try {
          await playCover();
          scrollToTop();
          router.push(href!);
        } catch {
          forceResetTransition();
        }
      })();
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, playCover, router, forceResetTransition]);

  useEffect(() => {
    if (isInitialPathname.current) {
      isInitialPathname.current = false;
      return;
    }

    // Native header Link navigation (no overlay) — clear any leftover lock from Community.
    if (!navigatedViaOverlay.current) {
      if (isTransitioning.current || phaseRef.current !== 'idle') {
        forceResetTransition();
      }
      return;
    }

    let cancelled = false;

    const finishRouteChange = async () => {
      await waitForPageReady();
      if (cancelled) return;
      // Clear only once reveal is about to run (second Strict Mode pass still sees the flag).
      navigatedViaOverlay.current = false;
      await playReveal();
    };

    void finishRouteChange();

    return () => {
      cancelled = true;
    };
  }, [pathname, playReveal, forceResetTransition]);

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
            if (phaseRef.current === 'cover') finishCover();
            if (phaseRef.current === 'reveal-panels') finishReveal();
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
            if (phaseRef.current === 'reveal-line') setOverlayPhase('reveal-panels');
          }}
        />
      </div>
    </>
  );
}
