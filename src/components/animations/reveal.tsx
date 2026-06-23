'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { renderHighlightedText } from '@/lib/text-highlight';
import {
  MOTION_CONSTANTS,
  PREMIUM_EASE,
  SLIDE_DISTANCE,
  SLIDE_VISIBLE_STATE,
  GRID_REVEAL_STAGGER,
  FOOTER_REVEAL_STAGGER,
  BANNER_REVEAL_STAGGER,
  OUR_VCARD_FEATURE_STAGGER,
  OUR_VCARD_PILLAR_STAGGER,
  PORTFOLIO_REVEAL_STAGGER,
  getFourCardDirection,
  getPortfolioCardDirection,
  getPortfolioCardDelay,
  getGridRevealDelay,
  getGridStaggerForColumns,
  getSlideDuration,
  getSlideHiddenState,
  SLIDE_DURATION,
  getThreeColumnGridDirection,
  getTwoColumnDirection,
  prefersReducedMotion,
  resolveSlideDistance,
  type SlideDirection,
  type SlideDistanceTier,
} from '@/lib/motion-animation-utils';
import { usePageTransition } from '@/components/providers/page-transition-context';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

export type RevealDirection = SlideDirection;

export {
  getFourCardDirection,
  getThreeColumnGridDirection,
  getTwoColumnDirection,
  getGridRevealDelay as getThreeColumnGridDelay,
  getGridStaggerForColumns,
  GRID_REVEAL_STAGGER,
  FOOTER_REVEAL_STAGGER,
  BANNER_REVEAL_STAGGER,
  OUR_VCARD_FEATURE_STAGGER,
  OUR_VCARD_PILLAR_STAGGER,
  PORTFOLIO_REVEAL_STAGGER,
  getPortfolioCardDirection,
  getPortfolioCardDelay,
  SLIDE_DISTANCE,
  SLIDE_DURATION,
};

type SectionRevealContextValue = {
  shouldReveal: boolean;
  /** When true, all children in the section start animating at once (no stagger wait). */
  simultaneous: boolean;
};

const SectionRevealContext = createContext<SectionRevealContextValue | null>(null);

function useSectionRevealContext() {
  return useContext(SectionRevealContext);
}

/** Read shared reveal state inside a SectionRevealRoot (e.g. footer ambient layers). */
export function useSectionShouldReveal(): boolean {
  const section = useSectionRevealContext();
  const { revealReady } = usePageTransition();
  return section?.shouldReveal ?? revealReady;
}

export type SectionRevealViewport = 'header' | 'content' | 'grid' | 'footer' | 'compareBelow';

const SECTION_VIEWPORT = {
  header: { amount: 0.35, margin: '0px 0px -8% 0px' as const },
  content: { amount: 0.18, margin: '0px 0px -10% 0px' as const },
  grid: { amount: 0.12, margin: '0px 0px -6% 0px' as const },
  /** Compare page — content below table/chart; needs deliberate scroll. */
  compareBelow: { amount: 0.28, margin: '0px 0px -4% 0px' as const },
  /** Each footer zone sentinel must be fully inside the viewport (not peeking at bottom). */
  footer: { amount: 1, margin: '0px 0px -20% 0px' as const },
} satisfies Record<SectionRevealViewport, { amount: number; margin: string }>;

function useSectionInView(
  viewport: SectionRevealViewport = 'content',
  replayOnScroll = false,
) {
  const { revealReady } = usePageTransition();
  const ref = useRef<HTMLDivElement>(null);
  const { amount, margin } = SECTION_VIEWPORT[viewport];
  const inView = useInView(ref, {
    once: !replayOnScroll,
    amount,
    margin,
  });

  return {
    ref,
    shouldReveal: revealReady && inView,
  };
}

/** One viewport trigger per section block — children share the same reveal moment. */
export function SectionRevealRoot({
  children,
  className = '',
  id,
  viewport = 'content',
  simultaneous = true,
  replayOnNavigate = false,
  replayOnScroll = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  viewport?: SectionRevealViewport;
  simultaneous?: boolean;
  /** Remount observer on route change so footer / page sections replay once per visit. */
  replayOnNavigate?: boolean;
  /** Re-fire when the section scrolls into view again (footer). */
  replayOnScroll?: boolean;
  /** @deprecated use viewport */
  threshold?: number;
}) {
  const pathname = usePathname();
  const { animationKey } = usePageTransition();
  const replayKey = replayOnNavigate ? `${pathname}-${animationKey}` : 'static';

  return (
    <SectionRevealRootInner
      key={replayKey}
      className={className}
      id={id}
      viewport={viewport}
      simultaneous={simultaneous}
      replayOnScroll={replayOnScroll}
    >
      {children}
    </SectionRevealRootInner>
  );
}

function SectionRevealRootInner({
  children,
  className = '',
  id,
  viewport = 'content',
  simultaneous = true,
  replayOnScroll = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  viewport?: SectionRevealViewport;
  simultaneous?: boolean;
  replayOnScroll?: boolean;
}) {
  const { ref, shouldReveal } = useSectionInView(viewport, replayOnScroll);
  const value = useMemo(
    () => ({ shouldReveal, simultaneous }),
    [shouldReveal, simultaneous],
  );
  const isFooter = viewport === 'footer';

  return (
    <SectionRevealContext.Provider value={value}>
      <div
        ref={isFooter ? undefined : ref}
        id={id}
        data-section-reveal-root
        data-footer-reveal={isFooter ? true : undefined}
        className={`${isFooter ? 'relative w-full' : ''} ${className}`.trim()}
      >
        {isFooter ? (
          <div
            ref={ref}
            data-section-reveal-sentinel
            className="pointer-events-none absolute left-0 right-0 top-4 md:top-6 h-px w-full opacity-0"
            aria-hidden="true"
          />
        ) : null}
        {children}
      </div>
    </SectionRevealContext.Provider>
  );
}

/** Layout wrapper for eyebrow + title + description (animates with parent SectionRevealRoot). */
export function SectionRevealHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-section-reveal-header className={className}>
      {children}
    </div>
  );
}

/** Layout wrapper for cards / grids below the header. */
export function SectionRevealContent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-section-reveal-content className={className}>
      {children}
    </div>
  );
}

function useRevealTrigger() {
  const section = useSectionRevealContext();
  const { revealReady } = usePageTransition();
  const fallbackRef = useRef<HTMLDivElement>(null);
  const ownInView = useInView(fallbackRef, {
    once: true,
    amount: 0.14,
    margin: '0px 0px -6% 0px',
  });

  if (section) {
    return { ref: undefined, shouldReveal: section.shouldReveal };
  }

  return { ref: fallbackRef, shouldReveal: revealReady && ownInView };
}

function resolveRevealDelay(delay: number, section: SectionRevealContextValue | null) {
  if (section?.simultaneous) return 0;
  return delay;
}

function resolveStaggerTiming(
  stagger: number,
  delayChildren: number,
  simultaneous: boolean,
) {
  if (simultaneous) {
    return { stagger: 0, delayChildren: 0 };
  }
  return { stagger, delayChildren };
}

/**
 * Card grid — single observer on the grid root; all items stagger when the grid enters view.
 * Use for Platform Capabilities and other multi-card grids.
 */
export function SectionRevealGrid({
  children,
  className = '',
  id,
  stagger = GRID_REVEAL_STAGGER.THREE_COL,
  delayChildren = GRID_REVEAL_STAGGER.DELAY_CHILDREN,
  simultaneous = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  stagger?: number;
  delayChildren?: number;
  /** When false (default), cards cascade in with staggerChildren — each keeps its own slide direction. */
  simultaneous?: boolean;
}) {
  const section = useSectionRevealContext();
  const fallback = useSectionInView('grid');
  const shouldReveal = section?.shouldReveal ?? fallback.shouldReveal;
  const ref = section ? undefined : fallback.ref;
  const timing = resolveStaggerTiming(stagger, delayChildren, simultaneous);

  if (prefersReducedMotion()) {
    return (
      <div id={id} data-capability-card-grid-root className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      data-capability-card-grid-root
      data-section-reveal-root={section ? undefined : true}
      className={className}
      initial="hidden"
      animate={shouldReveal ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: timing.stagger,
            delayChildren: timing.delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered list — accordion rows, feature lists; uses section root trigger when nested. */
export function SectionRevealStaggerList({
  children,
  className = '',
  id,
  stagger = GRID_REVEAL_STAGGER.LIST,
  delayChildren = GRID_REVEAL_STAGGER.DELAY_CHILDREN,
  viewport = 'content',
  simultaneous = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  stagger?: number;
  delayChildren?: number;
  viewport?: SectionRevealViewport;
  simultaneous?: boolean;
}) {
  const section = useSectionRevealContext();
  const fallback = useSectionInView(viewport);
  const shouldReveal = section?.shouldReveal ?? fallback.shouldReveal;
  const ref = section ? undefined : fallback.ref;
  const timing = resolveStaggerTiming(stagger, delayChildren, simultaneous);

  if (prefersReducedMotion()) {
    return (
      <div id={id} data-section-reveal-stagger className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      data-section-reveal-stagger
      className={className}
      initial="hidden"
      animate={shouldReveal ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: timing.stagger,
            delayChildren: timing.delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Grid cell — animates via parent SectionRevealGrid / SectionRevealStaggerList stagger. */
export function RevealGridItem({
  children,
  direction = 'up',
  distance = 'XL',
  className = '',
  scaleOnUp = true,
  delay = 0,
}: {
  children: ReactNode;
  direction?: SlideDirection;
  distance?: number | SlideDistanceTier;
  className?: string;
  scaleOnUp?: boolean;
  /** Extra delay (seconds) — used for portfolio grouped card timing. */
  delay?: number;
}) {
  const px = resolveSlideDistance(distance);
  const hidden = getSlideHiddenState(direction, px, scaleOnUp && direction === 'up');
  const duration = getSlideDuration(px);

  if (prefersReducedMotion()) {
    return (
      <div data-reveal-card className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-reveal-card
      data-reveal-direction={direction}
      className={className}
      variants={{
        hidden,
        visible: {
          ...SLIDE_VISIBLE_STATE,
          transition: {
            duration,
            ease: PREMIUM_EASE,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type SlideRevealOptions = {
  direction?: SlideDirection;
  distance?: number | SlideDistanceTier;
  delay?: number;
  scaleOnUp?: boolean;
};

function useSlideReveal({
  direction = 'up',
  distance = 'MD',
  delay = 0,
  scaleOnUp = true,
}: SlideRevealOptions) {
  const section = useSectionRevealContext();
  const { ref, shouldReveal } = useRevealTrigger();
  const px = resolveSlideDistance(distance);
  const hidden = getSlideHiddenState(direction, px, scaleOnUp);
  const effectiveDelay = resolveRevealDelay(delay, section);

  return {
    ref,
    shouldReveal,
    hidden,
    transition: {
      duration: getSlideDuration(px),
      delay: effectiveDelay,
      ease: PREMIUM_EASE,
    },
  };
}

export const RevealText = ({
  text,
  className = '',
  tag: Tag = 'h2',
  id,
  highlightedWords = [],
  centered = true,
  priority = false,
  direction = 'up',
  distance = 'LG',
  delay = 0,
}: {
  text: string;
  className?: string;
  tag?: React.ElementType;
  id?: string;
  highlightedWords?: string[];
  centered?: boolean;
  priority?: boolean;
  direction?: SlideDirection;
  distance?: number | SlideDistanceTier;
  delay?: number;
}) => {
  const alignment = centered ? 'text-center justify-center mx-auto' : '';
  const { ref, shouldReveal, hidden, transition } = useSlideReveal({
    direction,
    distance,
    delay,
    scaleOnUp: direction === 'up',
  });

  if (priority || prefersReducedMotion()) {
    return (
      <Tag id={id} data-reveal-title className={`${className} ${alignment}`}>
        <span className={`block ${centered ? 'mx-auto text-center' : ''}`}>
          {renderHighlightedText(text, highlightedWords)}
        </span>
      </Tag>
    );
  }

  return (
    <Tag id={id} data-reveal-title ref={ref} className={`${className} ${alignment}`}>
      <motion.span
        className={`block ${centered ? 'mx-auto text-center' : ''}`}
        initial={hidden}
        animate={shouldReveal ? SLIDE_VISIBLE_STATE : hidden}
        transition={transition}
      >
        {renderHighlightedText(text, highlightedWords)}
      </motion.span>
    </Tag>
  );
};

export const RevealParagraph = ({
  text,
  className = '',
  delay = MOTION_CONSTANTS.PARAGRAPH_DELAY,
  centered = true,
  direction = 'up',
  distance = 'MD',
}: {
  text: string;
  className?: string;
  delay?: number;
  centered?: boolean;
  direction?: SlideDirection;
  distance?: number | SlideDistanceTier;
}) => {
  const { ref, shouldReveal, hidden, transition } = useSlideReveal({
    direction,
    distance,
    delay,
    scaleOnUp: direction === 'up',
  });

  if (prefersReducedMotion()) {
    return (
      <p
        data-reveal-description
        className={`${className} ${centered ? 'text-center mx-auto' : ''}`}
      >
        {text}
      </p>
    );
  }

  return (
    <p
      data-reveal-description
      ref={ref}
      className={`${className} ${centered ? 'text-center mx-auto' : ''}`}
    >
      <motion.span
        className={`block ${centered ? 'text-center mx-auto' : ''}`}
        initial={hidden}
        animate={shouldReveal ? SLIDE_VISIBLE_STATE : hidden}
        transition={transition}
      >
        {text}
      </motion.span>
    </p>
  );
};

export const RevealEyebrow = ({
  label,
  variant = 'section',
  className = '',
  direction = 'up',
  distance = 'MD',
  delay = 0,
}: {
  label: string;
  variant?: 'hero' | 'section';
  className?: string;
  direction?: SlideDirection;
  distance?: number | SlideDistanceTier;
  delay?: number;
}) => {
  const { ref, shouldReveal, hidden, transition } = useSlideReveal({
    direction,
    distance,
    delay,
    scaleOnUp: direction === 'up',
  });

  if (prefersReducedMotion()) {
    return <SectionEyebrow label={label} variant={variant} className={className} />;
  }

  return (
    <div ref={ref} data-reveal-eyebrow className={className}>
      <motion.div
        initial={hidden}
        animate={shouldReveal ? SLIDE_VISIBLE_STATE : hidden}
        transition={transition}
      >
        <SectionEyebrow label={label} variant={variant} />
      </motion.div>
    </div>
  );
};

/** Scroll-triggered slide reveal — uses section root when nested inside SectionRevealRoot. */
export const ScrollRevealCard = ({
  children,
  direction = 'up',
  delay = 0,
  distance = 'XL',
  className = '',
  id = '',
  scaleOnUp = true,
}: {
  children: React.ReactNode;
  direction?: SlideDirection;
  delay?: number;
  distance?: number | SlideDistanceTier;
  className?: string;
  id?: string;
  scaleOnUp?: boolean;
}) => {
  const { ref, shouldReveal, hidden, transition } = useSlideReveal({
    direction,
    distance,
    delay,
    scaleOnUp,
  });

  if (prefersReducedMotion()) {
    return (
      <div id={id || undefined} data-reveal-card className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id || undefined}
      data-reveal-card
      data-reveal-direction={direction}
      className={className}
      initial={hidden}
      animate={shouldReveal ? SLIDE_VISIBLE_STATE : hidden}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export const SectionReveal = ({
  children,
  className = '',
  id,
  direction = 'up',
  distance = 'XL',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  direction?: SlideDirection;
  distance?: number | SlideDistanceTier;
  delay?: number;
}) => (
  <SectionRevealRoot id={id} className={className}>
    <ScrollRevealCard direction={direction} distance={distance} delay={delay} scaleOnUp={direction === 'up'}>
      {children}
    </ScrollRevealCard>
  </SectionRevealRoot>
);

export { BannerDescription } from '@/components/animations/BannerDescription';
