'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { isWebKitBrowser } from '@/lib/scroll-config';

type CapabilityCardProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  glowColor?: string;
};

const TILT_VARIANTS = ['capability-card--tilt-left', 'capability-card--tilt-right', 'capability-card--tilt-forward'] as const;
const DEFAULT_GLOW = 'rgba(212, 175, 55, 0.22)';

export function CapabilityCard({
  children,
  className = '',
  index = 0,
  glowColor = DEFAULT_GLOW,
}: CapabilityCardProps) {
  const tiltClass = TILT_VARIANTS[index % TILT_VARIANTS.length];
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [skipMouseTracking, setSkipMouseTracking] = useState(false);

  useEffect(() => {
    setSkipMouseTracking(isWebKitBrowser());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (skipMouseTracking) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (skipMouseTracking) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMouseCoords({ x: rect.width / 2, y: rect.height / 2 });
    }
  };

  const innerStyle = {
    '--glow-x': `${mouseCoords.x}px`,
    '--glow-y': `${mouseCoords.y}px`,
    '--glow-opacity': isHovered ? 1 : 0,
    '--glow-color': glowColor,
  } as CSSProperties;

  return (
    <div
      className={`capability-card site-glow-card group ${tiltClass}`}
      style={
        {
          '--cap-delay': `${(index % 9) * 0.35}s`,
          '--site-glow-radius': '32px',
        } as CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="capability-card__flipper">
        <div className="site-glow-card__border capability-card__border">
          <div className="site-glow-card__border-glow" aria-hidden="true" />
          <div
            className={`site-glow-card__inner capability-card__inner ${className}`}
            style={innerStyle}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
