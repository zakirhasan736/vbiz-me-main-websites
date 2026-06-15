/** Fixed-size placeholder — reserves space so CSR video load does not shift layout. */
export function HeroVideoSkeleton() {
  return (
    <div
      className="lg:col-span-6 flex justify-center lg:justify-end relative md:pr-4 w-full"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[620px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70">
        <div className="w-full aspect-video animate-pulse bg-neutral-900/80" />
        <div className="h-[60px] sm:h-[68px] animate-pulse bg-neutral-950/90 border-t border-white/10" />
      </div>
    </div>
  );
}
