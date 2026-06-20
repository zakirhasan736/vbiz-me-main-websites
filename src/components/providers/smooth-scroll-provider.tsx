'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from '@/components/providers/lenis-context';
import {
  applyCinematicLenisOptions,
  applyLenisDocumentClasses,
  buildLenisOptions,
  clearLenisDocumentClasses,
  getScrollTriggerPinType,
  isMacOSSafariDesktop,
  LENIS_EASING,
  LENIS_SCROLL_TO_DURATION,
  prefersReducedScrollMotion,
} from '@/lib/lenis-config';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  /** iOS Safari URL bar resize — avoid spurious ScrollTrigger refreshes. */
  ignoreMobileResize: true,
});

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedScrollMotion();
    const instance = new Lenis(buildLenisOptions());

    document.documentElement.classList.add('lenis', 'lenis-smooth');
    document.body.classList.add('lenis', 'lenis-smooth');
    applyLenisDocumentClasses(reduced);

    instance.on('scroll', ScrollTrigger.update);

    const tickerRaf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerRaf);
    gsap.ticker.lagSmoothing(0);

    const pinType = getScrollTriggerPinType();

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType,
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    let resizeRaf = 0;
    const refreshLayout = () => {
      instance.resize();
      ScrollTrigger.refresh();
    };
    const scheduleRefreshLayout = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        refreshLayout();
      });
    };

    refreshLayout();
    window.addEventListener('load', refreshLayout);
    window.addEventListener('resize', scheduleRefreshLayout);
    window.addEventListener('orientationchange', refreshLayout);

    /* iOS Safari — visualViewport resize when address bar shows/hides (not scroll — that fights Lenis). */
    const visualViewport = window.visualViewport;
    const onVisualViewportResize = () => scheduleRefreshLayout();
    visualViewport?.addEventListener('resize', onVisualViewportResize);

    /* macOS Safari — debounced resize when window is snapped / split-view. */
    if (isMacOSSafariDesktop()) {
      window.addEventListener('pageshow', refreshLayout);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      const nowReduced = prefersReducedScrollMotion();
      applyCinematicLenisOptions(instance, nowReduced);
      applyLenisDocumentClasses(nowReduced);
      refreshLayout();
    };
    motionQuery.addEventListener('change', onMotionChange);

    setLenis(instance);

    return () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      motionQuery.removeEventListener('change', onMotionChange);
      visualViewport?.removeEventListener('resize', onVisualViewportResize);
      window.removeEventListener('load', refreshLayout);
      window.removeEventListener('resize', scheduleRefreshLayout);
      window.removeEventListener('orientationchange', refreshLayout);
      if (isMacOSSafariDesktop()) {
        window.removeEventListener('pageshow', refreshLayout);
      }
      gsap.ticker.remove(tickerRaf);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      document.body.classList.remove('lenis', 'lenis-smooth');
      clearLenisDocumentClasses();
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });
    const refreshTimer = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 120);

    return () => window.clearTimeout(refreshTimer);
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href.startsWith('#/')) return;

      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        lenis.scrollTo(element, {
          offset: -80,
          duration: LENIS_SCROLL_TO_DURATION,
          easing: LENIS_EASING,
        });
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  return <LenisProvider lenis={lenis}>{children}</LenisProvider>;
}
