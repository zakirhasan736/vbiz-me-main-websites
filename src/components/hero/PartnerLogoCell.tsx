'use client';

import { PARTNER_LOGO_MOBILE_HEIGHT, PARTNER_LOGO_MOBILE_WIDTH, type PartnerLogo } from '@/lib/partner-logos';

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
  const mediaProps = {
    className: logoClassName,
    draggable: false as const,
    'aria-hidden': duplicate ? true : undefined,
  };

  return (
    <div className={cellClassName} aria-hidden={duplicate || undefined}>
      {logo.kind === 'video' ? (
        <video
          src={logo.src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          className={logoClassName}
          draggable={false}
          aria-hidden="true"
        />
      ) : (
        <img
          src={logo.src}
          alt={duplicate ? '' : logo.alt}
          width={PARTNER_LOGO_MOBILE_WIDTH}
          height={PARTNER_LOGO_MOBILE_HEIGHT}
          decoding="async"
          {...mediaProps}
        />
      )}
    </div>
  );
}
