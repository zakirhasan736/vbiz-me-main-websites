'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  animateCinematicSlideList,
  animateCinematicStagger,
} from '@/lib/cinematic-animation';
import { usePageTransition } from '@/components/providers/page-transition-context';

export function useFooterCinematicAnimations() {
  const { revealReady, animationKey } = usePageTransition();
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!revealReady || !footerRef.current) return;

      const root = footerRef.current;

      const cta = root.querySelector('[data-footer-cta]');
      if (cta) {
        animateCinematicStagger(cta as HTMLElement, '[data-footer-cta-item]', {
          stagger: 0.11,
          start: 'top 88%',
        });
      }

      const brand = root.querySelector('[data-footer-brand]');
      if (brand) {
        animateCinematicStagger(brand as HTMLElement, '[data-footer-brand-item]', {
          stagger: 0.1,
          start: 'top 88%',
        });
      }

      const platform = root.querySelector('[data-footer-platform]');
      if (platform) {
        animateCinematicSlideList(
          platform as HTMLElement,
          '[data-footer-nav-item]',
          'left',
          { stagger: 0.07, start: 'top 88%' },
        );
      }

      const contact = root.querySelector('[data-footer-contact]');
      if (contact) {
        animateCinematicSlideList(
          contact as HTMLElement,
          '[data-footer-contact-item]',
          'right',
          { stagger: 0.09, start: 'top 88%' },
        );
      }

      const bottom = root.querySelector('[data-footer-bottom]');
      if (bottom) {
        animateCinematicStagger(bottom as HTMLElement, '[data-footer-bottom-item]', {
          stagger: 0.12,
          start: 'top 95%',
        });
      }
    },
    { scope: footerRef, dependencies: [revealReady, animationKey] },
  );

  return footerRef;
}
