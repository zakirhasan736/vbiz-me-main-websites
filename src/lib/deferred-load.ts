/** Run callback after window `load`, then during idle time (keeps critical path fast). */
export function scheduleAfterSiteLoad(callback: () => void, idleTimeoutMs = 1500) {
  const runWhenIdle = () => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => callback(), { timeout: idleTimeoutMs });
      return;
    }
    window.setTimeout(callback, 0);
  };

  if (document.readyState === 'complete') {
    runWhenIdle();
    return;
  }

  window.addEventListener('load', runWhenIdle, { once: true });
}
