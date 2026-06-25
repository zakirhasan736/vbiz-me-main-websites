'use client';

import { useRef } from 'react';
import {
  PARTNER_LOGOS,
  getPartnerLogoMobileRows,
} from '@/lib/partner-logos';
import { usePartnerMarqueeLayout, useIsPartnerMarqueeDesktop } from '@/components/hero/usePartnerMarqueeLayout';
import { useMarqueeViewportWidth } from '@/components/hero/useMarqueeViewportWidth';
import { PartnerLogoCell } from '@/components/hero/PartnerLogoCell';

type PartnerLogo = (typeof PARTNER_LOGOS)[number];

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
          <PartnerLogoCell key={`${trackKey}-${logo.src}`} logo={logo} />
        ))}
        {loopDuplicate
          ? logos.map((logo) => (
              <PartnerLogoCell key={`${trackKey}-${logo.src}-loop`} logo={logo} duplicate />
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
          <PartnerLogoCell key={`static-${logo.src}`} logo={logo} />
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
            <PartnerLogoCell key={`static-a-${logo.src}`} logo={logo} />
          ))}
        </div>
      </div>
      <div className="partner-logo-marquee__viewport">
        <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
          {rowB.map((logo) => (
            <PartnerLogoCell key={`static-b-${logo.src}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PartnerLogoMarquee() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layout = usePartnerMarqueeLayout();
  const isDesktop = useIsPartnerMarqueeDesktop();
  const loopDuplicate = layout !== 'static';

  useMarqueeViewportWidth(rootRef);

  return (
    <div
      ref={rootRef}
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
