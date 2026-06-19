/** Lightweight check before attaching large media `src` (avoids loading when asset is missing). */
export async function isMediaAssetAvailable(url: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'force-cache' });
    if (response.ok) return true;
    // Some static hosts omit HEAD — fall through to a direct video load attempt.
    if (response.status === 405 || response.status === 501) return true;
    return false;
  } catch {
    return false;
  }
}
