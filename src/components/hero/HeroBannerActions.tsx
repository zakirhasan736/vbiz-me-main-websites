'use client';

import { useEffect, useState } from 'react';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

type PopupComponent = typeof import('./HeroCompetitiveAnalysisPopup').HeroCompetitiveAnalysisPopup;

/** Client island — first paint is only the button; popup code loads after site load. */
export function HeroBannerActions() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [siteLoaded, setSiteLoaded] = useState(false);
  const [Popup, setPopup] = useState<PopupComponent | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let cancelled = false;

    scheduleAfterSiteLoad(() => {
      if (cancelled) return;

      setSiteLoaded(true);
      void import('./HeroCompetitiveAnalysisPopup').then((module) => {
        if (!cancelled) {
          setPopup(() => module.HeroCompetitiveAnalysisPopup);
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isPopupOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPopupOpen(false);
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);

  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="border border-white/10 bg-white/5 text-white font-medium h-14 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-colors w-full sm:w-auto text-sm shrink-0 cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={isPopupOpen}
      >
        <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-3 w-3 text-brand-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18" />
            <path d="M8 17V9" />
            <path d="M13 17V5" />
            <path d="M18 17v-6" />
          </svg>
        </span>
        See How We Beat The Competition
      </button>

      {mounted && siteLoaded && Popup ? (
        <Popup isOpen={isPopupOpen} siteLoaded={siteLoaded} onClose={closePopup} />
      ) : null}
    </>
  );
}
