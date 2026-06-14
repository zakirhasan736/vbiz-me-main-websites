'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_DEFAULT_START, MOTION_CONSTANTS } from '@/lib/gsap-animation-utils';

gsap.registerPlugin(ScrollTrigger);

export const useGsapReveal = (routeKey?: string) => {
  useEffect(() => {
    if (!routeKey) return;

    const elements = document.querySelectorAll('.gsap-reveal');
    const scrollTriggersToClean: ScrollTrigger[] = [];
    const sectionTimelines: gsap.core.Timeline[] = [];

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.classList.remove('revealed');

      const rect = htmlEl.getBoundingClientRect();
      const isInViewportInit = rect.top >= 0 && rect.top < window.innerHeight * 0.88;

      if (isInViewportInit) {
        htmlEl.classList.add('revealed');
      } else {
        const trigger = ScrollTrigger.create({
          trigger: htmlEl,
          start: GSAP_DEFAULT_START,
          once: true,
          onEnter: () => {
            htmlEl.classList.add('revealed');
          },
        });
        scrollTriggersToClean.push(trigger);
      }
    });

    document.querySelectorAll('[data-section-reveal]').forEach((section) => {
      const htmlSection = section as HTMLElement;
      const title = htmlSection.querySelector('[data-reveal-title]');
      const description = htmlSection.querySelector('[data-reveal-description]');
      const cards = htmlSection.querySelectorAll('[data-reveal-card]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: htmlSection,
          start: GSAP_DEFAULT_START,
          once: true,
        },
      });

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 44, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: MOTION_CONSTANTS.SECTION_TITLE_DURATION,
            ease: 'power3.out',
          },
        );
      }

      if (description) {
        tl.fromTo(
          description,
          { opacity: 0, y: 32, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: MOTION_CONSTANTS.SECTION_DESC_DURATION,
            ease: 'power3.out',
          },
          '-=0.35',
        );
      }

      if (cards.length) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 52, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: MOTION_CONSTANTS.SECTION_CARD_DURATION,
            stagger: MOTION_CONSTANTS.SECTION_CARD_STAGGER,
            ease: 'power3.out',
          },
          '-=0.25',
        );
      }

      sectionTimelines.push(tl);
    });

    ScrollTrigger.refresh();

    return () => {
      scrollTriggersToClean.forEach((trigger) => trigger.kill());
      sectionTimelines.forEach((tl) => tl.scrollTrigger?.kill());
      sectionTimelines.forEach((tl) => tl.kill());
    };
  }, [routeKey]);
};
