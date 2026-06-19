import gsap from 'gsap';
import { HERO_GSAP } from '@/lib/hero-gsap-animation';
import type { MaskRevealWordCmd } from '@/lib/hero-cinema/commands';

export type MaskRevealSceneConfig = {
  fxSelector: string;
  lineSelector: string;
  innerSelector: string;
  playingClass: string;
  doneClass: string;
  skippedClass: string;
  scene: MaskRevealWordCmd;
  reduced: boolean;
  fadeOut?: boolean;
};

function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

function resolveMaskTiming(scene: MaskRevealWordCmd) {
  const mobile = isMobileViewport();
  const mobileScale = mobile ? 0.78 : 1;

  return {
    startDelay: scene.startDelay ?? 0,
    stagger: (scene.stagger ?? 0.07) * mobileScale,
    wordDuration: (scene.wordDuration ?? 0.78) * mobileScale,
    lineGap: (scene.lineGap ?? 0.12) * mobileScale,
    ease: scene.ease ?? 'power4.out',
    blurStart: mobile ? 'blur(6px)' : 'blur(12px)',
  };
}

/** Word mask reveal — duplicate text rises into clip; LCP text stays underneath. */
export function runMaskRevealScene(root: HTMLElement, config: MaskRevealSceneConfig) {
  const fx = root.querySelector(config.fxSelector) as HTMLElement | null;
  const tl = gsap.timeline({
    defaults: { ease: HERO_GSAP.ease },
    delay: config.scene.startDelay ?? 0,
  });

  if (!fx) return tl;

  if (config.reduced) {
    fx.classList.add(config.skippedClass);
    gsap.set(fx, { opacity: 0, pointerEvents: 'none', visibility: 'hidden' });
    return tl;
  }

  const lines = Array.from(root.querySelectorAll<HTMLElement>(config.lineSelector));
  const { stagger, wordDuration, lineGap, ease, blurStart } = resolveMaskTiming(config.scene);

  fx.classList.add(config.playingClass);
  gsap.set(fx, { opacity: 1, visibility: 'visible' });

  let lineIndex = 0;
  lines.forEach((line) => {
    const inners = Array.from(line.querySelectorAll<HTMLElement>(config.innerSelector));
    if (!inners.length) return;

    const lineStart = lineIndex === 0 ? 0 : `+=${lineGap}`;

    gsap.set(inners, {
      yPercent: 115,
      opacity: 0.2,
      filter: blurStart,
      force3D: true,
    });

    tl.to(
      inners,
      {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: wordDuration,
        stagger,
        ease,
      },
      lineStart,
    );

    lineIndex += 1;
  });

  if (config.fadeOut !== false) {
    tl.to(fx, { opacity: 0, duration: 0.16, ease: 'power2.out' });
  }

  tl.call(() => {
    fx.classList.remove(config.playingClass);
    fx.classList.add(config.doneClass);
    gsap.set(fx, { visibility: 'hidden', pointerEvents: 'none' });
  });

  return tl;
}
