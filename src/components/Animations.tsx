'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GSAP_DEFAULT_START } from '@/lib/gsap-animation-utils';

gsap.registerPlugin(ScrollTrigger);

interface GsapRevealProps {
  children: React.ReactNode;
  className?: string; // Additional classes
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
}

export const GsapReveal: React.FC<GsapRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 1, 
  y = 50,
  blur = true
}) => {
  const comp = useRef(null);

  useGSAP(() => {
    gsap.fromTo(comp.current, 
      { 
        opacity: 0, 
        y: y,
        filter: blur ? 'blur(10px)' : 'none',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: comp.current,
          start: GSAP_DEFAULT_START,
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: comp });

  return (
    <div ref={comp} className={className}>
      {children}
    </div>
  );
};
