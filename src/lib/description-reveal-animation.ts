import gsap from 'gsap';
import { HERO_GSAP } from '@/lib/hero-gsap-animation';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function q(root: HTMLElement, selector: string) {
  return root.querySelectorAll(selector);
}

/** Homepage-style description: line blur fade-up */
export function buildDescriptionRevealTimeline(root: HTMLElement, reduced: boolean) {
  const tl = gsap.timeline({
    defaults: { ease: HERO_GSAP.ease },
    onComplete: () => {
      gsap.set(q(root, '.hero-desc-line-wrap'), {
        opacity: 1,
        y: 0,
        filter: 'none',
        clearProps: 'transform,filter',
      });
    },
  });

  if (reduced) {
    gsap.set(q(root, '.hero-desc-line-wrap'), { opacity: 1, clearProps: 'all' });
    return tl;
  }

  tl.fromTo(
    q(root, '.hero-desc-line-wrap'),
    { opacity: 0, y: 36, filter: 'blur(12px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.72,
      stagger: HERO_GSAP.lineStagger,
    },
  );

  return tl;
}

/** Split long banner copy into ~3 readable lines */
export function splitBannerLines(text: string, maxLines = 3): string[] {
  const normalized = text.trim();
  if (!normalized) return [];

  const byDash = normalized.split(/\s+[—–-]\s+/);
  if (byDash.length > 1 && byDash.length <= maxLines) {
    return byDash.map((s) => s.trim()).filter(Boolean);
  }

  const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length >= 2 && sentences.length <= maxLines) {
    return sentences;
  }

  const words = normalized.split(/\s+/);
  const targetLen = Math.ceil(normalized.length / maxLines);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (lines.length < maxLines - 1 && next.length >= targetLen) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}
