'use client';

import { PARTNER_LOGOS, PARTNER_LOGO_SIZE } from '@/lib/partner-logos';

const LOOP_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

export function PartnerLogoMarquee() {
  const { width, height } = PARTNER_LOGO_SIZE;

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
            <img
              key={`${logo.src}-${index}`}
              src={logo.src}
              alt={logo.alt}
              width={width}
              height={height}
              className="partner-logo-marquee__cell partner-logo-marquee__logo"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
