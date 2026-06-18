const HERO_TITLE = 'The Virtual Business Card That Sells Before You Even Speak';
const HIGHLIGHTED = new Set(['sells']);

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
            className="inline-block overflow-hidden align-bottom mr-[0.22em] py-[0.05em] -my-[0.05em]"
            aria-hidden={false}
          >
            <span
              className={`hero-title-word inline-block will-change-transform ${
                isHighlighted ? 'text-brand-gold font-semibold' : ''
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
