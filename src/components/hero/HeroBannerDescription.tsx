import { HeroDescStage } from '@/components/hero/HeroDescStage';
import {
  HERO_DESC_ARIA,
  HERO_DESC_LINES,
  heroDescTrailSpace,
  type HeroDescWord,
} from '@/lib/hero-desc-copy';

const DESC_TYPE =
  'text-base sm:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed text-left';

function LcpWord({ word, trailSpace }: { word: HeroDescWord; trailSpace: boolean }) {
  return (
    <span className="hero-desc-lcp__word">
      {word.text}
      {trailSpace ? heroDescTrailSpace() : null}
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

/**
 * Layer 1 — SSR LCP description (never animated, always visible under mask clips).
 * Layers 2–3 — mask overlay + cinema controller in HeroDescStage.
 */
export function HeroBannerDescription() {
  return (
    <HeroDescStage>
      <p className={`hero-desc-lcp hero-desc-block ${DESC_TYPE}`} aria-label={HERO_DESC_ARIA}>
        {HERO_DESC_LINES.map((line, lineIndex) => (
          <LcpLine key={`lcp-desc-line-${lineIndex}`} words={line} />
        ))}
      </p>
    </HeroDescStage>
  );
}
