'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from '@/components/providers/lenis-context';
import {
  applyCinematicLenisOptions,
  buildLenisOptions,
  LENIS_EASING,
  LENIS_SCROLL_TO_DURATION,
  prefersReducedScrollMotion,
} from '@/lib/lenis-config';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const instance = new Lenis(buildLenisOptions());

    document.documentElement.classList.add('lenis', 'lenis-smooth');
    document.body.classList.add('lenis', 'lenis-smooth');

    instance.on('scroll', ScrollTrigger.update);

    const tickerRaf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerRaf);
    gsap.ticker.lagSmoothing(0);

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
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const refreshLayout = () => {
      instance.resize();
      ScrollTrigger.refresh();
    };

    refreshLayout();
    window.addEventListener('load', refreshLayout);
    window.addEventListener('resize', refreshLayout);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      applyCinematicLenisOptions(instance, prefersReducedScrollMotion());
    };
    motionQuery.addEventListener('change', onMotionChange);

    setLenis(instance);

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('load', refreshLayout);
      window.removeEventListener('resize', refreshLayout);
      gsap.ticker.remove(tickerRaf);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      document.body.classList.remove('lenis', 'lenis-smooth');
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
