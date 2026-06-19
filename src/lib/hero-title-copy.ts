/** Shared hero H1 copy — used by LCP text layer and FX overlay layer. */

export type HeroTitleWord = {
  text: string;
  accent?: boolean;
};

/** Three meaningful hero lines. */
export const HERO_TITLE_LINES: HeroTitleWord[][] = [
  [{ text: 'The' }, { text: 'Virtual' }, { text: 'Business' }, { text: 'Card' }],
  [{ text: 'That' }, { text: 'Sells', accent: true }],
  [{ text: 'Before' }, { text: 'You' }, { text: 'Even' }, { text: 'Speak' }],
];
