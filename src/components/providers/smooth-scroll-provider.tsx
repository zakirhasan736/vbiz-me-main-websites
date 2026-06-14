'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from '@/components/providers/lenis-context';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1,
      syncTouch: false,
      autoRaf: true,
      autoResize: true,
    });

    document.documentElement.classList.add('lenis', 'lenis-smooth');
    document.body.classList.add('lenis', 'lenis-smooth');

    instance.on('scroll', ScrollTrigger.update);
    ScrollTrigger.refresh();
    setLenis(instance);

    return () => {
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
        lenis.scrollTo(element, { offset: -80, duration: 1.1 });
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  return <LenisProvider lenis={lenis}>{children}</LenisProvider>;
}
