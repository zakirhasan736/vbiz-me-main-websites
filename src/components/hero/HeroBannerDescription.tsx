export const HERO_BANNER_DESCRIPTION_LINES = [
  'Discover the vBiz Me virtual business card (vCard)—',
  'an innovative leap in digital networking',
  'designed to make a powerful emotional impact.',
] as const;

export function HeroBannerDescription() {
  return (
    <p className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed mb-8 max-w-2xl text-left">
      {HERO_BANNER_DESCRIPTION_LINES.map((line, lineIdx) => (
        <span key={lineIdx} className="hero-desc-line-wrap block overflow-hidden py-[0.06em] -my-[0.06em]">
          <span className="hero-desc-line inline-block will-change-transform">
            {line.split('').map((char, charIdx) => (
              <span key={charIdx} className="hero-desc-char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </p>
  );
}
