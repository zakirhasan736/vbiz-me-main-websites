'use client';

import { LiveAgent } from '@/components/LiveAgent';

/** Live agent FAB is SSR'd immediately; connection starts after site load (Safari: tap mic). */
export function LazyLiveAgentLauncher() {
  return <LiveAgent autoConnect />;
}
