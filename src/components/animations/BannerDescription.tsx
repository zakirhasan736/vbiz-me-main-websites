'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  buildDescriptionRevealTimeline,
  prefersReducedMotion,
  splitBannerLines,
} from '@/lib/description-reveal-animation';
import { usePageTransition } from '@/components/providers/page-transition-context';
import { GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type BannerDescriptionProps = {
  text: string;
  lines?: string[];
  className?: string;
  centered?: boolean;
  /** Play line + letter reveal when the block scrolls into view (e.g. footer CTA). */
  scrollOnEnter?: boolean;
};

export function BannerDescription({
  text,
  lines,
  className = '',
  centered = true,
  scrollOnEnter = false,
}: BannerDescriptionProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const { revealReady, animationKey } = usePageTransition();
  const resolvedLines = lines ?? splitBannerLines(text);

  useGSAP(
    () => {
      if (!revealReady || !rootRef.current) return;

      const root = rootRef.current;
      const tl = buildDescriptionRevealTimeline(root, prefersReducedMotion());
      tl.eventCallback('onComplete', () => {
        root.classList.remove('banner-description-pending');
      });

      if (scrollOnEnter && !prefersReducedMotion()) {
        tl.pause(0);
        ScrollTrigger.create({
          trigger: root,
          start: GSAP_DEFAULT_START,
          once: true,
          onEnter: () => tl.play(0),
        });
      }
    },
    { scope: rootRef, dependencies: [revealReady, animationKey, scrollOnEnter] },
  );

  return (
    <p
      ref={rootRef}
      data-banner-description
      className={`banner-description-pending ${className} ${centered ? 'text-center mx-auto' : 'text-left'}`}
    >
      {resolvedLines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          className="hero-desc-line-wrap block overflow-hidden py-[0.06em] -my-[0.06em] will-change-transform"
        >
          {line}
        </span>
      ))}
    </p>
  );
}
