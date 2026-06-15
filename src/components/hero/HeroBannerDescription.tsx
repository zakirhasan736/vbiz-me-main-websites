export const HERO_BANNER_DESCRIPTION =
  'Discover the vBiz Me virtual business card (vCard)—an innovative leap in digital networking designed to make a powerful emotional impact.';

/** Server-rendered hero description — paints immediately for LCP (no client JS / motion delay). */
export function HeroBannerDescription() {
  return (
    <p className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed mb-8 max-w-2xl text-left">
      {HERO_BANNER_DESCRIPTION}
    </p>
  );
}
