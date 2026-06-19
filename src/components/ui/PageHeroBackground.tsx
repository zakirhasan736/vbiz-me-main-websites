/** Theme-aware page hero backdrop — pinned to viewport height to avoid CLS when hero grows. */
export function PageHeroBackground() {
  return (
    <div
      className="absolute inset-x-0 top-0 h-svh z-0 page-hero-bg-shell pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="page-hero-bg-gradient absolute inset-0" />
      <div className="page-hero-bg-glow absolute top-[-10%] left-1/2 -translate-x-1/2 w-[min(800px,100%)] h-[600px] rounded-full blur-[150px]" />
      <div className="page-hero-bg-grid absolute inset-0" />
    </div>
  );
}
