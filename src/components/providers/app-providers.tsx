'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LiveAgent } from '@/components/LiveAgent';
import { PageTransitionOverlay } from '@/components/PageTransitionOverlay';
import { PageTransitionProvider, usePageTransition } from '@/components/providers/page-transition-context';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { PerformanceDebugMonitor } from '@/components/debug/PerformanceDebugMonitor';
import { useGsapReveal } from '@/hooks/use-gsap-reveal';

function GsapRevealController() {
  const pathname = usePathname();
  const { revealReady, animationKey } = usePageTransition();
  const routeKey = revealReady ? `${pathname ?? '/'}-${animationKey}` : undefined;

  useGsapReveal(routeKey);
  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PageTransitionProvider>
        <SmoothScrollProvider>
          <PerformanceDebugMonitor />
          <div className="min-h-screen overflow-x-hidden bg-brand-dark font-sans selection:bg-brand-gold selection:text-brand-dark transition-colors duration-500">
            <GsapRevealController />
            <Navbar />
            <main className="overflow-hidden">
              <PageTransitionOverlay>{children}</PageTransitionOverlay>
            </main>
            <Footer />
            <LiveAgent />
          </div>
        </SmoothScrollProvider>
      </PageTransitionProvider>
    </ThemeProvider>
  );
}
