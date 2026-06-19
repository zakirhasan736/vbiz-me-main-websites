/** SSR hero H1 — full text in HTML; visually hidden until GSAP animateReady runs. */
export function HeroHeading() {
  return (
    <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-medium will-change-transform tracking-tight mb-6 leading-tight text-white text-left">
      <span className="hero-title-block inline-block will-change-transform">
        The Virtual Business Card That{' '}
        <span className="text-brand-gold font-semibold">Sells</span>
        {' '}Before You Even Speak
      </span>
    </h1>
  );
}
