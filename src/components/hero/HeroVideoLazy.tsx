'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeroVideoSkeleton } from '@/components/hero/HeroVideoSkeleton';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

const HeroVideoShowcase = dynamic(() => import('@/components/hero/HeroVideoShowcase'), {
  ssr: false,
});

export function HeroVideoLazy() {
  const [readyToLoad, setReadyToLoad] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setReadyToLoad(true));
  }, []);

  if (!readyToLoad) {
    return <HeroVideoSkeleton />;
  }

  return <HeroVideoShowcase />;
}
