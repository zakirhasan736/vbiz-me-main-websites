import type { ReactNode } from 'react';
import { HERO_TITLE_LINE_2 } from '@/lib/hero-title-copy';

function TitleLine({ children }: { children: ReactNode }) {
  return (
    <span className="hero-title-lcp__line">
      <span className="hero-title-lcp__line-inner">{children}</span>
    </span>
  );
}

/** SSR hero title — 2 lines; desktop breaks line 1 before “Card That Sells”. */
export function HeroHeading() {
  return (
    <h1 className="hero-title-lcp">
      <TitleLine>
        <span className="hero-title-lcp__lead">The Virtual Business</span>{' '}
        <span className="hero-title-lcp__tail">
          Card That <span className="hero-title-lcp__accent">Sells</span>
        </span>
      </TitleLine>
      <TitleLine>{HERO_TITLE_LINE_2}</TitleLine>
    </h1>
  );
}
