import { HeroBanner } from '@/components/hero/HeroBanner';
import { HeroVideoLazy } from '@/components/hero/HeroVideoLazy';
import { HeroAmbientLazy } from '@/components/hero/HeroAmbientLazy';
import { HeroTrustBar } from '@/components/hero/HeroTrustBar';

/** Hero shell: SSR banner + CSR video/effects loaded after paint. */
export function HeroSection() {
  return (
    <section className="section-hero relative min-h-screen flex flex-col justify-center pt-32 pb-16 z-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_center,#111111_0%,black_100%)] opacity-85" />
      <HeroAmbientLazy />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        <HeroBanner />
        <HeroVideoLazy />
      </div>

      <HeroTrustBar />
    </section>
  );
}
