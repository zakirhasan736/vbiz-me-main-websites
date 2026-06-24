/** Theme-aware page hero backdrop — pinned to viewport height to avoid CLS when hero grows. */
export function PageHeroBackground({ overVideo = false }: { overVideo?: boolean }) {
  const positionClass = overVideo
    ? 'absolute inset-0'
    : 'absolute inset-x-0 top-0 h-svh';

  return (
    <div
      className={`${positionClass} z-0 page-hero-bg-shell pointer-events-none overflow-hidden${overVideo ? ' page-hero-bg-shell--over-video' : ''}`}
      aria-hidden="true"
    >
      <div className="page-hero-bg-gradient absolute inset-0" />
      {overVideo ? (
        <div className="page-hero-bg-text-scrim absolute inset-0" />
      ) : null}
      <div className="page-hero-bg-glow absolute top-[-10%] left-1/2 -translate-x-1/2 w-[min(800px,100%)] h-[600px] rounded-full blur-[150px]" />
      <div className="page-hero-bg-grid absolute inset-0" />
    </div>
  );
}
