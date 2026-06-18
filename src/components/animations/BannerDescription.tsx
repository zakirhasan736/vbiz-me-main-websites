'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  buildDescriptionRevealTimeline,
  prefersReducedMotion,
  splitBannerLines,
} from '@/lib/description-reveal-animation';
import { usePageTransition } from '@/components/providers/page-transition-context';

type BannerDescriptionProps = {
  text: string;
  lines?: string[];
  className?: string;
  centered?: boolean;
};

export function BannerDescription({
  text,
  lines,
  className = '',
  centered = true,
}: BannerDescriptionProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const { revealReady, animationKey } = usePageTransition();
  const resolvedLines = lines ?? splitBannerLines(text);

  useGSAP(
    () => {
      if (!revealReady || !rootRef.current) return;
      const tl = buildDescriptionRevealTimeline(rootRef.current, prefersReducedMotion());
      tl.eventCallback('onComplete', () => {
        rootRef.current?.classList.remove('banner-description-pending');
      });
    },
    { scope: rootRef, dependencies: [revealReady, animationKey] },
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
          className="hero-desc-line-wrap block overflow-hidden py-[0.06em] -my-[0.06em]"
        >
          <span className="hero-desc-line inline-block will-change-transform">
            {line.split('').map((char, charIdx) => (
              <span key={charIdx} className="hero-desc-char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </p>
  );
}
