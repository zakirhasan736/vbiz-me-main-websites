import type { ReactNode } from 'react';
import { HERO_TITLE_LINE_TEXT } from '@/lib/hero-title-copy';

function TitleLine({ children }: { children: ReactNode }) {
  return (
    <span className="hero-title-lcp__line">
      <span className="hero-title-lcp__line-inner">{children}</span>
    </span>
  );
}

/** SSR hero title — typography in critical CSS to prevent font-size CLS. */
export function HeroHeading() {
  return (
    <h1 className="hero-title-lcp">
      <TitleLine>
        The Virtual Business Card That <span className="hero-title-lcp__accent">Sells</span>
      </TitleLine>
      <TitleLine>{HERO_TITLE_LINE_TEXT[1]}</TitleLine>
    </h1>
  );
}
