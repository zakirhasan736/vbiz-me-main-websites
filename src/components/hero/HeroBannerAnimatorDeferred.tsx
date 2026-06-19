'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

const HeroBannerAnimator = dynamic(
  () => import('@/components/hero/HeroBannerAnimator').then((mod) => ({ default: mod.HeroBannerAnimator })),
  { ssr: false },
);

/** Defers GSAP hero timeline until after site load so LCP text can paint first. */
export function HeroBannerAnimatorDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return <HeroBannerAnimator />;
}
