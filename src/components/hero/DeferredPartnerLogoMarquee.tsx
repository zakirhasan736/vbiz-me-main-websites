'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

const PartnerLogoMarquee = dynamic(
  () => import('@/components/hero/PartnerLogoMarquee').then((m) => ({ default: m.PartnerLogoMarquee })),
  { ssr: false, loading: () => <div className="h-14 md:h-16" aria-hidden="true" /> },
);

/** Partner logos — deferred until after site load to protect LCP / initial bandwidth. */
export function DeferredPartnerLogoMarquee() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setReady(true));
  }, []);

  if (!ready) {
    return <div className="h-14 md:h-16 w-full" aria-hidden="true" />;
  }

  return <PartnerLogoMarquee />;
}
