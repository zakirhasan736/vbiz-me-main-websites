'use client';

import {
  PARTNER_LOGOS,
  PARTNER_LOGO_MOBILE_HEIGHT,
  PARTNER_LOGO_MOBILE_WIDTH,
  getPartnerLogoMobileRows,
} from '@/lib/partner-logos';
import { usePartnerMarqueeLayout, useIsPartnerMarqueeDesktop } from '@/components/hero/usePartnerMarqueeLayout';

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

function MobileDualRowMarquee({ loopDuplicate }: { loopDuplicate: boolean }) {
  const { rowA, rowB } = getPartnerLogoMobileRows();

  return (
    <div className="partner-logo-marquee__rows">
      <MarqueeTrack logos={rowA} loopDuplicate={loopDuplicate} trackKey="mobile-row-a" />
      <MarqueeTrack logos={rowB} reverse loopDuplicate={loopDuplicate} trackKey="mobile-row-b" />
    </div>
  );
}

function MobileStaticLogoGrid() {
  const { rowA, rowB } = getPartnerLogoMobileRows();

  return (
    <div className="partner-logo-marquee__rows">
      <div className="partner-logo-marquee__viewport">
        <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
          {rowA.map((logo) => (
            <PartnerLogoImage key={`static-a-${logo.src}`} logo={logo} />
          ))}
        </div>
      </div>
      <div className="partner-logo-marquee__viewport">
        <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
          {rowB.map((logo) => (
            <PartnerLogoImage key={`static-b-${logo.src}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PartnerLogoMarquee() {
  const layout = usePartnerMarqueeLayout();
  const isDesktop = useIsPartnerMarqueeDesktop();
  const loopDuplicate = layout !== 'static';

  return (
    <div
      className={`partner-logo-marquee relative w-full partner-logo-marquee--${layout}`}
      aria-label="Trusted partner company logos"
      role="region"
    >
      {layout === 'static' ? (
        isDesktop ? <StaticLogoGrid /> : <MobileStaticLogoGrid />
      ) : layout === 'mobile' ? (
        <MobileDualRowMarquee loopDuplicate={loopDuplicate} />
      ) : (
        <MarqueeTrack
          logos={PARTNER_LOGOS}
          loopDuplicate={loopDuplicate}
          trackKey="desktop"
        />
      )}
    </div>
  );
}
