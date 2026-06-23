'use client';

import { type Ref, useEffect, useRef, useState } from 'react';
import { PhoneMockupFrame, type PhoneMockupFrameProps } from '@/components/PhoneMockupFrame';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { MOBILE_FRAME_SIZES } from '@/lib/mobile-frame';

type DeferredPhoneMockupFrameProps = PhoneMockupFrameProps & {
  /** Parent gate — when false the iframe is unmounted (e.g. user left the industries section). */
  enabled?: boolean;
  /** Wait until frame enters viewport (after site load). Default true. */
  requireInView?: boolean;
  /** Skip waiting for window load — use when parent already gates visibility (e.g. industries section). */
  skipSiteLoadDefer?: boolean;
};

function PhoneMockupPlaceholder({
  size = 'hero',
  rootRef,
}: {
  size?: PhoneMockupFrameProps['size'];
  rootRef: Ref<HTMLDivElement>;
}) {
  const styles = MOBILE_FRAME_SIZES[size ?? 'hero'];

  return (
    <div
      ref={rootRef}
      className={`vcard-phone-mockup bg-neutral-950 border border-neutral-800 relative z-10 flex flex-col overflow-hidden pointer-events-none mx-auto ${styles.shell}`}
      style={{ maxWidth: styles.maxWidth }}
      aria-hidden="true"
    >
      <div className={`vcard-phone-screen w-full flex-1 min-h-[420px] bg-[#080808] ${styles.screen}`} />
    </div>
  );
}

/** Live vCard phone frame — mounts iframe only when enabled (+ site load / in-view). */
export function DeferredPhoneMockupFrame({
  enabled = true,
  requireInView = true,
  skipSiteLoadDefer = false,
  size = 'hero',
  src,
  ...props
}: DeferredPhoneMockupFrameProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [siteLoaded, setSiteLoaded] = useState(skipSiteLoadDefer);
  const [inView, setInView] = useState(!requireInView);

  useEffect(() => {
    if (skipSiteLoadDefer) {
      setSiteLoaded(true);
      return;
    }
    scheduleAfterSiteLoad(() => setSiteLoaded(true));
  }, [skipSiteLoadDefer]);

  useEffect(() => {
    if (!requireInView) return;

    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '160px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [requireInView]);

  const canLoadIframe = enabled && siteLoaded && src.trim().length > 0 && (!requireInView || inView);

  if (!canLoadIframe) {
    return <PhoneMockupPlaceholder size={size} rootRef={rootRef} />;
  }

  return (
    <PhoneMockupFrame
      ref={rootRef}
      key={src}
      size={size}
      src={src}
      {...props}
    />
  );
}

export { PhoneMockupPlaceholder };
