'use client';

import { useEffect } from 'react';
import { getImageResourcesBeforeLoad, perfDebug, wasResourceFetched } from '@/lib/performance-debug';

/** Session-only runtime monitor for SSR/CSR + image load timing. */
export function PerformanceDebugMonitor() {
  useEffect(() => {
    perfDebug({
      hypothesisId: 'H4',
      location: 'PerformanceDebugMonitor:mount',
      message: 'Client hydrated',
      data: {
        readyState: document.readyState,
        pathname: window.location.pathname,
        hasNextData: !!document.getElementById('__NEXT_DATA__'),
        lcpCtaVisible: (() => {
          const el = document.querySelector('.hero-primary-cta');
          if (!el) return null;
          const style = getComputedStyle(el);
          return { opacity: style.opacity, visibility: style.visibility };
        })(),
      },
    });

    const onLoad = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const loadEnd = nav?.loadEventEnd ?? performance.now();
      const images = getImageResourcesBeforeLoad();
      const competitiveOnLoad = wasResourceFetched('Competative-Analysis');
      const portfolioImages = images.filter((img) => img.url.includes('/portfolio/'));
      const heroVideo = performance
        .getEntriesByType('resource')
        .find((entry) => /\.(mp4|webm)(\?|$)/i.test(entry.name));

      const vcardIframeEarly = performance
        .getEntriesByType('resource')
        .some((entry) => entry.name.includes('app.vbizme.com') && entry.startTime < loadEnd);

      perfDebug({
        hypothesisId: 'H1',
        location: 'PerformanceDebugMonitor:window.load',
        message: 'Window load — image audit',
        data: {
          competitiveAnalysisFetchedBeforeAudit: competitiveOnLoad,
          vcardIframeFetchedBeforeLoad: vcardIframeEarly,
          totalImages: images.length,
          portfolioImagesEarly: portfolioImages.length,
          heroVideoFetched: !!heroVideo,
          heroVideoStartMs: heroVideo ? Math.round(heroVideo.startTime) : null,
          earlyImages: images.slice(0, 12).map((img) => ({
            name: img.name,
            startMs: img.startTime,
          })),
        },
      });

      perfDebug({
        hypothesisId: 'H3',
        location: 'PerformanceDebugMonitor:window.load',
        message: 'Post-load idle checkpoint',
        data: {
          loadEventEnd: Math.round(
            (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.loadEventEnd ?? 0,
          ),
          domContentLoaded: Math.round(
            (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.domContentLoadedEventEnd ?? 0,
          ),
        },
      });

      const imgsMissingDims = Array.from(document.querySelectorAll('img')).filter((img) => {
        const w = img.getAttribute('width');
        const h = img.getAttribute('height');
        return !w || !h;
      });

      perfDebug({
        hypothesisId: 'H5',
        runId: 'post-fix',
        location: 'PerformanceDebugMonitor:window.load',
        message: 'Image width/height audit',
        data: {
          totalImgTags: document.querySelectorAll('img').length,
          missingDimensions: imgsMissingDims.length,
          samples: imgsMissingDims.slice(0, 8).map((img) => ({
            src: (img.getAttribute('src') ?? '').split('/').pop(),
            alt: img.getAttribute('alt'),
          })),
        },
      });
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => window.removeEventListener('load', onLoad);
  }, []);

  return null;
}
