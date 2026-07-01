'use client';

import type { ReactNode } from 'react';

interface VCardInteractiveLaneProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Isolated pointer/touch lane for embedded vCard iframes.
 */
export function VCardInteractiveLane({ children, className = '', id }: VCardInteractiveLaneProps) {
  return (
    <div
      id={id}
      className={`vcard-interactive-lane vcard-iframe-zone pointer-events-auto relative z-20 ${className}`}
    >
      {children}
    </div>
  );
}
