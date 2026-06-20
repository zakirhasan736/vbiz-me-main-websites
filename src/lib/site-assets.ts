export const VBIZ_LOGO = {
  src: '/logo-vbizme.webp',
  width: 256,
  height: 256,
  alt: 'vBiz Me Logo',
  navbar: {
    width: 256,
    height: 256,
    sizes: '256px',
    className: 'h-[42px] md:h-[52px] w-auto object-contain',
  },
  footer: {
    width: 256,
    height: 256,
    sizes: '(min-width: 768px) 256px, 256px',
    className: 'h-16 md:h-[78px] w-auto object-contain',
  },
} as const;

/**
 * Legacy filename spelling: "Competative" (public asset — keep path in sync with `/public`).
 * Used in hero popup + Compare / Our vCards sections.
 */
export const COMPETITIVE_ANALYSIS_CHART = {
  src: '/vBiz-Me-Competative-Analysis.webp',
  width: 1672,
  height: 941,
  alt: 'vBiz Me competitive analysis chart comparing legacy business cards to vBiz Me',
} as const;

/** Branded portfolio QR WebP cards — square-ish (~675px). */
export const PORTFOLIO_QR_IMAGE = {
  width: 675,
  height: 671,
} as const;

/** Industry phone mockup preview frames (WebP). */
export const INDUSTRY_MOCKUP_IMAGE = {
  width: 276,
  height: 559,
} as const;

/** Marquee partner logos — display cell size (intrinsic varies per file). */
export const PARTNER_LOGO_DISPLAY = {
  width: 140,
  height: 76,
} as const;

/** CEO / founder intro — homepage hero + About page. */
export const FOUNDER_INTRO_VIDEO = '/vbiz-me-about-video.mp4';

/** Invisible Advantage explainer — Advantage page. */
export const INVISIBLE_ADVANTAGE_VIDEO = '/The-Invisible-Advantage-Final.mp4';

/** Live AI assistant avatar (portrait JPEG). */
export const LIVE_AGENT_AVATAR = {
  src: '/ai-live-agent-avatar.webp',
  width: 112,
  height: 112,
  alt: 'Live AI assistant',
  panel: { width: 40, height: 40, sizes: '40px' },
  fab: { width: 56, height: 56, sizes: '56px' },
} as const;

export const LIVE_AGENT_VOICE = 'Charon';

/** @deprecated Use COMPETITIVE_ANALYSIS_CHART.src */
export const COMPETITIVE_ANALYSIS_IMAGE = COMPETITIVE_ANALYSIS_CHART.src;
