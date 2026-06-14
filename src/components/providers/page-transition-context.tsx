'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type PageTransitionContextValue = {
  revealReady: boolean;
  animationKey: number;
  notifyCoverStart: () => void;
  notifyRevealComplete: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [revealReady, setRevealReady] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const notifyCoverStart = useCallback(() => {
    setRevealReady(false);
  }, []);

  const notifyRevealComplete = useCallback(() => {
    setRevealReady(true);
    setAnimationKey((key) => key + 1);
  }, []);

  const value = useMemo(
    () => ({
      revealReady,
      animationKey,
      notifyCoverStart,
      notifyRevealComplete,
    }),
    [revealReady, animationKey, notifyCoverStart, notifyRevealComplete],
  );

  return (
    <PageTransitionContext.Provider value={value}>{children}</PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    return {
      revealReady: true,
      animationKey: 0,
      notifyCoverStart: () => {},
      notifyRevealComplete: () => {},
    };
  }
  return context;
}
