type HeroMaskWord = {
  text: string;
  accent?: boolean;
};

type HeroMaskFxOverlayProps = {
  lines: HeroMaskWord[][];
  typeClass: string;
  variant: 'title' | 'desc';
};

function MaskWord({
  word,
  trailSpace,
  variant,
}: {
  word: HeroMaskWord;
  trailSpace: boolean;
  variant: 'title' | 'desc';
}) {
  const prefix = variant === 'title' ? 'hero-title-fx' : 'hero-desc-fx';

  return (
    <span className={`${prefix}__word-wrap`}>
      <span className={`${prefix}__word-clip`}>
        <span className={`${prefix}__word-inner`}>
          {word.accent ? (
            <span className="text-brand-gold font-semibold">{word.text}</span>
          ) : (
            word.text
          )}
          {trailSpace ? '\u00a0' : null}
        </span>
      </span>
    </span>
  );
}

function MaskLine({
  words,
  lineIndex,
  variant,
}: {
  words: HeroMaskWord[];
  lineIndex: number;
  variant: 'title' | 'desc';
}) {
  const prefix = variant === 'title' ? 'hero-title-fx' : 'hero-desc-fx';

  return (
    <span className={`${prefix}__line`} data-fx-line={lineIndex}>
      {words.map((word, index) => (
        <MaskWord
          key={`${word.text}-${index}`}
          word={word}
          trailSpace={index < words.length - 1}
          variant={variant}
        />
      ))}
    </span>
  );
}

/** Layer 2 — masked word reveal (aria-hidden); LCP text stays underneath. */
export function HeroMaskFxOverlay({ lines, typeClass, variant }: HeroMaskFxOverlayProps) {
  const prefix = variant === 'title' ? 'hero-title-fx' : 'hero-desc-fx';

  return (
    <div className={`${prefix} ${typeClass}`} aria-hidden="true">
      <div className={`${prefix}__lines`}>
        {lines.map((line, lineIndex) => (
          <MaskLine key={`fx-line-${lineIndex}`} words={line} lineIndex={lineIndex} variant={variant} />
        ))}
      </div>
    </div>
  );
}
