import {
  HERO_TITLE_LINES,
  heroTitleTrailSpace,
  type HeroTitleWord,
} from '@/lib/hero-title-copy';

const TITLE_TYPE =
  'text-4xl sm:text-5xl lg:text-[52px] font-medium tracking-tight leading-tight text-white text-left';

function FxMaskWord({ word, trailSpace }: { word: HeroTitleWord; trailSpace: boolean }) {
  return (
    <span className="hero-title-fx__word-wrap">
      <span className="hero-title-fx__word-clip">
        <span className="hero-title-fx__word-inner">
          {word.accent ? (
            <span className="text-brand-gold font-semibold">{word.text}</span>
          ) : (
            word.text
          )}
          {trailSpace ? heroTitleTrailSpace() : null}
        </span>
      </span>
    </span>
  );
}

function FxMaskLine({ words, lineIndex }: { words: HeroTitleWord[]; lineIndex: number }) {
  return (
    <span className="hero-title-fx__line" data-fx-line={lineIndex}>
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

/** Layer 2 — masked word reveal (aria-hidden); LCP text stays underneath. */
export function HeroTitleFxOverlay() {
  return (
    <div className={`hero-title-fx ${TITLE_TYPE}`} aria-hidden="true">
      <div className="hero-title-fx__lines">
        {HERO_TITLE_LINES.map((line, lineIndex) => (
          <FxMaskLine key={`fx-line-${lineIndex}`} words={line} lineIndex={lineIndex} />
        ))}
      </div>
    </div>
  );
}
