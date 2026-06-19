'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { scheduleAfterSiteLoad } from '@/lib/deferred-load';
import { LIVE_AGENT_AVATAR } from '@/lib/site-assets';

type LiveAgentComponent = ComponentType<{
  initialOpen?: boolean;
  autoConnect?: boolean;
}>;

export function LazyLiveAgentLauncher() {
  const [LiveAgent, setLiveAgent] = useState<LiveAgentComponent | null>(null);

  useEffect(() => {
    let cancelled = false;

    scheduleAfterSiteLoad(() => {
      if (cancelled) return;
      void import('@/components/LiveAgent').then((module) => {
        if (!cancelled) {
          setLiveAgent(() => module.LiveAgent);
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (LiveAgent) {
    return <LiveAgent initialOpen autoConnect />;
  }

  return (
    <div
      className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] h-14 w-14 rounded-full border border-white bg-zinc-100 shadow-sm overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <img
        src={LIVE_AGENT_AVATAR.src}
        alt=""
        width={LIVE_AGENT_AVATAR.fab.width}
        height={LIVE_AGENT_AVATAR.fab.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  );
}
