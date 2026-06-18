'use client';

import type { CSSProperties, ReactNode } from 'react';

type SiteGlowIconProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  ariaLabel?: string;
  /** Outer width/height in px */
  size?: number;
  onClick?: () => void;
};

/** Icon / social button with gold glow border on hover. */
export function SiteGlowIcon({
  children,
  className = '',
  href,
  ariaLabel,
  size = 48,
  onClick,
}: SiteGlowIconProps) {
  const radius = size / 2;
  const shellStyle = {
    '--site-glow-radius': `${radius}px`,
    width: size,
    height: size,
  } as CSSProperties;

  const shell = (
    <div
      className={`site-glow-icon site-glow-card group shrink-0 ${className}`}
      style={shellStyle}
    >
      <div className="site-glow-card__border h-full w-full">
        <div className="site-glow-card__border-glow" aria-hidden="true" />
        <span className="site-glow-card__inner flex items-center justify-center h-full w-full text-brand-text-muted transition-colors group-hover:text-brand-gold">
          {children}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className="inline-flex" onClick={onClick}>
        {shell}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        aria-label={ariaLabel}
        className="inline-flex border-none bg-transparent p-0 cursor-pointer"
        onClick={onClick}
      >
        {shell}
      </button>
    );
  }

  return shell;
}
