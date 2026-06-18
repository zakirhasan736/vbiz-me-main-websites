export const VBIZ_LOGO = {
  src: '/logo-vbizme.webp',
  /** Intrinsic asset dimensions (square logo file). */
  width: 256,
  height: 256,
  navbar: {
    width: 256,
    height: 256,
    sizes: '256px',
    className: 'h-[32px] md:h-[52px] w-auto object-contain',
  },
  footer: {
    width: 256,
    height: 256,
    sizes: '(min-width: 768px) 256px, 256px',
    className: 'h-12 md:h-[78px] w-auto object-contain',
  },
} as const;

/** CEO / founder intro — homepage hero + About page. */
export const FOUNDER_INTRO_VIDEO =
  '/vBizMe_080624_IT002.mp4';

/** Invisible Advantage explainer — Advantage page. */
export const INVISIBLE_ADVANTAGE_VIDEO =
  '/The-Invisible-Advantage-Final.mp4';

/** Live AI assistant — dog avatar + male voice. */
export const LIVE_AGENT_AVATAR = '/ai-live-agent-image.jpeg';
export const LIVE_AGENT_VOICE = 'Charon';
