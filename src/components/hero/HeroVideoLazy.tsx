'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeroVideoSkeleton } from '@/components/hero/HeroVideoSkeleton';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { FOUNDER_INTRO_VIDEO } from '@/lib/site-assets';
import { perfDebug } from '@/lib/performance-debug';

const HeroVideoShowcase = dynamic(() => import('@/components/hero/HeroVideoShowcase'), {
  ssr: false,
});

function preloadHeroVideo() {
  if (document.querySelector(`link[data-hero-video-preload="true"]`)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = FOUNDER_INTRO_VIDEO;
  link.setAttribute('data-hero-video-preload', 'true');
  document.head.appendChild(link);
}

export function HeroVideoLazy() {
  const [readyToLoad, setReadyToLoad] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => {
      preloadHeroVideo();

      // #region agent log
      perfDebug({
        hypothesisId: 'H3',
        runId: 'post-fix',
        location: 'HeroVideoLazy:deferredReady',
        message: 'Hero video chunk loading after site load + idle',
        data: {
          readyState: document.readyState,
          loadEventEnd: Math.round(
            (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)
              ?.loadEventEnd ?? 0,
          ),
        },
      });
      // #endregion
      setReadyToLoad(true);
    });
  }, []);

  if (!readyToLoad) {
    return <HeroVideoSkeleton />;
  }

  return <HeroVideoShowcase />;
}
