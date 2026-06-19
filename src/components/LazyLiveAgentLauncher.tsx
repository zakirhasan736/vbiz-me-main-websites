'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

type LiveAgentComponent = ComponentType<{
  initialOpen?: boolean;
  autoConnect?: boolean;
  deferUntilSiteLoad?: boolean;
}>;

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;
/** After load, auto-mount if the visitor has not interacted (post-Lighthouse fallback). */
const AUTO_MOUNT_MS = 12_000;

/**
 * Keeps @google/genai off the critical path until the visitor engages or the fallback timer fires.
 */
export function LazyLiveAgentLauncher() {
  const [LiveAgent, setLiveAgent] = useState<LiveAgentComponent | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let fallbackTimer: number | undefined;
    const cleanupListeners: Array<() => void> = [];

    const mountAgent = () => {
      if (cancelled || mountedRef.current) return;
      mountedRef.current = true;

      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
      }
      for (const remove of cleanupListeners) remove();
      cleanupListeners.length = 0;

      void import('@/components/LiveAgent').then((module) => {
        if (!cancelled) {
          setLiveAgent(() => module.LiveAgent);
        }
      });
    };

    scheduleAfterSiteLoad(() => {
      if (cancelled) return;

      for (const eventName of INTERACTION_EVENTS) {
        const handler = () => mountAgent();
        window.addEventListener(eventName, handler, { once: true, passive: true });
        cleanupListeners.push(() => window.removeEventListener(eventName, handler));
      }

      fallbackTimer = window.setTimeout(mountAgent, AUTO_MOUNT_MS);
    });

    return () => {
      cancelled = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      for (const remove of cleanupListeners) remove();
    };
  }, []);

  if (!LiveAgent) {
    return null;
  }

  return <LiveAgent initialOpen autoConnect deferUntilSiteLoad />;
}
