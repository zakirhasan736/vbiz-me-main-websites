'use client';

import { useEffect, useState } from 'react';
import {
  PARTNER_LOGOS,
  PARTNER_LOGO_MARQUEE_ROW_A,
  PARTNER_LOGO_MARQUEE_ROW_B,
  PARTNER_LOGO_MOBILE_HEIGHT,
  PARTNER_LOGO_MOBILE_WIDTH,
} from '@/lib/partner-logos';

type PartnerLogo = (typeof PARTNER_LOGOS)[number];

function PartnerLogoImage({ logo, duplicate = false }: { logo: PartnerLogo; duplicate?: boolean }) {
  return (
    <img
      src={logo.src}
      alt={duplicate ? '' : logo.alt}
      aria-hidden={duplicate || undefined}
      width={PARTNER_LOGO_MOBILE_WIDTH}
      height={PARTNER_LOGO_MOBILE_HEIGHT}
      className="partner-logo-marquee__cell partner-logo-marquee__logo"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      draggable={false}
    />
  );
}

function MarqueeTrack({
  logos,
  reverse = false,
  loopDuplicate,
  trackKey,
}: {
  logos: readonly PartnerLogo[];
  reverse?: boolean;
  loopDuplicate: boolean;
  trackKey: string;
}) {
  return (
    <div className="partner-logo-marquee__viewport">
      <div
        className={`partner-logo-marquee__track${reverse ? ' partner-logo-marquee__track--reverse' : ''}`}
      >
        {logos.map((logo) => (
          <PartnerLogoImage key={`${trackKey}-${logo.src}`} logo={logo} />
        ))}
        {loopDuplicate
          ? logos.map((logo) => (
              <PartnerLogoImage key={`${trackKey}-${logo.src}-loop`} logo={logo} duplicate />
            ))
          : null}
      </div>
    </div>
  );
}

export function PartnerLogoMarquee() {
  const [loopDuplicate, setLoopDuplicate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setLoopDuplicate(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div
      className="partner-logo-marquee relative w-full"
      aria-label="Trusted partner company logos"
      role="region"
    >
      <div className="partner-logo-marquee__desktop-only">
        <MarqueeTrack logos={PARTNER_LOGOS} loopDuplicate={loopDuplicate} trackKey="desktop" />
      </div>

      <div className="partner-logo-marquee__mobile-rows">
        <MarqueeTrack
          logos={PARTNER_LOGO_MARQUEE_ROW_A}
          loopDuplicate={loopDuplicate}
          trackKey="row-a"
        />
        <MarqueeTrack
          logos={PARTNER_LOGO_MARQUEE_ROW_B}
          reverse
          loopDuplicate={loopDuplicate}
          trackKey="row-b"
        />
      </div>
    </div>
  );
}
