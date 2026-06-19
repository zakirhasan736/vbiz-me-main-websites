/** Shared hero description copy — SSR description lines. */

export type HeroDescWord = {
  text: string;
};

export const HERO_DESC_LINES: HeroDescWord[][] = [
  [
    { text: 'Discover' },
    { text: 'the' },
    { text: 'vBiz' },
    { text: 'Me' },
    { text: 'virtual' },
    { text: 'business' },
    { text: 'card' },
    { text: '(vCard)—' },
  ],
  [
    { text: 'an' },
    { text: 'innovative' },
    { text: 'leap' },
    { text: 'in' },
    { text: 'digital' },
    { text: 'networking' },
  ],
  [
    { text: 'designed' },
    { text: 'to' },
    { text: 'make' },
    { text: 'a' },
    { text: 'powerful' },
    { text: 'emotional' },
    { text: 'impact.' },
  ],
];

export const HERO_DESC_ARIA =
  'Discover the vBiz Me virtual business card (vCard)— an innovative leap in digital networking designed to make a powerful emotional impact.';
