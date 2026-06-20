import {
  PARTNER_LOGOS,
  PARTNER_LOGO_MOBILE_HEIGHT,
  PARTNER_LOGO_MOBILE_WIDTH,
  getPartnerLogoMobileRows,
} from '@/lib/partner-logos';

type PartnerLogo = (typeof PARTNER_LOGOS)[number];

function StaticLogo({ logo }: { logo: PartnerLogo }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      width={PARTNER_LOGO_MOBILE_WIDTH}
      height={PARTNER_LOGO_MOBILE_HEIGHT}
      className="partner-logo-marquee__cell partner-logo-marquee__logo"
      decoding="async"
      draggable={false}
    />
  );
}

/** SSR partner logos — reserves exact marquee height before client hydration. */
export function PartnerLogoMarqueeStatic() {
  const { rowA, rowB } = getPartnerLogoMobileRows();

  return (
    <div className="partner-logo-marquee-static" aria-hidden="true">
      <div className="partner-logo-marquee partner-logo-marquee--mobile partner-logo-marquee-static__mobile md:hidden">
        <div className="partner-logo-marquee__rows">
          <div className="partner-logo-marquee__viewport">
            <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
              {rowA.map((logo) => (
                <StaticLogo key={`ssr-a-${logo.src}`} logo={logo} />
              ))}
            </div>
          </div>
          <div className="partner-logo-marquee__viewport">
            <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
              {rowB.map((logo) => (
                <StaticLogo key={`ssr-b-${logo.src}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="partner-logo-marquee partner-logo-marquee--desktop partner-logo-marquee-static__desktop hidden md:block">
        <div className="partner-logo-marquee__viewport">
          <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
            {PARTNER_LOGOS.map((logo) => (
              <StaticLogo key={`ssr-d-${logo.src}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
