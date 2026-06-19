import gsap from 'gsap';
import { HERO_DESC_INTRO_SCENE } from '@/lib/hero-cinema/commands';
import { runMaskRevealScene } from '@/lib/hero-cinema/run-mask-reveal-scene';

export function runHeroDescIntroScene(root: HTMLElement, reduced: boolean) {
  const scene = HERO_DESC_INTRO_SCENE.find((c) => c.cmd === 'MASK_REVEAL_WORD');
  if (!scene) return gsap.timeline();

  return runMaskRevealScene(root, {
    fxSelector: '.hero-desc-fx',
    lineSelector: '.hero-desc-fx__line',
    innerSelector: '.hero-desc-fx__word-inner',
    playingClass: 'hero-desc-fx--playing',
    doneClass: 'hero-desc-fx--done',
    skippedClass: 'hero-desc-fx--skipped',
    scene,
    reduced,
  });
}
