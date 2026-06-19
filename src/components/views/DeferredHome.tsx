'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

const Home = dynamic(() => import('@/components/views/Home'), {
  ssr: false,
});

export function DeferredHome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return <Home />;
}
