'use client';

import { GoogleGenAI } from '@google/genai';

const LIVE_MODELS = [
  'gemini-2.5-flash-native-audio-preview-12-2025',
  'gemini-3.1-flash-live-preview',
] as const;

export { LIVE_MODELS };

export async function resolveLiveAgentApiKey(): Promise<string> {
  const bakedKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || '';
  if (bakedKey) return bakedKey;

  const response = await fetch('/api/live-agent/config', { cache: 'no-store' });
  const data = (await response.json()) as { apiKey?: string; message?: string };

  if (!response.ok || !data.apiKey) {
    throw new Error(
      data.message ||
        'Live Agent is not configured on the server. Set GEMINI_API_KEY on your VPS.',
    );
  }

  return data.apiKey;
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
