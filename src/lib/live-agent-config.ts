'use client';

import { GoogleGenAI } from '@google/genai';

const LIVE_MODELS = [
  "gemini-3.1-flash-live-preview",
] as const;

export { LIVE_MODELS };

export const CONNECT_TIMEOUT_MS = 25000;
export const MIC_TIMEOUT_MS = 12000;

export function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    }),
  ]);
}

export async function resolveLiveAgentApiKey(): Promise<string> {
  const bakedKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || '';
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Local dev: use baked key when present (fast path).
  if (isLocalhost && bakedKey) return bakedKey;

  // Production/VPS: always prefer server runtime env (GEMINI_API_KEY).
  try {
    const response = await fetch('/api/live-agent/config', { cache: 'no-store' });
    const data = (await response.json()) as {
      apiKey?: string;
      message?: string;
      configured?: boolean;
      vpsChecklist?: string[];
    };

    if (response.ok && data.apiKey) {
      return data.apiKey;
    }

    if (bakedKey) return bakedKey;

    const checklist =
      data.vpsChecklist?.length ?
        `\n\nVPS checklist:\n${data.vpsChecklist.map((line) => `• ${line}`).join('\n')}`
      : '';

    throw new Error(
      (data.message ||
        'Live Agent is not configured on the server. Set GEMINI_API_KEY in .env and restart the app.') +
        checklist,
    );
  } catch (err) {
    if (bakedKey) return bakedKey;
    throw err instanceof Error
      ? err
      : new Error('Could not load Live Agent configuration from the server.');
  }
}

export function createLiveGenAIClient(apiKey: string) {
  return new GoogleGenAI({ apiKey });
}

export function getLiveAgentSetupError(): string | null {
  if (typeof window === 'undefined') return null;

  if (!window.isSecureContext && window.location.hostname !== 'localhost') {
    return 'Live Agent requires HTTPS on your production domain (microphone + WebSocket).';
  }

  return null;
}

export function getGoogleReferrerFixMessage(): string {
  if (typeof window === 'undefined') {
    return 'Add your production domain to HTTP referrers in Google AI Studio.';
  }

  const { protocol, hostname } = window.location;
  const origin = `${protocol}//${hostname}`;

  return (
    `Google AI Studio → API key → Application restrictions → HTTP referrers → add:\n` +
    `• ${origin}/*\n` +
    (hostname.startsWith('www.') ?
      ''
    : `• ${protocol}//www.${hostname}/*\n`) +
    `Save, wait ~2 minutes, then refresh this page.`
  );
}
