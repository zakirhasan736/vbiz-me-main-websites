'use client';

import { splitBannerLines } from '@/lib/banner-text';

type BannerDescriptionProps = {
  text: string;
  lines?: string[];
  className?: string;
  centered?: boolean;
  scrollOnEnter?: boolean;
};

export function BannerDescription({
  text,
  lines,
  className = '',
  centered = true,
}: BannerDescriptionProps) {
  const resolvedLines = lines ?? splitBannerLines(text);

  return (
    <p
      data-banner-description
      className={`${className} ${centered ? 'text-center mx-auto' : 'text-left'}`}
    >
      {resolvedLines.map((line, lineIdx) => (
        <span key={lineIdx} className="hero-desc-line-wrap block py-[0.06em] -my-[0.06em]">
          {line}
        </span>
      ))}
    </p>
  );
}
