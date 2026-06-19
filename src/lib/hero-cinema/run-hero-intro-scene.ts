import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_TITLE_INTRO_SCENE } from '@/lib/hero-cinema/commands';
import { runMaskRevealScene } from '@/lib/hero-cinema/run-mask-reveal-scene';

gsap.registerPlugin(ScrollTrigger);

export function runHeroIntroScene(root: HTMLElement, reduced: boolean) {
  const scene = HERO_TITLE_INTRO_SCENE.find((c) => c.cmd === 'MASK_REVEAL_WORD');
  if (!scene) return gsap.timeline();

  return runMaskRevealScene(root, {
    fxSelector: '.hero-title-fx',
    lineSelector: '.hero-title-fx__line',
    innerSelector: '.hero-title-fx__word-inner',
    playingClass: 'hero-title-fx--playing',
    doneClass: 'hero-title-fx--done',
    skippedClass: 'hero-title-fx--skipped',
    scene,
    reduced,
  });
}

/** Scroll parallax — disabled while mask intro plays. */
export function bindHeroTitleScrollFx(root: HTMLElement, reduced: boolean) {
  const fx = root.querySelector('.hero-title-fx') as HTMLElement | null;
  if (!fx || reduced) return () => {};

  const trigger = ScrollTrigger.create({
    trigger: root.closest('.section-hero') ?? root,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.45,
    onUpdate: (self) => {
      if (
        fx.classList.contains('hero-title-fx--done') ||
        fx.classList.contains('hero-title-fx--skipped') ||
        fx.classList.contains('hero-title-fx--playing')
      ) {
        return;
      }
      gsap.set(fx, { y: self.progress * -12 });
    },
  });

  return () => trigger.kill();
}
