/** Command-driven hero cinema scenes (mask overlay only — never LCP text). */

export type MaskRevealWordCmd = {
  cmd: 'MASK_REVEAL_WORD';
  /** Timeline delay before this scene starts */
  startDelay?: number;
  /** Delay between each word mask */
  stagger?: number;
  /** Per-word reveal duration */
  wordDuration?: number;
  /** Pause before the next line */
  lineGap?: number;
  ease?: string;
};

export const HERO_TITLE_INTRO_SCENE: MaskRevealWordCmd[] = [
  {
    cmd: 'MASK_REVEAL_WORD',
    stagger: 0.04,
    wordDuration: 0.48,
    lineGap: 0.06,
    ease: 'power4.out',
  },
];

export const HERO_DESC_INTRO_SCENE: MaskRevealWordCmd[] = [
  {
    cmd: 'MASK_REVEAL_WORD',
    startDelay: 0.55,
    stagger: 0.03,
    wordDuration: 0.42,
    lineGap: 0.05,
    ease: 'power4.out',
  },
];
