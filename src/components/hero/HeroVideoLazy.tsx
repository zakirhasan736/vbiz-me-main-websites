'use client';

import dynamic from 'next/dynamic';
import { HeroVideoSkeleton } from '@/components/hero/HeroVideoSkeleton';

const HeroVideoShowcase = dynamic(() => import('@/components/hero/HeroVideoShowcase'), {
  ssr: false,
  loading: () => <HeroVideoSkeleton />,
});

export function HeroVideoLazy() {
  return <HeroVideoShowcase />;
}
