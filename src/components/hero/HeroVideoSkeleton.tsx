/** Invisible layout placeholder — right column stays hidden until CSR video animates in */
export function HeroVideoSkeleton() {
  return (
    <div
      className="hero-banner-right hero-video-await lg:col-span-6 flex justify-center lg:justify-end relative md:pr-4 w-full opacity-0 pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[620px] overflow-hidden rounded-2xl border border-transparent">
        <div className="w-full aspect-video" />
        <div className="h-[60px] sm:h-[68px]" />
      </div>
    </div>
  );
}
