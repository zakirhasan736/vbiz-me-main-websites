import { useEffect, useState } from 'react';
import { isWebKitBrowser } from '@/lib/scroll-config';

/** Shared Framer Motion timing tokens */
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
} as const;

export const REVEAL_CONSTANTS = {
  DURATION: 1.05,
  STAGGER: 0.075,
  ROW_STAGGER: 0.11,
  DISTANCE: 72,
  EDGE_X: 140,
  BLUR: 14,
  SCALE_FROM: 0.94,
} as const;

/** Lighter reveal motion for WebKit — opacity + transform only, no filter/scale. */
export const LIGHT_REVEAL = {
  DURATION: 0.72,
  DISTANCE: 40,
  EDGE_X: 80,
  TITLE_Y: 20,
  PARAGRAPH_Y: 16,
} as const;

export const CINEMATIC = {
  DURATION: 0.95,
  STAGGER: 0.11,
  ROW_STAGGER: 0.1,
  LIST_STAGGER: 0.085,
  DISTANCE: 36,
  EDGE_X: 72,
  SCALE_FROM: 0.96,
  BURST_DURATION: 1.05,
} as const;

export const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
export const ELASTIC_EASE = [0.22, 1, 0.36, 1] as const;
export const PAGE_TRANSITION_EASE = [0.65, 0, 0.35, 1] as const;
export const LINE_EASE = [0.45, 0, 0.55, 1] as const;

/** Standard slide distances — use XL/LG/MD across all reveal animations. */
export const SLIDE_DISTANCE = {
  XL: 600,
  LG: 500,
  MD: 400,
} as const;

/** Banner / hero blocks — tight 10–50ms gaps between eyebrow, title, media. */
export const BANNER_REVEAL_STAGGER = {
  ITEM: 0.04,
  DELAY_CHILDREN: 0.02,
} as const;

/** Our vCard page — 5-card feature matrix (L / M / R top, then L / R bottom). */
export const OUR_VCARD_FEATURE_STAGGER = {
  ITEM: 0.05,
  HEADER_DELAY: 0,
  ROW1_DELAY: 0.15,
  ROW2_DELAY: 0.45,
} as const;

/** Our vCard pillar trio — near-simultaneous from top (10–15ms gaps). */
export const OUR_VCARD_PILLAR_STAGGER = {
  ITEM: 0.012,
  DELAY_CHILDREN: 0.01,
} as const;

/** Portfolio QR grid — groups of 4 with directional slides at 400px (MD). */
export const PORTFOLIO_REVEAL_STAGGER = {
  ITEM: 0.065,
  GROUP_GAP: 0.1,
  GROUP_SIZE: 4,
} as const;

export function getPortfolioCardDirection(index: number): SlideDirection {
  const directions: SlideDirection[] = ['left', 'right', 'up', 'down'];
  return directions[index % PORTFOLIO_REVEAL_STAGGER.GROUP_SIZE];
}

export function getPortfolioCardDelay(index: number): number {
  const { ITEM, GROUP_GAP, GROUP_SIZE } = PORTFOLIO_REVEAL_STAGGER;
  const group = Math.floor(index / GROUP_SIZE);
  const pos = index % GROUP_SIZE;
  return group * (GROUP_SIZE * ITEM + GROUP_GAP) + pos * ITEM;
}

/** Footer blocks — use standard MD/LG slide tiers (see SLIDE_DISTANCE). */
export const FOOTER_REVEAL_STAGGER = {
  CTA: 0.08,
  MAIN: 0.065,
  LIST_ITEM: 0.055,
  BOTTOM: 0.07,
  DELAY_CHILDREN: 0.04,
} as const;

/** Card grid stagger — noticeable gaps between cards (seconds). */
export const GRID_REVEAL_STAGGER = {
  TWO_COL: 0.072,
  THREE_COL: 0.068,
  FOUR_COL: 0.062,
  FIVE_COL: 0.058,
  LIST: 0.07,
  DELAY_CHILDREN: 0.045,
} as const;

export function getGridStaggerForColumns(columns: 2 | 3 | 4 | 5): number {
  switch (columns) {
    case 2:
      return GRID_REVEAL_STAGGER.TWO_COL;
    case 4:
      return GRID_REVEAL_STAGGER.FOUR_COL;
    case 5:
      return GRID_REVEAL_STAGGER.FIVE_COL;
    default:
      return GRID_REVEAL_STAGGER.THREE_COL;
  }
}

export type SlideDistanceTier = keyof typeof SLIDE_DISTANCE;
export type SlideDirection = 'up' | 'down' | 'left' | 'right';

/** Slide durations — fast but noticeable (MD ~580ms, LG ~680ms, XL ~920ms). */
export const SLIDE_DURATION = {
  MD: 0.58,
  LG: 0.68,
  XL: 0.92,
  SHORT: 0.52,
} as const;

export function resolveSlideDistance(distance: number | SlideDistanceTier): number {
  return typeof distance === 'number' ? distance : SLIDE_DISTANCE[distance];
}

/** Duration scales with tier — 400/500/600px feel smooth and clearly visible. */
export function getSlideDuration(distance: number): number {
  if (distance >= SLIDE_DISTANCE.XL) return SLIDE_DURATION.XL;
  if (distance >= SLIDE_DISTANCE.LG) return SLIDE_DURATION.LG;
  if (distance >= SLIDE_DISTANCE.MD) return SLIDE_DURATION.MD;
  return SLIDE_DURATION.SHORT;
}

export const SLIDE_VISIBLE_STATE = { opacity: 1, x: 0, y: 0, scale: 1 };

export function getSlideHiddenState(
  direction: SlideDirection,
  distance: number,
  scaleOnUp = true,
) {
  switch (direction) {
    case 'left':
      return { opacity: 0, x: -distance, y: 0, scale: 1 };
    case 'right':
      return { opacity: 0, x: distance, y: 0, scale: 1 };
    case 'down':
      return { opacity: 0, x: 0, y: -distance, scale: 1 };
    case 'up':
    default:
      return { opacity: 0, x: 0, y: distance, scale: scaleOnUp ? 0.94 : 1 };
  }
}

export function getTwoColumnDirection(index: number): SlideDirection {
  return index % 2 === 0 ? 'left' : 'right';
}

export function getThreeColumnGridDirection(index: number, columns = 3): SlideDirection {
  const col = index % columns;
  if (col === 0) return 'left';
  if (col === 1) return 'up';
  return 'right';
}

export function getFourCardDirection(index: number): SlideDirection {
  const directions: SlideDirection[] = ['up', 'right', 'left', 'down'];
  return directions[index % directions.length];
}

export function getGridRevealDelay(
  index: number,
  columns = 3,
  rowStagger = 0.1,
  colStagger = 0.08,
) {
  return Math.floor(index / columns) * rowStagger + (index % columns) * colStagger;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** WebKit/Safari: skip blur/filter and heavy scale — major scroll jank source. */
export function isSafariLightMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return isWebKitBrowser() || prefersReducedMotion();
}

export function useSafariLightMotion(): boolean {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(isSafariLightMotion());
  }, []);

  return light;
}

export function getLightRevealOffset(direction: 'up' | 'down' | 'left' | 'right') {
  const { DISTANCE, EDGE_X } = LIGHT_REVEAL;

  switch (direction) {
    case 'down':
      return { y: -DISTANCE };
    case 'left':
      return { x: -EDGE_X };
    case 'right':
      return { x: EDGE_X };
    default:
      return { y: DISTANCE };
  }
}

export function getRevealDuration(light = isSafariLightMotion()): number {
  if (prefersReducedMotion()) return 0;
  return light ? LIGHT_REVEAL.DURATION : REVEAL_CONSTANTS.DURATION;
}

export function getRevealHiddenState(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  light = isSafariLightMotion(),
) {
  const offset = light ? getLightRevealOffset(direction) : getRevealOffset(direction);

  if (light) {
    return { opacity: 0, ...offset };
  }

  return {
    opacity: 0,
    ...offset,
    scale: REVEAL_CONSTANTS.SCALE_FROM,
    filter: `blur(${REVEAL_CONSTANTS.BLUR}px)`,
  };
}

export function getRevealVisibleState(light = isSafariLightMotion()) {
  if (light) {
    return { opacity: 1, x: 0, y: 0 };
  }

  return { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };
}

export function getTextRevealHidden(kind: 'title' | 'paragraph' = 'title', light = isSafariLightMotion()) {
  if (light) {
    return {
      opacity: 0,
      y: kind === 'title' ? LIGHT_REVEAL.TITLE_Y : LIGHT_REVEAL.PARAGRAPH_Y,
    };
  }

  return {
    opacity: 0,
    y: kind === 'title' ? 28 : 22,
    filter: kind === 'title' ? 'blur(8px)' : 'blur(6px)',
  };
}

export function getTextRevealVisible(kind: 'title' | 'paragraph' = 'title', light = isSafariLightMotion()) {
  if (light) {
    return { opacity: 1, y: 0 };
  }

  return { opacity: 1, y: 0, filter: 'blur(0px)' };
}

export function getRevealOffset(direction: 'up' | 'down' | 'left' | 'right') {
  const { DISTANCE, EDGE_X } = REVEAL_CONSTANTS;

  switch (direction) {
    case 'down':
      return { y: -DISTANCE };
    case 'left':
      return { x: -EDGE_X };
    case 'right':
      return { x: EDGE_X };
    default:
      return { y: DISTANCE };
  }
}

export function getCinematicOffset(direction: 'up' | 'left' | 'right') {
  const { DISTANCE, EDGE_X } = CINEMATIC;

  switch (direction) {
    case 'left':
      return { x: -EDGE_X, y: 28 };
    case 'right':
      return { x: EDGE_X, y: 28 };
    default:
      return { y: direction === 'up' ? 56 : DISTANCE };
  }
}
