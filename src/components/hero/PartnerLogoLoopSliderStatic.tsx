import { PARTNER_DESKTOP_VISIBLE_COUNT, PARTNER_MOBILE_VISIBLE_COUNT } from '@/lib/partner-logos';

function PlaceholderCell() {
  return (
    <div
      className="partner-logo-slider__cell partner-logo-slider__cell--placeholder"
      aria-hidden="true"
    />
  );
}

/** SSR slider shell — placeholder cells only (no logo requests before hydration). */
export function PartnerLogoLoopSliderStatic() {
  const slotCount = Math.max(PARTNER_MOBILE_VISIBLE_COUNT, PARTNER_DESKTOP_VISIBLE_COUNT) + 2;

  return (
    <div className="partner-logo-slider partner-logo-slider--static" aria-hidden="true">
      <div className="partner-logo-slider__viewport">
        <div className="partner-logo-slider__track partner-logo-slider__track--static">
          {Array.from({ length: slotCount }, (_, index) => (
            <PlaceholderCell key={`partner-logo-placeholder-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
