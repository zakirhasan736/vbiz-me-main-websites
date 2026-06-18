'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface VCardIframeFrameProps {
  src: string;
  title: string;
  className?: string;
  maxLoaderMs?: number;
  compact?: boolean;
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
}: VCardIframeFrameProps) {
  const [loading, setLoading] = useState(true);
  const activeSrcRef = useRef(src);

  useLayoutEffect(() => {
    activeSrcRef.current = src;
    setLoading(true);

    const fallback = window.setTimeout(() => {
      if (activeSrcRef.current === src) {
        setLoading(false);
      }
    }, maxLoaderMs);

    return () => window.clearTimeout(fallback);
  }, [src, maxLoaderMs]);

  const handleLoad = useCallback(() => {
    requestAnimationFrame(() => {
      if (activeSrcRef.current === src) {
        setLoading(false);
      }
    });
  }, [src]);

  return (
    <div
      className="vcard-iframe-shell relative w-full h-full min-h-0 flex-1 touch-auto pointer-events-auto overflow-hidden"
      data-lenis-prevent
      data-lenis-prevent-touch
      data-lenis-prevent-wheel
    >
      {loading && (
        <div
          className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center z-20 transition-opacity duration-150 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-9 h-9 rounded-full border-2 border-brand-gold/20 border-t-brand-gold animate-spin mb-3 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
          <span className="text-[10px] text-neutral-400 tracking-widest uppercase font-semibold">
            {compact ? 'Loading vCard...' : 'Loading Live vCard...'}
          </span>
        </div>
      )}
      <iframe
        key={src}
        src={src}
        className={`absolute inset-0 z-[1] w-full h-full border-0 pointer-events-auto touch-auto ${className}`}
        title={title}
        onLoad={handleLoad}
        loading="eager"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
      />
    </div>
  );
}
