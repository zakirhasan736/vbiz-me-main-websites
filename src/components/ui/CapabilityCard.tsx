'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useRef, useState } from 'react';

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
      className={`capability-card site-glow-card group ${tiltClass}`}
      style={{ '--cap-delay': `${(index % 9) * 0.35}s`, '--site-glow-radius': '32px' } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="capability-card__scene">
        <div className="capability-card__flipper">
          <div className="site-glow-card__border capability-card__border">
            <div className="site-glow-card__border-glow" aria-hidden="true" />
            <div className={`site-glow-card__inner capability-card__inner ${className}`}>
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
              <div className="capability-card__shine" aria-hidden="true" />
              <div className="site-glow-card__content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}