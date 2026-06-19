import { HeroBanner } from '@/components/hero/HeroBanner';
import { HeroPrimaryCta } from '@/components/hero/HeroPrimaryCta';
import { HeroVideoLazy } from '@/components/hero/HeroVideoLazy';
import { HeroAmbientLazy } from '@/components/hero/HeroAmbientLazy';
import { HeroTrustBar } from '@/components/hero/HeroTrustBar';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';

/** Hero shell: SSR banner + CSR video/effects loaded after paint. */
export function HeroSection() {
  return (
    <section className="section-hero hero-banner-pending relative min-h-screen flex flex-col justify-center pt-38 pb-16 z-20 overflow-hidden bg-brand-dark">
      <PageHeroBackground />
      <HeroAmbientLazy />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        <HeroBanner primaryCta={<HeroPrimaryCta />} />
        <HeroVideoLazy />
      </div>

      <HeroTrustBar />
    </section>
  );
}
