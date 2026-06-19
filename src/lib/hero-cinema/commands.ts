/** Command-driven hero cinema scenes (mask overlay only — never LCP text). */

export type MaskRevealWordCmd = {
  cmd: 'MASK_REVEAL_WORD';
  /** Delay between each word mask */
  stagger?: number;
  /** Per-word reveal duration */
  wordDuration?: number;
  /** Pause before the next line */
  lineGap?: number;
  ease?: string;
};

export type HeroCinemaCommand = MaskRevealWordCmd;

export const HERO_INTRO_SCENE: HeroCinemaCommand[] = [
  {
    cmd: 'MASK_REVEAL_WORD',
    stagger: 0.07,
    wordDuration: 0.78,
    lineGap: 0.12,
    ease: 'power4.out',
  },
];
