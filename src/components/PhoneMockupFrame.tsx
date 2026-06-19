'use client';

import { VCardIframeFrame } from '@/components/VCardIframeFrame';
import { MOBILE_FRAME_SIZES, type MobileFrameSize } from '@/lib/mobile-frame';
import { INDUSTRY_MOCKUP_IMAGE } from '@/lib/site-assets';

export type { MobileFrameSize };

export interface PhoneMockupFrameProps {
  src: string;
  title: string;
  /** @deprecated Live iframe is preferred — static preview only when explicitly set */
  previewImage?: string;
  /** hero = industries / examples; modal = portfolio & our-work popups */
  size?: MobileFrameSize;
  className?: string;
  compactLoader?: boolean;
  previewPriority?: boolean;
  live?: boolean;
  iframeLoading?: 'lazy' | 'eager';
  showUrlInLoader?: boolean;
}

/**
 * Reusable live vCard phone frame — 375px logical viewport inside the shell.
 * Used on Home (industries, portfolio), Our Work, and Examples.
 */
export function PhoneMockupFrame({
  src,
  title,
  previewImage,
  size = 'hero',
  className = '',
  compactLoader = false,
  live = true,
  iframeLoading = 'lazy',
  showUrlInLoader = false,
}: PhoneMockupFrameProps) {
  const styles = MOBILE_FRAME_SIZES[size];
  const showLive = live || !previewImage;

  return (
    <div
      className={`vcard-phone-mockup bg-neutral-950 border-neutral-800 relative z-10 flex flex-col overflow-hidden pointer-events-auto touch-auto mx-auto ${styles.shell} ${className}`}
      data-lenis-prevent
      data-lenis-prevent-touch
      data-lenis-prevent-wheel
      style={{ maxWidth: styles.maxWidth }}
    >
      <div
        className={`absolute inset-x-0 mx-auto bg-brand-deep ${styles.notch} z-20 flex items-center justify-center pointer-events-none select-none`}
        aria-hidden="true"
      >
        <div className={`${styles.notchBar} bg-neutral-800 rounded-full`} />
      </div>

      <div
        className={`vcard-phone-screen w-full flex-1 min-h-0 bg-[#080808] ${styles.screen} overflow-hidden flex flex-col relative pointer-events-auto touch-auto`}
        data-lenis-prevent
        data-lenis-prevent-touch
        data-lenis-prevent-wheel
      >
        {showLive ? (
          <div className="vcard-iframe-lane-inner absolute inset-0 overflow-hidden pointer-events-auto touch-auto">
            <VCardIframeFrame
              src={src}
              title={title}
              compact={compactLoader}
              iframeLoading={iframeLoading}
              showUrlInLoader={showUrlInLoader}
            />
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={previewImage}
            alt={title}
            width={INDUSTRY_MOCKUP_IMAGE.width}
            height={INDUSTRY_MOCKUP_IMAGE.height}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}

/** Alias for clearer imports */
export const MobileVCardFrame = PhoneMockupFrame;
