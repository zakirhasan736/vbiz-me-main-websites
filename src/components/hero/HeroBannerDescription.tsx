export const HERO_BANNER_DESCRIPTION_LINES = [
  'Discover the vBiz Me virtual business card (vCard)—',
  'an innovative leap in digital networking',
  'designed to make a powerful emotional impact.',
] as const;

export function HeroBannerDescription() {
  return (
    <p className="hero-desc-block text-lg sm:text-xl text-neutral-400 font-light leading-relaxed mb-8 max-w-2xl text-left will-change-transform">
      {HERO_BANNER_DESCRIPTION_LINES[0]}
      <br />
      {HERO_BANNER_DESCRIPTION_LINES[1]}
      <br />
      {HERO_BANNER_DESCRIPTION_LINES[2]}
    </p>
  );
}
