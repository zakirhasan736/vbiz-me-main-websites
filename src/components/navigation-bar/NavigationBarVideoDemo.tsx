'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSectionShouldReveal } from '@/components/animations/reveal';
import { SectionVideoPlayer } from '@/components/ui/SectionVideoPlayer';
import { NAVIGATION_BAR_VIDEO } from '@/lib/site-assets';

/** Nav bar demo — local MP4 with Safari-optimized playback controls. */
export function NavigationBarVideoDemo() {
  const pathname = usePathname();
  const sectionRevealed = useSectionShouldReveal();
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelInView, setPanelInView] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPanelInView(entry.isIntersecting),
      { rootMargin: '80px 0px', threshold: 0.22 },
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  const canPlay = sectionRevealed && panelInView;

  return (
    <div
      ref={panelRef}
      className="w-full rounded-[2rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 bg-brand-surface"
    >
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent pointer-events-none z-20" />

      <div className="relative aspect-video min-h-[220px] sm:min-h-[280px] bg-brand-deep">
        <SectionVideoPlayer
          key={`nav-bar-video-${pathname}`}
          src={NAVIGATION_BAR_VIDEO}
          ariaLabel="Scrolling navigation bar demo video"
          playWhenInView
          playbackEnabled={canPlay}
          autoplayAfterLoad={canPlay}
          objectFit="contain"
          className="absolute inset-0 h-full w-full"
        />

        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none z-10" />
      </div>

      <div className="px-4 py-3 border-t border-white/5 bg-brand-elevated/80 text-left">
        <p className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.18em] font-semibold mb-1">
          Live Navigation Preview
        </p>
        <p className="text-base text-neutral-400 font-light leading-relaxed">
          Scroll through tabs, portfolios, and CTAs — the same smooth bar your clients see on every vCard.
        </p>
      </div>
    </div>
  );
}
