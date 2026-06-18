'use client';

import type { ReactNode } from 'react';

interface VCardInteractiveLaneProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Isolated pointer/touch lane for embedded vCard iframes.
 * Stops Lenis + parent handlers from stealing events; no transform animations on this subtree.
 */
export function VCardInteractiveLane({ children, className = '', id }: VCardInteractiveLaneProps) {
  return (
    <div
      id={id}
      className={`vcard-interactive-lane vcard-iframe-zone pointer-events-auto relative z-20 touch-auto ${className}`}
      data-lenis-prevent
      data-lenis-prevent-touch
      data-lenis-prevent-wheel
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
