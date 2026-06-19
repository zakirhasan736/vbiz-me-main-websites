import gsap from 'gsap';

export const HERO_GSAP = {
  ease: 'power3.out',
  titleStagger: 0.048,
  lineStagger: 0.14,
  letterStagger: 0.014,
  ctaStagger: 0.11,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function prefersFastMobileLcp(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

function q(root: HTMLElement, selector: string) {
  return root.querySelectorAll(selector);
}

function revealAll(root: HTMLElement) {
  gsap.set(
    q(
      root,
      '.hero-eyebrow, .hero-title-word, .hero-desc-line-wrap, .hero-desc-char, .hero-cta-item, .hero-trust-item',
    ),
    { opacity: 1, y: 0, yPercent: 0, x: 0, filter: 'none', clearProps: 'transform,filter' },
  );
}

/** Left column — explicit fromTo so title words always end visible */
export function buildHeroLeftTimeline(root: HTMLElement, reduced: boolean) {
  const tl = gsap.timeline({
    defaults: { ease: HERO_GSAP.ease },
    onComplete: () => revealAll(root),
  });

  if (reduced) {
    revealAll(root);
    return tl;
  }

  if (prefersFastMobileLcp()) {
    gsap.set(q(root, '.hero-eyebrow'), { opacity: 1, y: 0, filter: 'none', clearProps: 'transform,filter' });
  } else {
    tl.fromTo(
      q(root, '.hero-eyebrow'),
      { opacity: 0, y: 22, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65 },
    );
  }

  tl.fromTo(
    q(root, '.hero-title-word'),
    { yPercent: 115, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.82,
      stagger: HERO_GSAP.titleStagger,
      ease: 'power4.out',
    },
    '-=0.28',
  );

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
    '-=0.42',
  );

  tl.fromTo(
    q(root, '.hero-desc-char'),
    { opacity: 0 },
    { opacity: 1, duration: 0.035, stagger: HERO_GSAP.letterStagger },
    '-=0.55',
  );

  tl.fromTo(
    q(root, '.hero-cta-item'),
    { opacity: 0, y: 40, filter: 'blur(12px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.78,
      stagger: HERO_GSAP.ctaStagger,
    },
    '-=0.35',
  );

  tl.fromTo(
    q(root, '.hero-trust-item'),
    { opacity: 0, y: 18, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.55,
      stagger: 0.07,
    },
    '-=0.4',
  );

  return tl;
}

/** Distance to push video panel past the right viewport edge (measured from layout position) */
function getHeroVideoOffscreenX(panel: HTMLElement): number {
  const rect = panel.getBoundingClientRect();
  return Math.max(window.innerWidth - rect.left + 64, 160);
}

/** Right column — slide in from off-screen right + fade using composited properties only. */
export function buildHeroVideoTimeline(root: HTMLElement, reduced: boolean) {
  const panel = root.querySelector('.hero-video-enter') as HTMLElement | null;
  const tl = gsap.timeline({ defaults: { ease: HERO_GSAP.ease } });

  if (!panel) return tl;

  if (reduced) {
    gsap.set(panel, { opacity: 1, x: 0, clearProps: 'transform' });
    panel.classList.remove('hero-video-await');
    return tl;
  }

  gsap.set(panel, { x: 0 });
  const startX = getHeroVideoOffscreenX(panel);

  tl.fromTo(
    panel,
    { x: startX, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.28,
      ease: 'power3.out',
    },
    0.1,
  );

  tl.eventCallback('onComplete', () => {
    panel.classList.remove('hero-video-await');
    gsap.set(panel, { clearProps: 'transform' });
  });

  return tl;
}

export function lockHeroSectionVisible(section: HTMLElement | null) {
  if (!section) return;
  section.classList.remove('hero-banner-pending');
}

export function resetHeroSectionPending(section: HTMLElement | null) {
  if (!section) return;
  section.classList.add('hero-banner-pending');
}
