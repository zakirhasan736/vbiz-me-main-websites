'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  animateGSAPReveal,
  GSAP_CONSTANTS,
  GSAP_DEFAULT_START,
  MOTION_CONSTANTS,
} from '@/lib/gsap-animation-utils';
import { usePageTransition } from '@/components/providers/page-transition-context';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const ELASTIC_EASE = [0.22, 1, 0.36, 1] as const;

export const RevealText = ({
  text,
  className = '',
  tag: Tag = 'h2',
  highlightedWords = [],
  centered = true,
  priority = false,
}: {
  text: string;
  className?: string;
  tag?: React.ElementType;
  highlightedWords?: string[];
  centered?: boolean;
  /** Above-the-fold titles: visible on first paint for LCP (no stagger/blur delay). */
  priority?: boolean;
}) => {
  const words = text.split(' ');
  const { revealReady } = usePageTransition();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReveal = revealReady && isInView;

  if (priority) {
    return (
      <Tag
        data-reveal-title
        ref={ref}
        className={`${className} ${centered ? 'text-center justify-center mx-auto' : ''}`}
      >
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '');
          const isHighlighted = highlightedWords.some(
            (h) => h.toLowerCase() === cleanWord.toLowerCase(),
          );

          return (
            <span
              key={idx}
              className={`inline-block mr-[0.22em] ${isHighlighted ? 'text-brand-gold font-semibold' : ''}`}
            >
              {word}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag
      data-reveal-title
      ref={ref}
      className={`${className} ${centered ? 'text-center justify-center mx-auto' : ''}`}
    >
      <motion.span
        className={`inline-flex flex-wrap ${centered ? 'justify-center text-center mx-auto' : ''}`}
        initial="hidden"
        animate={shouldReveal ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: MOTION_CONSTANTS.TITLE_STAGGER },
          },
        }}
      >
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '');
          const isHighlighted = highlightedWords.some(
            (h) => h.toLowerCase() === cleanWord.toLowerCase()
          );

          return (
            <span key={idx} className="inline-block overflow-hidden mr-[0.22em] py-0.5">
              <motion.span
                className={`inline-block origin-bottom ${isHighlighted ? 'text-brand-gold font-semibold' : ''}`}
                variants={{
                  hidden: { y: '115%', opacity: 0, filter: 'blur(8px)' },
                  visible: {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    transition: {
                      duration: MOTION_CONSTANTS.TITLE_WORD_DURATION,
                      ease: ELASTIC_EASE,
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
};

export const RevealParagraph = ({
  text,
  className = '',
  delay = MOTION_CONSTANTS.PARAGRAPH_DELAY,
  centered = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  centered?: boolean;
}) => {
  const words = text.split(' ');
  const { revealReady } = usePageTransition();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReveal = revealReady && isInView;

  return (
    <p
      data-reveal-description
      ref={ref}
      className={`${className} ${centered ? 'text-center mx-auto justify-center flex' : ''}`}
    >
      <motion.span
        className={`inline-flex flex-wrap ${centered ? 'justify-center mx-auto text-center' : ''}`}
        initial="hidden"
        animate={shouldReveal ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: MOTION_CONSTANTS.PARAGRAPH_STAGGER,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden mr-[0.22em] py-0.5">
            <motion.span
              className="inline-block origin-bottom text-inherit font-inherit"
              variants={{
                hidden: { y: '110%', opacity: 0, filter: 'blur(6px)' },
                visible: {
                  y: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: MOTION_CONSTANTS.PARAGRAPH_WORD_DURATION,
                    ease: PREMIUM_EASE,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </p>
  );
};

export const ScrollRevealCard = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  id = '',
  trigger = null,
  start = '',
}: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  id?: string;
  trigger?: Element | string | null;
  start?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { revealReady, animationKey } = usePageTransition();

  useGSAP(
    () => {
      if (!revealReady || !cardRef.current) return;

      animateGSAPReveal(cardRef.current, {
        direction,
        delay,
        trigger,
        start: start || GSAP_DEFAULT_START,
        distance: GSAP_CONSTANTS.DISTANCE,
        duration: GSAP_CONSTANTS.DURATION,
        ease: GSAP_CONSTANTS.EASE,
        blur: GSAP_CONSTANTS.BLUR,
      });
    },
    {
      scope: cardRef,
      dependencies: [direction, delay, trigger, start, revealReady, animationKey],
    },
  );

  return (
    <div
      ref={cardRef}
      id={id}
      data-reveal-card
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
};

export const SectionReveal = ({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <div data-section-reveal id={id} className={className}>
    {children}
  </div>
);

export { BannerDescription } from '@/components/animations/BannerDescription';
