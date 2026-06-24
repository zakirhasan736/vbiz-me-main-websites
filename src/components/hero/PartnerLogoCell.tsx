'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';
import { PARTNER_LOGO_MOBILE_HEIGHT, PARTNER_LOGO_MOBILE_WIDTH } from '@/lib/partner-logos';
import { usePartnerMarqueeLoad } from '@/components/hero/partner-marquee-load-context';

type PartnerLogo = {
  src: string;
  alt: string;
};

type PartnerLogoCellProps = {
  logo: PartnerLogo;
  duplicate?: boolean;
  viewportRef: RefObject<HTMLDivElement | null>;
  cellClassName?: string;
  logoClassName?: string;
};

/** Loads each logo once when its cell enters the slider viewport. */
export function PartnerLogoCell({
  logo,
  duplicate,
  viewportRef,
  cellClassName = 'partner-logo-marquee__cell',
  logoClassName = 'partner-logo-marquee__logo',
}: PartnerLogoCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { marqueeActive, allLogosReady, onLogoLoaded } = usePartnerMarqueeLoad();

  useEffect(() => {
    if (hasLoaded || allLogosReady || !marqueeActive) return;

    const cell = cellRef.current;
    const root = viewportRef.current;
    if (!cell || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true);
          onLogoLoaded(logo.src);
          observer.disconnect();
        }
      },
      { root, rootMargin: '64px 0px', threshold: 0 },
    );

    observer.observe(cell);
    return () => observer.disconnect();
  }, [allLogosReady, hasLoaded, logo.src, marqueeActive, onLogoLoaded, viewportRef]);

  return (
    <div
      ref={cellRef}
      className={cellClassName}
      aria-hidden={duplicate || undefined}
    >
      {hasLoaded ? (
        <img
          src={logo.src}
          alt={duplicate ? '' : logo.alt}
          width={PARTNER_LOGO_MOBILE_WIDTH}
          height={PARTNER_LOGO_MOBILE_HEIGHT}
          className={logoClassName}
          decoding="async"
          fetchPriority="low"
          draggable={false}
        />
      ) : null}
    </div>
  );
}

export function PartnerLogoPlaceholderCell() {
  return <div className="partner-logo-marquee__cell partner-logo-marquee__cell--placeholder" aria-hidden="true" />;
}
