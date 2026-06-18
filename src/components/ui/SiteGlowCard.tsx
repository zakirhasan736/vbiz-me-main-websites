'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useRef, useState } from 'react';

type SiteGlowCardProps = {
  children: ReactNode;
  className?: string;
  /** Corner radius in px — matches outer rounded class */
  radius?: number;
  glowColor?: string;
  onClick?: () => void;
};

const DEFAULT_GLOW = 'rgba(212, 175, 55, 0.22)';

/** Theme-aware card with mouse glow + integrated spinning gold border on hover. */
export function SiteGlowCard({
  children,
  className = '',
  radius = 16,
  glowColor = DEFAULT_GLOW,
  onClick,
}: SiteGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`site-glow-card group h-full ${onClick ? 'cursor-pointer' : ''}`}
      style={{ '--site-glow-radius': `${radius}px` } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="site-glow-card__border">
        <div className="site-glow-card__border-glow" aria-hidden="true" />
        <div className={`site-glow-card__inner ${className}`}>
          <div
            className="site-glow-card__mouse-glow"
            aria-hidden="true"
            style={{
              left: `${mouseCoords.x}px`,
              top: `${mouseCoords.y}px`,
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 68%)`,
            }}
          />
          <div className="site-glow-card__content">{children}</div>
        </div>
      </div>
    </div>
  );
}
