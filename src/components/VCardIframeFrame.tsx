'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface VCardIframeFrameProps {
  src: string;
  title: string;
  className?: string;
  maxLoaderMs?: number;
  compact?: boolean;
  iframeLoading?: 'lazy' | 'eager';
  showUrlInLoader?: boolean;
}

/**
 * Live vCard iframe — no transform on ancestors (transform breaks clicks in WebKit).
 * Fills the phone screen; shell width targets ~375px via PhoneMockupFrame.
 */
export function VCardIframeFrame({
  src,
  title,
  className = 'border-0 bg-brand-deep',
  maxLoaderMs = 6000,
  compact = false,
  iframeLoading = 'lazy',
  showUrlInLoader = false,
}: VCardIframeFrameProps) {
  const [showLoader, setShowLoader] = useState(true);
  const activeSrcRef = useRef(src);

  useLayoutEffect(() => {
    activeSrcRef.current = src;
    setShowLoader(true);

    const fallback = window.setTimeout(() => {
      if (activeSrcRef.current === src) {
        setShowLoader(false);
      }
    }, maxLoaderMs);

    return () => window.clearTimeout(fallback);
  }, [src, maxLoaderMs]);

  const handleLoad = useCallback(() => {
    requestAnimationFrame(() => {
      if (activeSrcRef.current === src) {
        setShowLoader(false);
      }
    });
  }, [src]);

  const loaderUrlLabel = (() => {
    try {
      const url = new URL(src);
      const path =
        url.pathname.length > 28 ? `${url.pathname.slice(0, 26)}…` : url.pathname;
      return `${url.host}${path}`;
    } catch {
      return src;
    }
  })();

  return (
    <div
      className="vcard-iframe-shell relative w-full h-full min-h-0 flex-1 touch-auto pointer-events-auto overflow-hidden"
      data-lenis-prevent
      data-lenis-prevent-touch
      data-lenis-prevent-wheel
    >
      {showLoader && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${title}`}
        >
          <div className="mb-3 h-10 w-10 animate-spin rounded-full border-2 border-brand-gold/20 border-t-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-200">
            {compact ? 'Loading vCard…' : 'Loading live vCard…'}
          </span>
          {showUrlInLoader ? (
            <span className="mt-2 max-w-[220px] break-all text-center font-mono text-[9px] leading-snug text-brand-gold/75">
              {loaderUrlLabel}
            </span>
          ) : null}
        </div>
      )}
      <iframe
        key={src}
        src={src}
        className={`absolute inset-0 z-[1] w-full h-full border-0 pointer-events-auto touch-auto ${className}`}
        title={title}
        onLoad={handleLoad}
        loading={iframeLoading}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
      />
    </div>
  );
}
