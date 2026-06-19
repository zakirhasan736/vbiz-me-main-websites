/** Shared hero H1 copy — SSR title lines. */

export type HeroTitleWord = {
  text: string;
  accent?: boolean;
};

/** Hero title — line 1 splits on desktop before “Card That Sells”. */
export const HERO_TITLE_LINES: HeroTitleWord[][] = [
  [
    { text: 'The' },
    { text: 'Virtual' },
    { text: 'Business' },
    { text: 'Card' },
    { text: 'That' },
    { text: 'Sells', accent: true },
  ],
  [{ text: 'Before' }, { text: 'You' }, { text: 'Even' }, { text: 'Speak' }],
];

export const HERO_TITLE_LINE_2 = 'Before You Even Speak' as const;
