'use client';

import { PARTNER_LOGO_MOBILE_HEIGHT, PARTNER_LOGO_MOBILE_WIDTH } from '@/lib/partner-logos';

type PartnerLogo = {
  src: string;
  alt: string;
};

type PartnerLogoCellProps = {
  logo: PartnerLogo;
  duplicate?: boolean;
  cellClassName?: string;
  logoClassName?: string;
};

/** Partner logos are tiny (~20KB total) — render immediately, no lazy placeholders. */
export function PartnerLogoCell({
  logo,
  duplicate,
  cellClassName = 'partner-logo-marquee__cell',
  logoClassName = 'partner-logo-marquee__logo',
}: PartnerLogoCellProps) {
  return (
    <div className={cellClassName} aria-hidden={duplicate || undefined}>
      <img
        src={logo.src}
        alt={duplicate ? '' : logo.alt}
        width={PARTNER_LOGO_MOBILE_WIDTH}
        height={PARTNER_LOGO_MOBILE_HEIGHT}
        className={logoClassName}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
