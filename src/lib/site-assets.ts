export const VBIZ_LOGO = {
  src: '/logo-vbizme.webp',
  /** Intrinsic asset dimensions (square logo file). */
  width: 375,
  height: 375,
  navbar: {
    width: 90,
    height: 90,
    sizes: '90px',
    className: 'h-[45px] w-auto object-contain',
  },
  footer: {
    width: 156,
    height: 156,
    sizes: '(min-width: 768px) 156px, 96px',
    className: 'h-12 md:h-[78px] w-auto object-contain',
  },
} as const;

/** CEO / founder intro — homepage hero + About page. */
export const FOUNDER_INTRO_VIDEO =
  'https://www.vbizme.com/wp-content/uploads/2024/08/vBizMe_080624_IT002.mp4';
