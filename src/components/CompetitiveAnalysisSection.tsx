'use client';

import { RevealText, ScrollRevealCard } from '@/components/animations/reveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { DeferredCompetitiveAnalysisImage } from '@/components/ui/DeferredCompetitiveAnalysisImage';

export function CompetitiveAnalysisSection() {
  return (
    <section className="site-section bg-brand-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_80%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        <div className="mb-12">
          <SectionEyebrow label="Bespoke Advantage" className="mb-4" />
          <RevealText
            text="Competitive Analysis"
            className="text-3xl md:text-5xl font-medium text-white tracking-tight text-center"
            tag="h2"
          />
          <p className="text-neutral-400 font-light text-sm max-w-xl mx-auto mt-3 text-center">
            See how vBiz Me stacks up against traditional paper cards and basic digital options to deliver
            unmatched brand impressions.
          </p>
        </div>

        <ScrollRevealCard direction="up" className="w-full">
          <div className="max-w-full mx-auto bg-brand-surface/65 p-2 md:p-4 rounded-3xl border border-emerald-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden">
            <DeferredCompetitiveAnalysisImage id="vbiz-competitive-analysis-img" />
          </div>
        </ScrollRevealCard>
      </div>
    </section>
  );
}
