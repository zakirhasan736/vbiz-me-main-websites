import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_GSAP } from '@/lib/hero-gsap-animation';
import { HERO_INTRO_SCENE } from '@/lib/hero-cinema/commands';

gsap.registerPlugin(ScrollTrigger);

/** Word mask reveal — duplicate text rises into clip; LCP layer underneath. */
export function runHeroIntroScene(root: HTMLElement, reduced: boolean) {
  const fx = root.querySelector('.hero-title-fx') as HTMLElement | null;
  const tl = gsap.timeline({ defaults: { ease: HERO_GSAP.ease } });

  if (!fx) return tl;

  if (reduced) {
    fx.classList.add('hero-title-fx--skipped');
    gsap.set(fx, { opacity: 0, pointerEvents: 'none', visibility: 'hidden' });
    return tl;
  }

  const lines = Array.from(root.querySelectorAll<HTMLElement>('.hero-title-fx__line'));
  const maskCmd = HERO_INTRO_SCENE.find((c) => c.cmd === 'MASK_REVEAL_WORD');

  const stagger = maskCmd?.stagger ?? 0.07;
  const wordDuration = maskCmd?.wordDuration ?? 0.78;
  const lineGap = maskCmd?.lineGap ?? 0.12;
  const ease = maskCmd?.ease ?? 'power4.out';

  fx.classList.add('hero-title-fx--playing');
  gsap.set(fx, { opacity: 1, visibility: 'visible' });

  let lineIndex = 0;
  lines.forEach((line) => {
    const inners = Array.from(line.querySelectorAll<HTMLElement>('.hero-title-fx__word-inner'));
    if (!inners.length) return;

    const lineStart = lineIndex === 0 ? 0 : `+=${lineGap}`;

    gsap.set(inners, {
      yPercent: 115,
      opacity: 0.2,
      filter: 'blur(12px)',
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

  tl.to(fx, { opacity: 0, duration: 0.28, ease: 'power2.out' });

  tl.call(() => {
    fx.classList.remove('hero-title-fx--playing');
    fx.classList.add('hero-title-fx--done');
    gsap.set(fx, { visibility: 'hidden', pointerEvents: 'none' });
  });

  return tl;
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
