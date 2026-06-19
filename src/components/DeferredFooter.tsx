'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

const Footer = dynamic(() => import('@/components/Footer').then((module) => module.Footer), {
  ssr: false,
});

export function DeferredFooter() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    scheduleAfterSiteLoad(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return <Footer />;
}
