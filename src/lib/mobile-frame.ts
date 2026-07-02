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
    /** Shell ≈ 860px — fits 812px logical viewport + padding/border (reduces inner iframe scroll) */
    shell:
      'w-full max-w-[407px] h-[min(860px,78dvh)] min-h-[620px] rounded-[48px] p-3 border-[4px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.1)]',
    screen: 'rounded-[36px]',
  },
  modal: {
    /** Mobile sheet popups — tall shell; header is drag + back/close only */
    maxWidth: 407,
    shell:
      'w-full max-w-[407px] h-[clamp(520px,calc(95dvh-4.25rem),710px)] min-h-[500px] rounded-[44px] p-3 border-[4px] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.05)]',
    screen: 'rounded-[34px]',
  },
};
