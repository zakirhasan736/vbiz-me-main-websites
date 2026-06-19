'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';

type LiveAgentComponent = ComponentType<{
  initialOpen?: boolean;
  autoConnect?: boolean;
}>;

/**
 * Keeps @google/genai off the critical path, then mounts the agent once the page has loaded.
 */
export function LazyLiveAgentLauncher() {
  const [LiveAgent, setLiveAgent] = useState<LiveAgentComponent | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const mountAgent = () => {
      if (cancelled || mountedRef.current) return;
      mountedRef.current = true;

      void import('@/components/LiveAgent').then((module) => {
        if (!cancelled) {
          setLiveAgent(() => module.LiveAgent);
        }
      });
    };

    scheduleAfterSiteLoad(mountAgent);

    return () => {
      cancelled = true;
    };
  }, []);

  if (!LiveAgent) {
    return null;
  }

  return <LiveAgent initialOpen autoConnect />;
}
