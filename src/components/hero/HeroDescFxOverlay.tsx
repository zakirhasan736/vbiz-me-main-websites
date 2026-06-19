import {
  HERO_DESC_LINES,
  heroDescTrailSpace,
  type HeroDescWord,
} from '@/lib/hero-desc-copy';

const DESC_TYPE =
  'text-base sm:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed text-left';

function FxMaskWord({ word, trailSpace }: { word: HeroDescWord; trailSpace: boolean }) {
  return (
    <span className="hero-desc-fx__word-wrap">
      <span className="hero-desc-fx__word-clip">
        <span className="hero-desc-fx__word-inner">
          {word.text}
          {trailSpace ? heroDescTrailSpace() : null}
        </span>
      </span>
    </span>
  );
}

function FxMaskLine({ words, lineIndex }: { words: HeroDescWord[]; lineIndex: number }) {
  return (
    <span className="hero-desc-fx__line" data-fx-line={lineIndex}>
      {words.map((word, index) => (
        <FxMaskWord
          key={`${word.text}-${index}`}
          word={word}
          trailSpace={index < words.length - 1}
        />
      ))}
    </span>
  );
}

/** Layer 2 — masked word reveal (aria-hidden); LCP description stays underneath. */
export function HeroDescFxOverlay() {
  return (
    <div className={`hero-desc-fx ${DESC_TYPE}`} aria-hidden="true">
      <div className="hero-desc-fx__lines">
        {HERO_DESC_LINES.map((line, lineIndex) => (
          <FxMaskLine key={`fx-desc-line-${lineIndex}`} words={line} lineIndex={lineIndex} />
        ))}
      </div>
    </div>
  );
}
