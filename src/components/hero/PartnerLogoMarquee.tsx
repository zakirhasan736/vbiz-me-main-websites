'use client';

import {
  PARTNER_LOGOS,
  PARTNER_LOGO_MOBILE_HEIGHT,
  PARTNER_LOGO_MOBILE_WIDTH,
} from '@/lib/partner-logos';
import { usePartnerMarqueeLayout } from '@/components/hero/usePartnerMarqueeLayout';

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

function StaticLogoGrid() {
  return (
    <div className="partner-logo-marquee__viewport">
      <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
        {PARTNER_LOGOS.map((logo) => (
          <PartnerLogoImage key={`static-${logo.src}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export function PartnerLogoMarquee() {
  const layout = usePartnerMarqueeLayout();
  const loopDuplicate = layout !== 'static';

  return (
    <div
      className={`partner-logo-marquee relative w-full partner-logo-marquee--${layout}`}
      aria-label="Trusted partner company logos"
      role="region"
    >
      {layout === 'static' ? (
        <StaticLogoGrid />
      ) : (
        <MarqueeTrack
          logos={PARTNER_LOGOS}
          loopDuplicate={loopDuplicate}
          trackKey={layout}
          reverse={layout === 'mobile'}
        />
      )}
    </div>
  );
}
