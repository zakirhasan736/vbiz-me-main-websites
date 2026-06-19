'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import {
  animateGSAPReveal,
  GSAP_CONSTANTS,
  GSAP_DEFAULT_START,
} from '@/lib/gsap-animation-utils';
import { usePageTransition } from '@/components/providers/page-transition-context';

type CapabilityCardProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  glowColor?: string;
  reveal?: {
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
  };
};

const TILT_VARIANTS = ['capability-card--tilt-left', 'capability-card--tilt-right', 'capability-card--tilt-forward'] as const;
const DEFAULT_GLOW = 'rgba(212, 175, 55, 0.22)';

export function CapabilityCard({
  children,
  className = '',
  index = 0,
  glowColor = DEFAULT_GLOW,
  reveal,
}: CapabilityCardProps) {
  const tiltClass = TILT_VARIANTS[index % TILT_VARIANTS.length];
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { revealReady, animationKey } = usePageTransition();

  useGSAP(
    () => {
      if (!reveal || !revealReady || !cardRef.current) return;

      animateGSAPReveal(cardRef.current, {
        direction: reveal.direction ?? 'up',
        delay: reveal.delay ?? 0,
        distance: GSAP_CONSTANTS.DISTANCE,
        duration: GSAP_CONSTANTS.DURATION,
        ease: GSAP_CONSTANTS.EASE,
        blur: GSAP_CONSTANTS.BLUR,
        start: GSAP_DEFAULT_START,
      });
    },
    {
      scope: cardRef,
      dependencies: [reveal?.direction, reveal?.delay, revealReady, animationKey],
    },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const innerStyle = {
    '--glow-x': `${mouseCoords.x}px`,
    '--glow-y': `${mouseCoords.y}px`,
    '--glow-opacity': isHovered ? 1 : 0,
    '--glow-color': glowColor,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      data-reveal-card={reveal ? true : undefined}
      className={`capability-card site-glow-card group ${tiltClass}`}
      style={
        {
          '--cap-delay': `${(index % 9) * 0.35}s`,
          '--site-glow-radius': '32px',
          ...(reveal ? { opacity: 0 } : {}),
        } as CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
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
