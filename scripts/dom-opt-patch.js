const fs = require("fs");

fs.writeFileSync("src/components/hero/HeroHeading.tsx", `import { HERO_TITLE_LINE_2 } from '@/lib/hero-title-copy';

/** SSR hero title — 2 lines; desktop breaks line 1 before “Card That Sells”. */
export function HeroHeading() {
  return (
    <h1 className="hero-title-lcp">
      <span className="hero-title-lcp__line">
        <span className="hero-title-lcp__lead">The Virtual Business</span>{' '}
        <span className="hero-title-lcp__tail">
          Card That <span className="hero-title-lcp__accent">Sells</span>
        </span>
      </span>
      <span className="hero-title-lcp__line">{HERO_TITLE_LINE_2}</span>
    </h1>
  );
}
`);

fs.writeFileSync("src/components/hero/HeroBannerDescription.tsx", `import { HERO_DESC_ARIA, HERO_DESC_LINE_TEXT } from '@/lib/hero-desc-copy';

/** SSR hero description — typography in critical CSS to prevent font-size CLS. */
export function HeroBannerDescription() {
  return (
    <p className="hero-desc-lcp" aria-label={HERO_DESC_ARIA}>
      {HERO_DESC_LINE_TEXT.map((line) => (
        <span key={line} className="hero-desc-lcp__line">
          {line}
        </span>
      ))}
    </p>
  );
}
`);

console.log("hero ok");
