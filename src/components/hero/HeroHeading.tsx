import { HERO_TITLE_LINES, type HeroTitleWord } from '@/lib/hero-title-copy';

const TITLE_TYPE =
  'text-[1.65rem] leading-[1.12] sm:text-5xl lg:text-[52px] font-medium tracking-tight sm:leading-tight text-white text-left';

function LcpWord({ word, trailSpace }: { word: HeroTitleWord; trailSpace: boolean }) {
  return (
    <span className="hero-title-lcp__word">
      {word.accent ? (
        <span className="text-brand-gold font-semibold">{word.text}</span>
      ) : (
        word.text
      )}
      {trailSpace ? '\u00a0' : null}
    </span>
  );
}

function LcpLine({ words }: { words: HeroTitleWord[] }) {
  return (
    <span className="hero-title-lcp__line">
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`} className="hero-title-lcp__word-wrap">
          <LcpWord word={word} trailSpace={index < words.length - 1} />
        </span>
      ))}
    </span>
  );
}

/** SSR LCP title — always visible; mask animation is a client sibling overlay. */
export function HeroHeading() {
  return (
    <h1 className={`hero-title-lcp ${TITLE_TYPE}`}>
      {HERO_TITLE_LINES.map((line, lineIndex) => (
        <LcpLine key={`lcp-line-${lineIndex}`} words={line} />
      ))}
    </h1>
  );
}
