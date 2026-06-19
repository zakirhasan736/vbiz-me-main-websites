'use client';

import { type Ref, useEffect, useRef, useState } from 'react';
import { PhoneMockupFrame, type PhoneMockupFrameProps } from '@/components/PhoneMockupFrame';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { MOBILE_FRAME_SIZES } from '@/lib/mobile-frame';

type DeferredPhoneMockupFrameProps = PhoneMockupFrameProps & {
  /** Wait until frame enters viewport (after site load). Default true. */
  requireInView?: boolean;
};

/**
 * Skeleton placeholder — same shell shape as the live frame.
 * Notch is painted via CSS ::before / ::after on .vcard-phone-mockup.
 */
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
    setReady(true);
  }, [siteLoaded, inView, ready, src]);

  if (!ready) {
    return <PhoneMockupPlaceholder size={size} rootRef={rootRef} />;
  }

  return <PhoneMockupFrame ref={rootRef} size={size} src={src} {...props} />;
}
