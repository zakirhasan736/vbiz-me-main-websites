import { HERO_DESC_ARIA, HERO_DESC_LINES, type HeroDescWord } from '@/lib/hero-desc-copy';

const DESC_TYPE =
  'text-base sm:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed text-left';

function LcpWord({ word, trailSpace }: { word: HeroDescWord; trailSpace: boolean }) {
  return (
    <span className="hero-desc-lcp__word">
      {word.text}
      {trailSpace ? '\u00a0' : null}
    </span>
  );
}

function LcpLine({ words }: { words: HeroDescWord[] }) {
  return (
    <span className="hero-desc-lcp__line">
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`} className="hero-desc-lcp__word-wrap">
          <LcpWord word={word} trailSpace={index < words.length - 1} />
        </span>
      ))}
    </span>
  );
}

/** SSR LCP description — always visible; mask animation is a client sibling overlay. */
export function HeroBannerDescription() {
  return (
    <p className={`hero-desc-lcp ${DESC_TYPE}`} aria-label={HERO_DESC_ARIA}>
      {HERO_DESC_LINES.map((line, lineIndex) => (
        <LcpLine key={`lcp-desc-line-${lineIndex}`} words={line} />
      ))}
    </p>
  );
}
