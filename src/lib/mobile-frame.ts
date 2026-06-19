/** Shared mobile preview frame — single source for all live vCard phone mockups */

export const MOBILE_VIEWPORT = {
  width: 375,
  height: 812,
} as const;

export type MobileFrameSize = 'hero' | 'modal';

/** Notch dimensions are identical for all sizes — rendered via CSS ::before / ::after on .vcard-phone-mockup */
export const MOBILE_FRAME_SIZES: Record<
  MobileFrameSize,
  {
    shell: string;
    screen: string;
    maxWidth: number;
  }
> = {
  hero: {
    maxWidth: 407,
    shell:
      'w-full max-w-[407px] h-[min(760px,80dvh)] min-h-[540px] rounded-[48px] p-3 border-[4px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.1)]',
    screen: 'rounded-[36px]',
  },
  modal: {
    /** Outer shell — inner screen ≈ 375px (375 + padding + border) */
    maxWidth: 407,
    shell:
      'w-full max-w-[407px] h-[min(780px,75dvh)] min-h-[540px] rounded-[44px] p-3 border-[4px] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.05)]',
    screen: 'rounded-[34px]',
  },
};
