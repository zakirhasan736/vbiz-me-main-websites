'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HeroHeading } from '@/components/hero/HeroHeading';
import { HeroBannerDescription } from '@/components/hero/HeroBannerDescription';
import { HeroBannerActions } from '@/components/hero/HeroBannerActions';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { useHeroAnimateReady } from '@/components/hero/useHeroAnimateReady';
import {
  buildHeroLeftTimeline,
  lockHeroSectionVisible,
  prefersReducedMotion,
  resetHeroSectionPending,
} from '@/lib/hero-gsap-animation';

export function HeroBanner() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { animateReady, animationKey } = useHeroAnimateReady();

  useLayoutEffect(() => {
    const section = rootRef.current?.closest('.section-hero') as HTMLElement | null;
    if (!animateReady) {
      resetHeroSectionPending(section);
    }
  }, [animateReady, animationKey]);

  useGSAP(
    () => {
      if (!animateReady || !rootRef.current) return;

      const section = rootRef.current.closest('.section-hero') as HTMLElement | null;
      timelineRef.current?.kill();

      timelineRef.current = buildHeroLeftTimeline(
        rootRef.current,
        prefersReducedMotion(),
      );

      timelineRef.current.eventCallback('onComplete', () => {
        lockHeroSectionVisible(section);
      });

      return () => {
        timelineRef.current?.kill();
        timelineRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [animateReady, animationKey] },
  );

  return (
    <div
      ref={rootRef}
      className="hero-banner-left lg:col-span-6 flex flex-col relative z-999 items-start text-left"
    >
      <div className="hero-eyebrow mb-6">
        <SectionEyebrow label="Real-time Video Introductions" />
      </div>

      <HeroHeading />

      <HeroBannerDescription />

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-50 relative">
        <div className="hero-cta-item w-full sm:w-auto">
          <Link
            href="/contact"
            className="bg-brand-gold whitespace-nowrap hover:bg-yellow-400 text-black font-semibold h-14 px-8 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.25)] w-full sm:w-auto"
          >
            Create My Free vCard <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="hero-cta-item w-full sm:w-auto">
          <HeroBannerActions />
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
    </div>
  );
}
