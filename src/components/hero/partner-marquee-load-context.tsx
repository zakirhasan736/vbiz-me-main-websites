'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { PARTNER_LOGOS } from '@/lib/partner-logos';

type PartnerMarqueeLoadContextValue = {
  marqueeActive: boolean;
  allLogosReady: boolean;
  onLogoLoaded: (src: string) => void;
};

const PartnerMarqueeLoadContext = createContext<PartnerMarqueeLoadContextValue>({
  marqueeActive: false,
  allLogosReady: false,
  onLogoLoaded: () => {},
});

export function PartnerMarqueeLoadProvider({
  children,
  marqueeActive,
}: {
  children: ReactNode;
  marqueeActive: boolean;
}) {
  const loadedRef = useRef(new Set<string>());
  const [allLogosReady, setAllLogosReady] = useState(false);

  const onLogoLoaded = useCallback((src: string) => {
    loadedRef.current.add(src);
    if (loadedRef.current.size >= PARTNER_LOGOS.length) {
      setAllLogosReady(true);
    }
  }, []);

  return (
    <PartnerMarqueeLoadContext.Provider value={{ marqueeActive, allLogosReady, onLogoLoaded }}>
      {children}
    </PartnerMarqueeLoadContext.Provider>
  );
}

export function usePartnerMarqueeLoad() {
  return useContext(PartnerMarqueeLoadContext);
}
