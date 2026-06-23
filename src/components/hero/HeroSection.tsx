import { Check } from 'lucide-react';
import { HeroBannerAnimatorDeferred } from '@/components/hero/HeroBannerAnimatorDeferred';
import { HeroSlideEntrance } from '@/components/hero/HeroSlideEntrance';
import { HeroBannerDescription } from '@/components/hero/HeroBannerDescription';
import { HeroHeading } from '@/components/hero/HeroHeading';
import { HeroPrimaryCta } from '@/components/hero/HeroPrimaryCta';
import { HeroSecondaryCta } from '@/components/hero/HeroSecondaryCta';
import { HeroSecondaryCtaShell } from '@/components/hero/HeroSecondaryCtaShell';
import { HeroVideoLazy } from '@/components/hero/HeroVideoLazy';
import { HeroAmbientLazy } from '@/components/hero/HeroAmbientLazy';
import { HeroTrustBar } from '@/components/hero/HeroTrustBar';
import { PageHeroBackground } from '@/components/ui/PageHeroBackground';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

/** Hero shell — title and description SSR outside any client boundary for LCP. */
export function HeroSection() {
  return (
    <section className="section-hero relative min-h-screen flex flex-col justify-center pt-36 pb-16 z-20 overflow-x-hidden bg-brand-dark">
      <PageHeroBackground />
      <HeroAmbientLazy />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        <HeroSlideEntrance
          side="left"
          className="hero-banner-left lg:col-span-6 flex flex-col relative z-999 items-start text-left"
        >
          <div className="hero-eyebrow mb-6">
            <SectionEyebrow label="Real-time Video Introductions" variant="hero" />
          </div>

          <div className="mb-4 sm:mb-6">
            <HeroHeading />
          </div>

          <div className="mb-6 sm:mb-8 max-w-2xl">
            <HeroBannerDescription />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-50 relative">
            <div className="hero-primary-cta-item w-full sm:w-auto">
              <HeroPrimaryCta />
            </div>
            <div className="hero-secondary-cta-item w-full sm:w-auto">
              <HeroSecondaryCtaShell>
                <HeroSecondaryCta />
              </HeroSecondaryCtaShell>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-neutral-500 text-xs">
            <div className="hero-trust-item flex items-center gap-1.5">
              <Check size={14} className="text-brand-gold" aria-hidden="true" /> No Application Required
            </div>
            <div className="hero-trust-item flex items-center gap-1.5">
              <Check size={14} className="text-brand-gold" aria-hidden="true" /> Instant Smartphone Saving
            </div>
            <div className="hero-trust-item flex items-center gap-1.5">
              <Check size={14} className="text-brand-gold" aria-hidden="true" /> Unlimited Sharing Limits
            </div>
          </div>

          <HeroBannerAnimatorDeferred />
        </HeroSlideEntrance>

        <HeroVideoLazy />
      </div>

      <HeroTrustBar />
    </section>
  );
}
