'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';
import { usePageTransition } from '@/components/providers/page-transition-context';

/**
 * Scroll reveal for embedded iframes — opacity only.
 * Do NOT use transform/filter on iframe ancestors (breaks clicks in WebKit).
 */
export function InteractiveReveal({
  children,
  className = '',
  id = '',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { revealReady, animationKey } = usePageTransition();

  useGSAP(
    () => {
      if (!revealReady || !ref.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.88,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: GSAP_DEFAULT_START,
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [revealReady, animationKey] },
  );

  return (
    <div
      ref={ref}
      id={id}
      className={`vcard-iframe-zone pointer-events-auto ${className}`}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
