'use client';

import { PARTNER_LOGOS } from '@/lib/partner-logos';

const LOOP_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

export function PartnerLogoMarquee() {
  return (
    <div
      className="partner-logo-marquee relative w-full"
      aria-label="Trusted partner company logos"
      role="region"
    >
      <div className="partner-logo-marquee__edge partner-logo-marquee__edge--left" aria-hidden="true" />
      <div className="partner-logo-marquee__edge partner-logo-marquee__edge--right" aria-hidden="true" />
      <div className="partner-logo-marquee__edge-glow partner-logo-marquee__edge-glow--left" aria-hidden="true" />
      <div className="partner-logo-marquee__edge-glow partner-logo-marquee__edge-glow--right" aria-hidden="true" />

      <div className="partner-logo-marquee__viewport">
        <div className="partner-logo-marquee__track">
          {LOOP_LOGOS.map((logo, index) => (
            <div key={`${logo.src}-${index}`} className="partner-logo-marquee__item">
              <div className="partner-logo-marquee__cell">
                <div className="partner-logo-marquee__cell-shine" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="partner-logo-marquee__logo"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
