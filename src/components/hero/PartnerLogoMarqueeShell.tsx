'use client';

import { useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

const PartnerLogoMarquee = dynamic(
  () => import('@/components/hero/PartnerLogoMarquee').then((m) => ({ default: m.PartnerLogoMarquee })),
  { ssr: false },
);

/** SSR static logos first; swap to animated marquee after load when heights match. */
export function PartnerLogoMarqueeShell({ staticFallback }: { staticFallback: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setReady(true));
  }, []);

  return (
    <div className="partner-logo-marquee-shell relative w-full">
      <div
        className={
          ready
            ? 'partner-logo-marquee-static partner-logo-marquee-static--hidden'
            : 'partner-logo-marquee-static'
        }
        aria-hidden={ready}
      >
        {staticFallback}
      </div>
      {ready ? (
        <div className="partner-logo-marquee-animated">
          <PartnerLogoMarquee />
        </div>
      ) : null}
    </div>
  );
}
