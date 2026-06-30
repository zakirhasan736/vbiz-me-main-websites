'use client';

import { forwardRef } from 'react';
import { VCardIframeFrame } from '@/components/VCardIframeFrame';
import { MOBILE_FRAME_SIZES, type MobileFrameSize } from '@/lib/mobile-frame';
import { INDUSTRY_MOCKUP_IMAGE } from '@/lib/site-assets';

export type { MobileFrameSize };

export interface PhoneMockupFrameProps {
  src: string;
  title: string;
  /** @deprecated Live iframe is preferred — static preview only when explicitly set */
  previewImage?: string;
  /** hero = industries; modal = portfolio & our-work popups */
  size?: MobileFrameSize;
  className?: string;
  compactLoader?: boolean;
  previewPriority?: boolean;
  live?: boolean;
  iframeLoading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  showUrlInLoader?: boolean;
  minLoaderMs?: number;
  maxLoaderMs?: number;
  hideLoader?: boolean;
  shortLoader?: boolean;
  onLoadingChange?: (loading: boolean) => void;
}

/**
 * Reusable live vCard phone frame — 375px logical viewport inside the shell.
 * Used on Home (industries, portfolio) and Our Work.
 * Notch is rendered via CSS ::before / ::after on .vcard-phone-mockup (no extra divs).
 */
export const PhoneMockupFrame = forwardRef<HTMLDivElement, PhoneMockupFrameProps>(
  function PhoneMockupFrame(
    {
      src,
      title,
      previewImage,
      size = 'hero',
      className = '',
      compactLoader = false,
      live = true,
      iframeLoading = 'lazy',
      fetchPriority = 'auto',
      showUrlInLoader = false,
      minLoaderMs = 0,
      maxLoaderMs,
      hideLoader = false,
      shortLoader = false,
      onLoadingChange,
    },
    ref,
  ) {
    const styles = MOBILE_FRAME_SIZES[size];
    const showLive = live || !previewImage;

    return (
      <div
        ref={ref}
        className={`vcard-phone-mockup bg-neutral-950 border-neutral-800 relative z-10 flex flex-col overflow-hidden pointer-events-auto touch-auto mx-auto ${styles.shell} ${className}`}
        style={{ maxWidth: styles.maxWidth }}
      >
        <div
          className={`vcard-phone-screen w-full flex-1 min-h-0 bg-[#080808] ${styles.screen} overflow-hidden flex flex-col relative pointer-events-auto touch-auto`}
        >
          {showLive ? (
            <VCardIframeFrame
              src={src}
              title={title}
              compact={compactLoader}
              iframeLoading={iframeLoading}
              fetchPriority={fetchPriority}
              showUrlInLoader={showUrlInLoader}
              minLoaderMs={minLoaderMs}
              maxLoaderMs={maxLoaderMs}
              hideLoader={hideLoader}
              shortLoader={shortLoader}
              onLoadingChange={onLoadingChange}
            />
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
  },
);

/** Alias for clearer imports */
export const MobileVCardFrame = PhoneMockupFrame;
