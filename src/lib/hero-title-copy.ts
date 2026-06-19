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

export const HERO_TITLE_LINE_1_WORDS = HERO_TITLE_LINES[0];
export const HERO_TITLE_LINE_2_WORDS = HERO_TITLE_LINES[1];
export const HERO_TITLE_LINE_3_WORDS = HERO_TITLE_LINES[2];

export const HERO_TITLE_LINE_1 = 'The Virtual Business Card';
export const HERO_TITLE_LINE_2 = 'That Sells';
export const HERO_TITLE_LINE_3 = 'Before You Even Speak';

export const HERO_TITLE_ARIA =
  'The Virtual Business Card That Sells Before You Even Speak';

/** Trailing space between words on the same line. */
export function heroTitleTrailSpace(): string {
  return '\u00a0';
}
