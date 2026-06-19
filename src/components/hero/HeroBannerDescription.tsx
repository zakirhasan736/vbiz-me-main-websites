import { Fragment } from 'react';
import { HERO_DESC_ARIA, HERO_DESC_LINES } from '@/lib/hero-desc-copy';

const DESC_TYPE =
  'text-base sm:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed text-left';

/** SSR hero description — paints on first response; line slide-up is CSS-only. */
export function HeroBannerDescription() {
  return (
    <p className={`hero-desc-lcp ${DESC_TYPE}`} aria-label={HERO_DESC_ARIA}>
      {HERO_DESC_LINES.map((line, lineIndex) => (
        <span key={`desc-line-${lineIndex}`} className="hero-desc-lcp__line">
          {line.map((word, index) => (
            <Fragment key={`${word.text}-${index}`}>
              {word.text}
              {index < line.length - 1 ? '\u00a0' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </p>
  );
}
