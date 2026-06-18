import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CINEMATIC = {
  DURATION: 0.95,
  STAGGER: 0.11,
  ROW_STAGGER: 0.1,
  LIST_STAGGER: 0.085,
  DISTANCE: 36,
  EDGE_X: 72,
  BLUR: 12,
  SCALE_FROM: 0.96,
  EASE: 'power3.out',
  BURST_EASE: 'back.out(1.25)',
} as const;

type SlideDirection = 'up' | 'left' | 'right';

function getSlideFrom(direction: SlideDirection): gsap.TweenVars {
  const base: gsap.TweenVars = {
    opacity: 0,
    y: CINEMATIC.DISTANCE,
    filter: `blur(${CINEMATIC.BLUR}px)`,
    scale: CINEMATIC.SCALE_FROM,
  };

  if (direction === 'left') {
    base.x = -CINEMATIC.EDGE_X;
    base.y = 28;
  } else if (direction === 'right') {
    base.x = CINEMATIC.EDGE_X;
    base.y = 28;
  }

  return base;
}

export function animateCinematicStagger(
  root: HTMLElement,
  selector = '[data-cinematic-item]',
  options?: { stagger?: number; start?: string; direction?: SlideDirection },
) {
  const items = root.querySelectorAll(selector);
  if (!items.length) return;

  const direction = options?.direction ?? 'up';
  const from = getSlideFrom(direction);

  gsap.set(items, from);

  return gsap.to(items, {
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    duration: CINEMATIC.DURATION,
    stagger: options?.stagger ?? CINEMATIC.LIST_STAGGER,
    ease: CINEMATIC.EASE,
    scrollTrigger: {
      trigger: root,
      start: options?.start ?? GSAP_DEFAULT_START,
      once: true,
    },
    onComplete: () => {
      gsap.set(items, { clearProps: 'transform,filter' });
    },
  });
}

/** One-by-one list reveal — left column from left, right column from right */
export function animateCinematicSlideList(
  root: HTMLElement,
  selector: string,
  direction: SlideDirection,
  options?: { stagger?: number; start?: string },
) {
  return animateCinematicStagger(root, selector, {
    direction,
    stagger: options?.stagger ?? CINEMATIC.LIST_STAGGER,
    start: options?.start,
  });
}

export function animateCinematicBurst(
  element: HTMLElement,
  direction: SlideDirection = 'up',
  delay = 0,
) {
  const from = getSlideFrom(direction);
  if (direction === 'up') {
    from.y = 56;
    from.x = 0;
  }

  gsap.set(element, from);

  return gsap.fromTo(
    element,
    from,
    {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      duration: 1.05,
      delay,
      ease: CINEMATIC.BURST_EASE,
      scrollTrigger: {
        trigger: element,
        start: GSAP_DEFAULT_START,
        once: true,
      },
      onComplete: () => {
        gsap.set(element, { clearProps: 'transform,filter' });
      },
    },
  );
}
