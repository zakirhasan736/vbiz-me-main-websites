'use client';

import {
  RevealEyebrow,
  RevealParagraph,
  RevealText,
  ScrollRevealCard,
  SectionRevealHeader,
  SectionRevealRoot,
} from '@/components/animations/reveal';
import { DeferredCompetitiveAnalysisImage } from '@/components/ui/DeferredCompetitiveAnalysisImage';

export function CompetitiveAnalysisSection() {
  return (
    <section className="site-section site-section--reveal bg-brand-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_80%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        <SectionRevealRoot viewport="header" className="mb-12">
          <SectionRevealHeader>
            <RevealEyebrow label="Bespoke Advantage" className="mb-4 mx-auto" delay={0} />
            <RevealText
              text="Competitive Analysis"
              className="text-3xl md:text-5xl font-medium text-white tracking-tight text-center"
              tag="h2"
              delay={0.05}
            />
            <RevealParagraph
              text="See how vBiz Me stacks up against traditional paper cards and basic digital options to deliver unmatched brand impressions."
              className="text-neutral-400 font-light text-sm max-w-xl mx-auto mt-3 text-center"
              delay={0.1}
            />
          </SectionRevealHeader>
        </SectionRevealRoot>

        <SectionRevealRoot viewport="content">
          <ScrollRevealCard direction="up" distance="LG" delay={0.06} className="w-full">
            <div className="max-w-full mx-auto bg-brand-surface/65 p-2 md:p-4 rounded-3xl border border-emerald-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden">
              <DeferredCompetitiveAnalysisImage id="vbiz-competitive-analysis-img" />
            </div>
          </ScrollRevealCard>
        </SectionRevealRoot>
      </div>
    </section>
  );
}
