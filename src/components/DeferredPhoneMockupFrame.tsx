'use client';

import { useEffect, useRef, useState } from 'react';
import { PhoneMockupFrame, type PhoneMockupFrameProps } from '@/components/PhoneMockupFrame';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { MOBILE_FRAME_SIZES } from '@/lib/mobile-frame';
import { perfDebug } from '@/lib/performance-debug';

type DeferredPhoneMockupFrameProps = PhoneMockupFrameProps & {
  /** Wait until frame enters viewport (after site load). Default true. */
  requireInView?: boolean;
};

function PhoneMockupPlaceholder({ size = 'hero' }: { size?: PhoneMockupFrameProps['size'] }) {
  const styles = MOBILE_FRAME_SIZES[size ?? 'hero'];

  return (
    <div
      className={`vcard-phone-mockup bg-neutral-950 border border-neutral-800 relative z-10 flex flex-col overflow-hidden pointer-events-none mx-auto ${styles.shell}`}
      style={{ maxWidth: styles.maxWidth }}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-x-0 mx-auto bg-brand-deep ${styles.notch} z-20 flex items-center justify-center pointer-events-none`}
      >
        <div className={`${styles.notchBar} bg-neutral-800 rounded-full opacity-60`} />
      </div>
      <div className={`vcard-phone-screen w-full flex-1 min-h-[420px] bg-[#080808] ${styles.screen} animate-pulse`} />
    </div>
  );
}

/** Live vCard phone frame — mounts iframe only after site load (+ optional in-view). */
export function DeferredPhoneMockupFrame({
  requireInView = true,
  size = 'hero',
  src,
  ...props
}: DeferredPhoneMockupFrameProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [siteLoaded, setSiteLoaded] = useState(false);
  const [inView, setInView] = useState(!requireInView);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setSiteLoaded(true));
  }, []);

  useEffect(() => {
    if (!requireInView) return;

    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '160px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [requireInView]);

  useEffect(() => {
    if (!siteLoaded || !inView || ready) return;

    // #region agent log
    perfDebug({
      hypothesisId: 'H6',
      runId: 'post-fix',
      location: 'DeferredPhoneMockupFrame:activate',
      message: 'Industry live vCard iframe activating',
      data: {
        src,
        siteLoaded,
        inView,
        readyState: document.readyState,
      },
    });
    // #endregion

    setReady(true);
  }, [siteLoaded, inView, ready, src]);

  if (!ready) {
    return (
      <div ref={rootRef} className="w-full">
        <PhoneMockupPlaceholder size={size} />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="w-full">
      <PhoneMockupFrame size={size} src={src} {...props} />
    </div>
  );
}
