'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useLenis } from '@/components/providers/lenis-context';
import { usePageTransition } from '@/components/providers/page-transition-context';

const LINE_DURATION = 0.32;
const PANEL_COVER_DURATION = 0.38;
const REVEAL_DURATION = 0.38;
const EASE = 'power3.inOut';
const LINE_EASE = 'power2.inOut';
const CENTER_LINE_HEIGHT = 2;

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

export function PageTransitionOverlay({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const { notifyCoverStart, notifyRevealComplete } = usePageTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const centerLineRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const isInitialPathname = useRef(true);
  const navigatedViaOverlay = useRef(false);
  const activeTimeline = useRef<gsap.core.Timeline | null>(null);

  const setOverlayInteractive = useCallback((active: boolean) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.pointerEvents = active ? 'auto' : 'none';
    overlay.style.visibility = active ? 'visible' : 'hidden';
  }, []);

  const resetOverlay = useCallback(() => {
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    const centerLine = centerLineRef.current;
    if (!topPanel || !bottomPanel || !centerLine) return;

    gsap.set(topPanel, { scaleY: 0, transformOrigin: 'top center' });
    gsap.set(bottomPanel, { scaleY: 0, transformOrigin: 'bottom center' });
    gsap.set(centerLine, { scaleX: 0, transformOrigin: 'center center' });
  }, []);

  const playCover = useCallback(() => {
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    const centerLine = centerLineRef.current;
    if (!topPanel || !bottomPanel || !centerLine) return Promise.resolve();

    activeTimeline.current?.kill();
    notifyCoverStart();
    setOverlayInteractive(true);
    resetOverlay();

    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          activeTimeline.current = null;
          resolve();
        },
      });

      tl.to(
        topPanel,
        {
          scaleY: 1,
          duration: PANEL_COVER_DURATION,
          ease: EASE,
          transformOrigin: 'top center',
        },
        0,
      );
      tl.to(
        bottomPanel,
        {
          scaleY: 1,
          duration: PANEL_COVER_DURATION,
          ease: EASE,
          transformOrigin: 'bottom center',
        },
        '<',
      );

      activeTimeline.current = tl;
    });
  }, [notifyCoverStart, resetOverlay, setOverlayInteractive]);

  const playReveal = useCallback(() => {
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    const centerLine = centerLineRef.current;
    if (!topPanel || !bottomPanel || !centerLine) {
      isTransitioning.current = false;
      return Promise.resolve();
    }

    activeTimeline.current?.kill();

    gsap.set(topPanel, { scaleY: 1, transformOrigin: 'top center' });
    gsap.set(bottomPanel, { scaleY: 1, transformOrigin: 'bottom center' });
    gsap.set(centerLine, { scaleX: 0, transformOrigin: 'center center' });

    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          resetOverlay();
          setOverlayInteractive(false);
          isTransitioning.current = false;
          activeTimeline.current = null;
          notifyRevealComplete();
          resolve();
        },
      });

      tl.to(centerLine, {
        scaleX: 1,
        duration: LINE_DURATION,
        ease: LINE_EASE,
      });

      tl.to(
        topPanel,
        {
          scaleY: 0,
          duration: REVEAL_DURATION,
          ease: EASE,
          transformOrigin: 'top center',
        },
        '>',
      );
      tl.to(
        bottomPanel,
        {
          scaleY: 0,
          duration: REVEAL_DURATION,
          ease: EASE,
          transformOrigin: 'bottom center',
        },
        '<',
      );

      activeTimeline.current = tl;
    });
  }, [notifyRevealComplete, resetOverlay, setOverlayInteractive]);

  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [lenis]);

  const runTransitionTo = useCallback(
    async (href: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      navigatedViaOverlay.current = true;

      await playCover();
      scrollToTop();
      router.push(href);
    },
    [playCover, router, scrollToTop],
  );

  useEffect(() => {
    resetOverlay();
  }, [resetOverlay]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!isInternalRoute(href, pathname ?? '/')) return;

      event.preventDefault();
      void runTransitionTo(href);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, runTransitionTo]);

  useEffect(() => {
    if (isInitialPathname.current) {
      isInitialPathname.current = false;
      resetOverlay();
      setOverlayInteractive(false);
      return;
    }

    if (!navigatedViaOverlay.current) {
      return;
    }

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
  }, [pathname, playReveal, resetOverlay, setOverlayInteractive]);

  useEffect(() => {
    return () => {
      activeTimeline.current?.kill();
    };
  }, []);

  return (
    <>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
        style={{ visibility: 'hidden' }}
        aria-hidden="true"
      >
        <div
          ref={topPanelRef}
          className="absolute left-0 w-full h-1/2 scale-y-0 will-change-transform bg-[#12141d] z-[1]"
          style={{ top: 0 }}
        />
        <div
          ref={bottomPanelRef}
          className="absolute left-0 w-full h-1/2 scale-y-0 will-change-transform bg-[#0e1018] z-[1]"
          style={{ top: '50%' }}
        />
        <div
          ref={centerLineRef}
          className="absolute left-0 w-full scale-x-0 will-change-transform bg-brand-gold shadow-[0_0_12px_rgba(238,202,83,0.5)] z-[2] pointer-events-none"
          style={{
            top: `calc(50% - ${CENTER_LINE_HEIGHT / 2}px)`,
            height: CENTER_LINE_HEIGHT,
            transformOrigin: 'center center',
          }}
        />
      </div>
    </>
  );
}
