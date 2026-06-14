'use client';

import { GoogleGenAI } from '@google/genai';

const LIVE_MODELS = [
  "gemini-3.1-flash-live-preview",
] as const;

export { LIVE_MODELS };

export const CONNECT_TIMEOUT_MS = 25000;
export const MIC_TIMEOUT_MS = 60000;

export const LIVE_AGENT_MEDIA_CONSTRAINTS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
  },
  video: {
    facingMode: 'user',
    width: { ideal: 640, max: 1280 },
    height: { ideal: 480, max: 720 },
  },
};

export type MediaPermissionState = 'unknown' | 'prompt' | 'granted' | 'denied';

export async function queryLiveAgentMediaPermission(): Promise<MediaPermissionState> {
  if (typeof navigator === 'undefined' || !navigator.permissions?.query) {
    return 'unknown';
  }

  try {
    const mic = await navigator.permissions.query({ name: 'microphone' as PermissionName });

    if (mic.state === 'denied') return 'denied';
    if (mic.state === 'granted') return 'granted';

    try {
      const camera = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (camera.state === 'denied') return 'denied';
    } catch {
      /* camera permission API unavailable — mic prompt state is enough */
    }

    return 'prompt';
  } catch {
    return 'unknown';
  }
}

export function isMediaPermissionError(err: unknown): boolean {
  if (err instanceof DOMException) {
    return err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError';
  }
  if (err instanceof Error) {
    return err.message.includes('Allow when your browser asks');
  }
  return false;
}

export function getMediaPermissionErrorMessage(err: unknown): string {
  if (err instanceof Error && err.message.includes('Allow when your browser asks')) {
    return err.message;
  }

  if (err instanceof DOMException) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      return (
        'Microphone and camera access is blocked.\n\n' +
        'Click the lock/site icon in your address bar → Site settings → set Microphone and Camera to Allow (not Ask or Block), then refresh and click the agent again.'
      );
    }
    if (err.name === 'NotFoundError') {
      return 'No microphone was found on this device. Plug in a mic or use another device.';
    }
    if (err.name === 'NotReadableError') {
      return 'Microphone or camera is in use by another app. Close other apps using your mic/camera and try again.';
    }
  }

  return err instanceof Error ?
      err.message
    : 'Could not access microphone and camera. Allow both when your browser prompts you.';
}

/**
 * Requests mic + camera (camera released after grant). Works on load if already allowed.
 */
export async function requestLiveAgentMedia(options?: { skipDeniedCheck?: boolean }): Promise<MediaStream> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    throw new Error('This browser does not support microphone access.');
  }

  if (!options?.skipDeniedCheck) {
    const existing = await queryLiveAgentMediaPermission();
    if (existing === 'denied') {
      throw new DOMException(
        'Microphone and camera are blocked for this site. Change them to Allow in browser site settings, then refresh.',
        'NotAllowedError',
      );
    }
  }

  const stream = await withTimeout(
    navigator.mediaDevices.getUserMedia(LIVE_AGENT_MEDIA_CONSTRAINTS),
    MIC_TIMEOUT_MS,
    'Please click Allow when your browser asks for microphone and camera access.',
  );

  stream.getVideoTracks().forEach((track) => {
    track.stop();
  });

  return new MediaStream(stream.getAudioTracks());
}

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
