const DEBUG_ENDPOINT = 'http://127.0.0.1:7609/ingest/1ec57355-c921-4f6a-85f1-444fbeb3cb00';
const SESSION_ID = 'fac4ce';

type DebugPayload = {
  sessionId: string;
  runId?: string;
  hypothesisId: string;
  location: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: number;
};

export function perfDebug(payload: Omit<DebugPayload, 'sessionId' | 'timestamp'>) {
  if (typeof window === 'undefined') return;

  const body: DebugPayload = {
    sessionId: SESSION_ID,
    timestamp: Date.now(),
    ...payload,
  };

  // #region agent log
  fetch(DEBUG_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': SESSION_ID,
    },
    body: JSON.stringify(body),
  }).catch(() => {});
  // #endregion
}

export function getImageResourcesBeforeLoad() {
  if (typeof window === 'undefined') return [];

  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const loadEnd = nav?.loadEventEnd ?? performance.now();

  return performance
    .getEntriesByType('resource')
    .filter((entry) => {
      const name = entry.name.toLowerCase();
      return /\.(webp|png|jpg|jpeg|gif|svg|avif)(\?|$)/i.test(name);
    })
    .map((entry) => ({
      name: entry.name.split('/').pop() ?? entry.name,
      url: entry.name,
      startTime: Math.round(entry.startTime),
      duration: Math.round(entry.duration),
      beforeWindowLoad: entry.startTime < loadEnd || loadEnd === 0,
    }));
}

export function wasResourceFetched(urlPart: string) {
  return performance.getEntriesByType('resource').some((entry) => entry.name.includes(urlPart));
}
