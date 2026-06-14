/** Fixed-size placeholder — reserves space so CSR video load does not shift layout. */
export function HeroVideoSkeleton() {
  return (
    <div
      className="lg:col-span-5 flex justify-center lg:justify-end relative md:pr-4 w-full min-h-[460px] sm:min-h-[540px] lg:min-h-[580px]"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[620px] h-[460px] sm:h-[540px] lg:h-[580px] rounded-2xl border border-white/10 bg-neutral-950/70 animate-pulse" />
    </div>
  );
}
