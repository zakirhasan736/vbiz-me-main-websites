'use client';

import type { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LazyLiveAgentLauncher } from '@/components/LazyLiveAgentLauncher';
import { PageTransitionOverlay } from '@/components/PageTransitionOverlay';
import { PageTransitionProvider } from '@/components/providers/page-transition-context';
import { SafariPerfBoot } from '@/components/providers/safari-perf-boot';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SafariPerfBoot />
      <PageTransitionProvider>
        <SmoothScrollProvider>
          <div className="min-h-screen overflow-x-clip bg-brand-dark font-sans selection:bg-brand-gold selection:text-brand-dark">
            <Navbar />
            <main className="overflow-x-clip">
              <PageTransitionOverlay>{children}</PageTransitionOverlay>
            </main>
            <Footer />
            <LazyLiveAgentLauncher />
          </div>
        </SmoothScrollProvider>
      </PageTransitionProvider>
    </ThemeProvider>
  );
}
