'use client';

import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { COMPETITIVE_ANALYSIS_CHART } from '@/lib/site-assets';
import { SiteImage } from '@/components/ui/SiteImage';

type HeroCompetitiveAnalysisPopupProps = {
  isOpen: boolean;
  siteLoaded: boolean;
  onClose: () => void;
};

export function HeroCompetitiveAnalysisPopup({
  isOpen,
  siteLoaded: _siteLoaded,
  onClose,
}: HeroCompetitiveAnalysisPopupProps) {
  if (!isOpen) return null;

  const popup = (
    <div
      onClick={onClose}
      className="site-modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
      id="hero-competitive-analysis-backdrop"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-competitive-analysis-title"
        onClick={(event) => event.stopPropagation()}
        className="site-modal-panel relative w-full max-w-5xl max-h-[min(95vh,920px)] bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
        id="hero-competitive-analysis-modal"
        data-lenis-prevent
      >
        <div className="shrink-0 flex items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5 border-b border-white/5">
          <div className="flex min-w-0 flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="shrink-0 w-fit p-1 px-2.5 rounded bg-brand-gold/15 text-brand-gold text-[10px] font-bold uppercase tracking-wider">
              Competitive Analysis
            </span>
            <h3
              id="hero-competitive-analysis-title"
              className="text-sm sm:text-base font-semibold text-white tracking-wide truncate"
            >
              vBiz Me vs. Legacy Cards
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 md:px-6">
          <div className="rounded-xl overflow-hidden border border-white/5 bg-black/30 min-h-[200px] flex items-center justify-center">
            <SiteImage
              src={COMPETITIVE_ANALYSIS_CHART.src}
              alt={COMPETITIVE_ANALYSIS_CHART.alt}
              width={COMPETITIVE_ANALYSIS_CHART.width}
              height={COMPETITIVE_ANALYSIS_CHART.height}
              sizes="(max-width: 768px) 100vw, 1024px"
              className="w-full h-auto block"
            />
          </div>
        </div>

        <div className="shrink-0 px-4 py-4 md:px-6 md:py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-base">
          <p className="text-neutral-500 font-light text-center sm:text-left">
            Designed to transform standard handshakes into premium sales opportunities.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href="/contact"
              className="px-5 py-2 rounded-full bg-brand-gold text-black font-semibold hover:bg-yellow-400 transition-colors"
              onClick={onClose}
            >
              Take Action Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(popup, document.body);
}
