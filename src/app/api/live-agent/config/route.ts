import { NextResponse } from 'next/server';
import { getGeminiEnvDiagnostics, getServerGeminiApiKey } from '@/lib/gemini-env';
import { resolveLiveAgentVoice } from '@/lib/live-agent-voices';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function probeGeminiApiKey(apiKey: string): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}&pageSize=1`,
      { cache: 'no-store' },
    );
    if (response.ok) return { ok: true };

    const body = (await response.json().catch(() => null)) as {
      error?: { message?: string; status?: string };
    } | null;
    const message = body?.error?.message || `Gemini API returned ${response.status}`;
    if (/reported as leaked|leaked/i.test(message)) {
      return {
        ok: false,
        message:
          'Gemini API key was revoked as leaked. Create a new key in Google AI Studio, update GEMINI_API_KEY, and redeploy.',
      };
    }
    return { ok: false, message };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'Could not verify Gemini API key.',
    };
  }
}

export async function GET() {
  const apiKey = getServerGeminiApiKey();
  const diagnostics = getGeminiEnvDiagnostics();
  const voice = resolveLiveAgentVoice();

  if (!apiKey) {
    return NextResponse.json(
      {
        ...diagnostics,
        voice,
        message:
          'GEMINI_API_KEY is not set. Add GEMINI_API_KEY to .env in the project root and restart the app.',
      },
      { status: 503 },
    );
  }

  const probe = await probeGeminiApiKey(apiKey);
  if (!probe.ok) {
    return NextResponse.json(
      {
        ...diagnostics,
        voice,
        configured: false,
        message: probe.message,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    configured: true,
    apiKey,
    voice,
    keyHint: diagnostics.keyHint,
  });
}
