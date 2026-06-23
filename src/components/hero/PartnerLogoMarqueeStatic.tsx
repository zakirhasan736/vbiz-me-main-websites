import {
  PARTNER_DESKTOP_VISIBLE_COUNT,
  PARTNER_MOBILE_VISIBLE_COUNT,
} from '@/lib/partner-logos';

function PartnerLogoPlaceholderCell() {
  return <div className="partner-logo-marquee__cell partner-logo-marquee__cell--placeholder" aria-hidden="true" />;
}

function PlaceholderRow({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <PartnerLogoPlaceholderCell key={`placeholder-${index}`} />
      ))}
    </>
  );
}

/** SSR marquee shell — empty cells only (no logo network requests before hydration). */
export function PartnerLogoMarqueeStatic() {
  const mobileSlots = PARTNER_MOBILE_VISIBLE_COUNT + 1;
  const desktopSlots = PARTNER_DESKTOP_VISIBLE_COUNT + 1;

  return (
    <div className="partner-logo-marquee-static" aria-hidden="true">
      <div className="partner-logo-marquee partner-logo-marquee--mobile partner-logo-marquee-static__mobile md:hidden">
        <div className="partner-logo-marquee__rows">
          <div className="partner-logo-marquee__viewport">
            <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
              <PlaceholderRow count={mobileSlots} />
            </div>
          </div>
          <div className="partner-logo-marquee__viewport">
            <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
              <PlaceholderRow count={mobileSlots} />
            </div>
          </div>
        </div>
      </div>

      <div className="partner-logo-marquee partner-logo-marquee--desktop partner-logo-marquee-static__desktop hidden md:block">
        <div className="partner-logo-marquee__viewport">
          <div className="partner-logo-marquee__track partner-logo-marquee__track--static">
            <PlaceholderRow count={desktopSlots} />
          </div>
        </div>
      </div>
    </div>
  );
}
