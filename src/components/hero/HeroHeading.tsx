const HERO_TITLE = 'The Virtual Business Card That Sells Before You Even Speak';
const HIGHLIGHTED = new Set(['sells']);

/** Server-rendered hero H1 — paints immediately for LCP (no client JS / motion delay). */
export function HeroHeading() {
  const words = HERO_TITLE.split(' ');

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-medium tracking-tight mb-6 leading-tight text-white text-left">
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '');
        const isHighlighted = HIGHLIGHTED.has(cleanWord.toLowerCase());

        return (
          <span
            key={idx}
            className={`inline-block mr-[0.22em] ${isHighlighted ? 'text-brand-gold font-semibold' : ''}`}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
}
