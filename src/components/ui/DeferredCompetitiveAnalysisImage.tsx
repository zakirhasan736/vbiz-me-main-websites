'use client';

import { useEffect, useRef, useState } from 'react';
import { COMPETITIVE_ANALYSIS_CHART } from '@/lib/site-assets';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { SiteImage } from '@/components/ui/SiteImage';

type DeferredChartImageProps = {
  className?: string;
  id?: string;
};

/** Loads competitive analysis chart only after site load + scroll into view. */
export function DeferredCompetitiveAnalysisImage({ className = '', id }: DeferredChartImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [siteLoaded, setSiteLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setSiteLoaded(true));
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldLoad = siteLoaded && inView;

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${COMPETITIVE_ANALYSIS_CHART.width} / ${COMPETITIVE_ANALYSIS_CHART.height}` }}
    >
      {shouldLoad ? (
        <SiteImage
          id={id}
          src={COMPETITIVE_ANALYSIS_CHART.src}
          alt={COMPETITIVE_ANALYSIS_CHART.alt}
          width={COMPETITIVE_ANALYSIS_CHART.width}
          height={COMPETITIVE_ANALYSIS_CHART.height}
          sizes="(max-width: 768px) 100vw, 1024px"
          className="w-full h-auto rounded-2xl opacity-95 hover:opacity-100 transition-opacity duration-500 shadow-inner"
        />
      ) : (
        <div
          className="w-full h-full min-h-[180px] rounded-2xl bg-brand-surface/40 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
