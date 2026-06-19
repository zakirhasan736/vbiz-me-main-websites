import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { HeroBannerDescription } from '@/components/hero/HeroBannerDescription';
import { HeroDescMaskAnimator } from '@/components/hero/HeroDescMaskAnimator';
import { HeroHeading } from '@/components/hero/HeroHeading';
import { HeroTitleMaskAnimator } from '@/components/hero/HeroTitleMaskAnimator';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

/** SSR left-column hero copy — painted on first response; entrance motion runs client-side. */
export function HeroBannerContent({
  primaryCta,
  secondaryCta,
}: {
  primaryCta: ReactNode;
  secondaryCta: ReactNode;
}) {
  return (
    <>
      <div className="hero-eyebrow mb-6">
        <SectionEyebrow label="Real-time Video Introductions" variant="hero" />
      </div>

      <div className="hero-title-stage relative mb-4 sm:mb-6">
        <HeroHeading />
        <HeroTitleMaskAnimator />
      </div>

      <div className="hero-desc-stage relative mb-6 sm:mb-8 max-w-2xl">
        <HeroBannerDescription />
        <HeroDescMaskAnimator />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-50 relative">
        <div className="hero-primary-cta-item w-full sm:w-auto">{primaryCta}</div>
        <div className="hero-secondary-cta-item w-full sm:w-auto">{secondaryCta}</div>
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
    </>
  );
}
