import { Fragment } from 'react';
import { HERO_TITLE_LINES } from '@/lib/hero-title-copy';

const TITLE_TYPE =
  'text-[1.65rem] leading-[1.12] sm:text-5xl lg:text-[52px] font-medium tracking-tight sm:leading-tight text-white text-left';

/** SSR hero title — paints on first response; line slide-up is CSS-only. */
export function HeroHeading() {
  return (
    <h1 className={`hero-title-lcp ${TITLE_TYPE}`}>
      {HERO_TITLE_LINES.map((line, lineIndex) => (
        <span key={`title-line-${lineIndex}`} className="hero-title-lcp__line">
          {line.map((word, index) => (
            <Fragment key={`${word.text}-${index}`}>
              {word.accent ? (
                <span className="text-brand-gold font-semibold">{word.text}</span>
              ) : (
                word.text
              )}
              {index < line.length - 1 ? '\u00a0' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </h1>
  );
}
