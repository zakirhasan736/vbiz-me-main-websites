import { PARTNER_LOGO_DISPLAY } from '@/lib/site-assets';

/** Partner logos in `/public/partner-logo-optimized` — used by the hero trust marquee. */
export const PARTNER_LOGOS = [
  { src: '/partner-logo-optimized/partner-logo-1.webp', alt: 'Partner company logo 1' },
  { src: '/partner-logo-optimized/partner-logo-2.webp', alt: 'Partner company logo 2' },
  { src: '/partner-logo-optimized/partner-logo-3.webp', alt: 'Partner company logo 3' },
  { src: '/partner-logo-optimized/partner-logo-4.webp', alt: 'Partner company logo 4' },
  { src: '/partner-logo-optimized/partner-logo-5.webp', alt: 'Partner company logo 5' },
  { src: '/partner-logo-optimized/partner-logo-6.webp', alt: 'Partner company logo 6' },
  { src: '/partner-logo-optimized/partner-logo-7.webp', alt: 'Partner company logo 7' },
  { src: '/partner-logo-optimized/partner-logo-8.webp', alt: 'Partner company logo 8' },
  { src: '/partner-logo-optimized/partner-logo-9.webp', alt: 'Partner company logo 9' },
  { src: '/partner-logo-optimized/partner-logo-10.webp', alt: 'Partner company logo 10' },
  { src: '/partner-logo-optimized/partner-logo-11.webp', alt: 'Partner company logo 11' },
  { src: '/partner-logo-optimized/partner-logo-12.webp', alt: 'Partner company logo 12' },
  { src: '/partner-logo-optimized/partner-logo-13.webp', alt: 'Partner company logo 13' },
] as const;

export const PARTNER_LOGO_SIZE = PARTNER_LOGO_DISPLAY;

export const PARTNER_LOGO_ASPECT = PARTNER_LOGO_DISPLAY.width / PARTNER_LOGO_DISPLAY.height;

/** Mobile marquee logo height — width follows aspect ratio in CSS. */
export const PARTNER_LOGO_MOBILE_HEIGHT = 58;

export const PARTNER_LOGO_MOBILE_WIDTH = Math.round(PARTNER_LOGO_MOBILE_HEIGHT * PARTNER_LOGO_ASPECT);

/** Logos visible in the desktop marquee viewport at once. */
export const PARTNER_DESKTOP_VISIBLE_COUNT = 4;

/** Logos visible per row in the mobile dual-row marquee. */
export const PARTNER_MOBILE_VISIBLE_COUNT = 3;

/** Safari arrow nav — logos to advance per click. */
export const PARTNER_SAFARI_ARROW_GROUP_MOBILE = 1;
export const PARTNER_SAFARI_ARROW_GROUP_DESKTOP = 2;

/** Split 13 logos — first row gets the larger half (7), second row gets 6. */
export function getPartnerLogoMobileRows(): {
  rowA: (typeof PARTNER_LOGOS)[number][];
  rowB: (typeof PARTNER_LOGOS)[number][];
} {
  const splitAt = Math.ceil(PARTNER_LOGOS.length / 2);
  return {
    rowA: [...PARTNER_LOGOS.slice(0, splitAt)],
    rowB: [...PARTNER_LOGOS.slice(splitAt)],
  };
}
