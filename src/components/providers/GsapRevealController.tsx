'use client';

import { usePathname } from 'next/navigation';
import { usePageTransition } from '@/components/providers/page-transition-context';
import { useGsapReveal } from '@/hooks/use-gsap-reveal';

export function GsapRevealController() {
  const pathname = usePathname();
  const { revealReady, animationKey } = usePageTransition();
  const routeKey = revealReady ? `${pathname ?? '/'}-${animationKey}` : undefined;

  useGsapReveal(routeKey);
  return null;
}
