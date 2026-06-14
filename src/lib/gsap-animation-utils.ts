import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Scroll trigger — fires when section enters lower viewport */
export const GSAP_DEFAULT_START = 'top 78%';

/** Shared timing tokens — tune here to affect the whole site */
export const GSAP_CONSTANTS = {
  DURATION: 0.88,
  EASE: 'power3.out',
  STAGGER: 0.075,
  ROW_STAGGER: 0.11,
  DISTANCE: 96,
  BLUR: 10,
};

/** Framer Motion helpers used by RevealText / RevealParagraph */
export const MOTION_CONSTANTS = {
  TITLE_STAGGER: 0.028,
  TITLE_WORD_DURATION: 0.58,
  PARAGRAPH_STAGGER: 0.012,
  PARAGRAPH_WORD_DURATION: 0.52,
  PARAGRAPH_DELAY: 0.12,
  SECTION_TITLE_DURATION: 0.72,
  SECTION_DESC_DURATION: 0.68,
  SECTION_CARD_DURATION: 0.78,
  SECTION_CARD_STAGGER: 0.09,
};

export interface AnimateRevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  trigger?: Element | string | null;
  start?: string;
  distance?: number;
  ease?: string;
  blur?: number;
}

export const animateGSAPReveal = (
  element: HTMLDivElement | null,
  options: AnimateRevealOptions = {}
) => {
  if (!element) return;

  const {
    direction = 'up',
    delay = 0,
    duration = GSAP_CONSTANTS.DURATION,
    trigger = null,
    start = GSAP_DEFAULT_START,
    distance = GSAP_CONSTANTS.DISTANCE,
    ease = GSAP_CONSTANTS.EASE,
    blur = GSAP_CONSTANTS.BLUR,
  } = options;

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    filter: `blur(${blur}px)`,
  };

  if (direction === 'up') fromVars.y = distance;
  else if (direction === 'down') fromVars.y = -distance;
  else if (direction === 'left') fromVars.x = distance;
  else if (direction === 'right') fromVars.x = -distance;

  gsap.set(element, { opacity: 0, filter: `blur(${blur}px)` });

  const resolvedTrigger =
    typeof trigger === 'string'
      ? document.querySelector(trigger)
      : trigger || element;

  return gsap.fromTo(
    element,
    fromVars,
    {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: resolvedTrigger || element,
        start,
        once: true,
      },
    }
  );
};

export const animateSectionStagger = (
  section: Element | null,
  selector = '[data-reveal-item]'
) => {
  if (!section) return;

  const items = section.querySelectorAll(selector);
  if (!items.length) return;

  gsap.set(items, {
    opacity: 0,
    y: 48,
    filter: `blur(${GSAP_CONSTANTS.BLUR}px)`,
  });

  return gsap.to(items, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: GSAP_CONSTANTS.DURATION,
    stagger: GSAP_CONSTANTS.STAGGER,
    ease: GSAP_CONSTANTS.EASE,
    scrollTrigger: {
      trigger: section,
      start: GSAP_DEFAULT_START,
      once: true,
    },
  });
};
