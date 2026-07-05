import { PARTNER_LOGO_DISPLAY } from '@/lib/site-assets';
import { PARTNER_LOGOS_MANIFEST } from '@/lib/partner-logos.manifest';

export type PartnerLogo = {
  src: string;
  alt: string;
  kind?: 'image' | 'video';
};

/** Partner logos in `/public/partner-logo-optimized` — used by the hero trust marquee. */
export const PARTNER_LOGOS: readonly PartnerLogo[] = PARTNER_LOGOS_MANIFEST;

export const PARTNER_LOGO_SIZE = PARTNER_LOGO_DISPLAY;

export const PARTNER_LOGO_ASPECT = PARTNER_LOGO_DISPLAY.width / PARTNER_LOGO_DISPLAY.height;

/** Mobile marquee logo height — width follows aspect ratio in CSS. */
export const PARTNER_LOGO_MOBILE_HEIGHT = 76;

export const PARTNER_LOGO_MOBILE_WIDTH = Math.round(PARTNER_LOGO_MOBILE_HEIGHT * PARTNER_LOGO_ASPECT);

/** Logos visible in the desktop marquee viewport at once (wide 1920px lane). */
export const PARTNER_DESKTOP_VISIBLE_COUNT = 6;

/** Logos visible per row on mobile (~50% width each — 2 per row). */
export const PARTNER_MOBILE_VISIBLE_COUNT = 2;

/** Safari arrow nav — logos to advance per click. */
export const PARTNER_SAFARI_ARROW_GROUP_MOBILE = 1;
export const PARTNER_SAFARI_ARROW_GROUP_DESKTOP = 2;

/** Split logos — first row gets the larger half. */
export function getPartnerLogoMobileRows(): {
  rowA: PartnerLogo[];
  rowB: PartnerLogo[];
} {
  const splitAt = Math.ceil(PARTNER_LOGOS.length / 2);
  return {
    rowA: [...PARTNER_LOGOS.slice(0, splitAt)],
    rowB: [...PARTNER_LOGOS.slice(splitAt)],
  };
}
