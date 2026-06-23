'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { lockDocumentScroll, unlockDocumentScroll } from '@/lib/scroll-utils';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

type PopupComponent = typeof import('./HeroCompetitiveAnalysisPopup').HeroCompetitiveAnalysisPopup;

/** Client shell — SSR button + popup loaded after site load. */
export function HeroSecondaryCtaShell({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
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
    const button = rootRef.current?.querySelector('button');
    button?.setAttribute('aria-expanded', String(isPopupOpen));
  }, [isPopupOpen]);

  useEffect(() => {
    const button = rootRef.current?.querySelector('button');
    if (!button) return;

    const openPopup = () => setIsPopupOpen(true);
    button.addEventListener('click', openPopup);
    return () => button.removeEventListener('click', openPopup);
  }, []);

  useEffect(() => {
    if (!isPopupOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPopupOpen(false);
    };

    window.addEventListener('keydown', onKey);
    lockDocumentScroll();

    return () => {
      window.removeEventListener('keydown', onKey);
      unlockDocumentScroll();
    };
  }, [isPopupOpen]);

  return (
    <>
      <div ref={rootRef} className="contents">
        {children}
      </div>

      {mounted && siteLoaded && Popup ? (
        <Popup isOpen={isPopupOpen} siteLoaded={siteLoaded} onClose={() => setIsPopupOpen(false)} />
      ) : null}
    </>
  );
}
