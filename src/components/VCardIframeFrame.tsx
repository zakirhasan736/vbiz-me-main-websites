'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface VCardIframeFrameProps {
  src: string;
  title: string;
  className?: string;
  maxLoaderMs?: number;
  /** Keep loader visible at least this long so users notice it on fast/cached loads. */
  minLoaderMs?: number;
  compact?: boolean;
  iframeLoading?: 'lazy' | 'eager';
  showUrlInLoader?: boolean;
  onLoadingChange?: (loading: boolean) => void;
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
  minLoaderMs = 0,
  compact = false,
  iframeLoading = 'lazy',
  showUrlInLoader = false,
  onLoadingChange,
}: VCardIframeFrameProps) {
  const [showLoader, setShowLoader] = useState(true);
  const activeSrcRef = useRef(src);
  const mountTimeRef = useRef(0);
  const hideTimerRef = useRef<number | null>(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const scheduleHideLoader = useCallback(() => {
    clearHideTimer();
    const elapsed = Date.now() - mountTimeRef.current;
    const delay = Math.max(0, minLoaderMs - elapsed);

    hideTimerRef.current = window.setTimeout(() => {
      if (activeSrcRef.current === src) {
        setShowLoader(false);
      }
    }, delay);
  }, [minLoaderMs, src]);

  useLayoutEffect(() => {
    if (!src.trim()) {
      clearHideTimer();
      setShowLoader(false);
      return;
    }

    activeSrcRef.current = src;
    mountTimeRef.current = Date.now();
    clearHideTimer();
    setShowLoader(true);

    const fallback = window.setTimeout(() => {
      if (activeSrcRef.current === src) {
        setShowLoader(false);
      }
    }, maxLoaderMs);

    return () => {
      window.clearTimeout(fallback);
      clearHideTimer();
    };
  }, [src, maxLoaderMs]);

  useEffect(() => {
    onLoadingChange?.(showLoader);
  }, [showLoader, onLoadingChange]);

  const handleLoad = useCallback(() => {
    if (activeSrcRef.current !== src) return;
    scheduleHideLoader();
  }, [scheduleHideLoader, src]);

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
      className="vcard-iframe-shell absolute inset-0 h-full w-full min-h-0 touch-auto pointer-events-auto overflow-hidden"
    >
      {showLoader && src.trim().length > 0 && (
        <div
          className="vcard-iframe-loader absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#080808] px-4"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${title}`}
        >
          <div className="mb-3 h-11 w-11 animate-spin rounded-full border-2 border-brand-gold/25 border-t-brand-gold shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white">
            {compact ? 'Loading vCard…' : 'Loading live vCard…'}
          </span>
          {showUrlInLoader ? (
            <span className="mt-2.5 max-w-[240px] break-all text-center font-mono text-[10px] leading-snug text-brand-gold">
              {loaderUrlLabel}
            </span>
          ) : null}
          <span className="mt-3 text-sm font-light text-neutral-500">Please wait…</span>
        </div>
      )}
      {src.trim().length > 0 ? (
        <iframe
          key={src}
          src={src}
          className={`absolute inset-0 z-[1] h-full w-full border-0 pointer-events-auto touch-auto ${className} ${
            showLoader ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          title={title}
          onLoad={handleLoad}
          loading={iframeLoading}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
        />
      ) : null}
    </div>
  );
}
