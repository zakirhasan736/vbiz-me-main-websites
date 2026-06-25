'use client';

import { useRef } from 'react';
import { PARTNER_LOGOS } from '@/lib/partner-logos';
import { PartnerLogoCell } from '@/components/hero/PartnerLogoCell';
import { usePartnerMarqueeLoad } from '@/components/hero/partner-marquee-load-context';
import { useMarqueeViewportWidth } from '@/components/hero/useMarqueeViewportWidth';

/** Continuous auto-scroll loop (marquee-style) — duplicated track + CSS linear animation. */
export function PartnerLogoLoopSlider() {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { marqueeActive } = usePartnerMarqueeLoad();

  useMarqueeViewportWidth(rootRef);

  return (
    <div
      ref={rootRef}
      className={`partner-logo-slider${marqueeActive ? '' : ' partner-logo-slider--paused'}`}
      role="region"
      aria-label="Trusted partner company logos"
    >
      <div className="partner-logo-slider__viewport" ref={viewportRef}>
        <div className="partner-logo-slider__track">
          {PARTNER_LOGOS.map((logo) => (
            <PartnerLogoCell
              key={logo.src}
              logo={logo}
              cellClassName="partner-logo-slider__cell"
              logoClassName="partner-logo-slider__logo"
            />
          ))}
          {PARTNER_LOGOS.map((logo) => (
            <PartnerLogoCell
              key={`${logo.src}-loop`}
              logo={logo}
              duplicate
              cellClassName="partner-logo-slider__cell"
              logoClassName="partner-logo-slider__logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
