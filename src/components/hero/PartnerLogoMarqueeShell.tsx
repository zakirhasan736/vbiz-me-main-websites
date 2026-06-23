'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { PartnerMarqueeLoadProvider } from '@/components/hero/partner-marquee-load-context';

const PartnerLogoLoopSlider = dynamic(
  () =>
    import('@/components/hero/PartnerLogoLoopSlider').then((m) => ({
      default: m.PartnerLogoLoopSlider,
    })),
  { ssr: false },
);

/** SSR static placeholders first; loop slider after load; logos lazy-load in view. */
export function PartnerLogoMarqueeShell({ staticFallback }: { staticFallback: ReactNode }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [sliderInView, setSliderInView] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setReady(true));
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSliderInView(entry.isIntersecting);
      },
      { rootMargin: '0px', threshold: 0.12 },
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  return (
    <PartnerMarqueeLoadProvider marqueeActive={sliderInView}>
      <div ref={shellRef} className="partner-logo-marquee-shell partner-logo-slider-shell relative w-full">
        <div
          className={
            ready
              ? 'partner-logo-slider-static partner-logo-slider-static--hidden'
              : 'partner-logo-slider-static'
          }
          aria-hidden={ready}
        >
          {staticFallback}
        </div>
        {ready ? (
          <div className="partner-logo-slider-animated">
            <PartnerLogoLoopSlider />
          </div>
        ) : null}
      </div>
    </PartnerMarqueeLoadProvider>
  );
}
