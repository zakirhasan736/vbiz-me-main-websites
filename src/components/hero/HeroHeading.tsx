const HERO_TITLE = 'The Virtual Business Card That Sells Before You Even Speak';

export function HeroHeading() {
  return (
    <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-medium tracking-tight mb-6 leading-tight text-white text-left">
      <span className="hero-title-block inline-block will-change-transform">
        The Virtual Business Card That{' '}
        <span className="text-brand-gold font-semibold">Sells</span>
        {' '}Before You Even Speak
      </span>
    </h1>
  );
}
