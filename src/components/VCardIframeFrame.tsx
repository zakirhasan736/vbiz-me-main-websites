'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { VCARD_IFRAME_ALLOW } from '@/lib/vcard-mobile-loader';

interface VCardIframeFrameProps {
  src: string;
  title: string;
  className?: string;
  maxLoaderMs?: number;
  /** Keep loader visible at least this long after iframe load (0 = hide immediately). */
  minLoaderMs?: number;
  compact?: boolean;
  iframeLoading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  showUrlInLoader?: boolean;
  /** When true, iframe loads without the spinner overlay (e.g. silent preload). */
  hideLoader?: boolean;
  /** Compact loader — spinner + one line, no URL (mobile popups). */
  shortLoader?: boolean;
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
  maxLoaderMs = 8000,
  minLoaderMs = 0,
  compact = false,
  iframeLoading = 'lazy',
  fetchPriority = 'auto',
  showUrlInLoader = false,
  hideLoader = false,
  shortLoader = false,
  onLoadingChange,
}: VCardIframeFrameProps) {
  const [showLoader, setShowLoader] = useState(() => !hideLoader && src.trim().length > 0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const activeSrcRef = useRef(src);
  const mountTimeRef = useRef(0);
  const hideTimerRef = useRef<number | null>(null);
  const loadedSrcRef = useRef<string | null>(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const finishLoading = useCallback(() => {
    if (activeSrcRef.current !== src) return;

    loadedSrcRef.current = src;

    if (hideLoader) {
      onLoadingChange?.(false);
      return;
    }

    const elapsed = Date.now() - mountTimeRef.current;
    const delay = Math.max(0, minLoaderMs - elapsed);

    clearHideTimer();

    const hide = () => {
      if (activeSrcRef.current !== src) return;
      setShowLoader(false);
      onLoadingChange?.(false);
    };

    if (delay === 0) {
      hide();
    } else {
      hideTimerRef.current = window.setTimeout(hide, delay);
    }
  }, [hideLoader, minLoaderMs, onLoadingChange, src]);

  useLayoutEffect(() => {
    if (!src.trim()) {
      clearHideTimer();
      setShowLoader(false);
      onLoadingChange?.(false);
      activeSrcRef.current = src;
      return;
    }

    activeSrcRef.current = src;
    clearHideTimer();

    const needsLoad = loadedSrcRef.current !== src;

    if (hideLoader) {
      setShowLoader(false);
      if (needsLoad) {
        onLoadingChange?.(true);
      }
    } else {
      mountTimeRef.current = Date.now();
      setShowLoader(true);
      onLoadingChange?.(true);
    }

    const fallback = window.setTimeout(() => {
      if (activeSrcRef.current === src) {
        setShowLoader(false);
        onLoadingChange?.(false);
        loadedSrcRef.current = src;
      }
    }, maxLoaderMs);

    return () => {
      window.clearTimeout(fallback);
      clearHideTimer();
    };
  }, [hideLoader, maxLoaderMs, onLoadingChange, src]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !src.trim()) return;

    const onLoad = () => finishLoading();
    iframe.addEventListener('load', onLoad);

    return () => iframe.removeEventListener('load', onLoad);
  }, [finishLoading, src]);

  const bindIframeRef = useCallback(
    (node: HTMLIFrameElement | null) => {
      iframeRef.current = node;
      if (!node || fetchPriority === 'auto') return;
      node.setAttribute('fetchpriority', fetchPriority);
    },
    [fetchPriority],
  );

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
    <div className="vcard-iframe-shell absolute inset-0 h-full w-full min-h-0 touch-auto pointer-events-auto overflow-hidden">
      {showLoader && !hideLoader && src.trim().length > 0 && (
        <div
          className="vcard-iframe-loader pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#080808] px-4"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${title}`}
        >
          <div
            className={`animate-spin rounded-full border-2 border-brand-gold/25 border-t-brand-gold shadow-[0_0_18px_rgba(212,175,55,0.35)] ${
              shortLoader ? 'mb-2.5 h-9 w-9' : 'mb-3 h-11 w-11'
            }`}
          />
          <span
            className={`font-semibold uppercase tracking-widest text-white ${
              shortLoader ? 'text-[10px]' : 'text-[11px]'
            }`}
          >
            {compact || shortLoader ? 'Loading vCard…' : 'Loading live vCard…'}
          </span>
          {!shortLoader && showUrlInLoader ? (
            <span className="mt-2.5 max-w-[240px] break-all text-center font-mono text-[10px] leading-snug text-brand-gold">
              {loaderUrlLabel}
            </span>
          ) : null}
          {!shortLoader ? (
            <span className="mt-3 text-sm font-light text-neutral-500">Please wait…</span>
          ) : null}
        </div>
      )}
      {src.trim().length > 0 ? (
        <iframe
          key={src}
          ref={bindIframeRef}
          src={src}
          className={`absolute inset-0 z-[1] h-full w-full border-0 pointer-events-auto touch-auto ${className}`}
          title={title}
          onLoad={() => finishLoading()}
          loading={iframeLoading}
          allow={VCARD_IFRAME_ALLOW}
        />
      ) : null}
    </div>
  );
}
