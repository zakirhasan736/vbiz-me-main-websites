import { HERO_DESC_ARIA, HERO_DESC_LINE_TEXT } from '@/lib/hero-desc-copy';

/** SSR hero description — typography in critical CSS to prevent font-size CLS. */
export function HeroBannerDescription() {
  return (
    <p className="hero-desc-lcp" aria-label={HERO_DESC_ARIA}>
      {HERO_DESC_LINE_TEXT.map((line) => (
        <span key={line} className="hero-desc-lcp__line">
          <span className="hero-desc-lcp__line-inner">{line}</span>
        </span>
      ))}
    </p>
  );
}
