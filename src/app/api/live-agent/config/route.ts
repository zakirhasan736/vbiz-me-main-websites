import { NextResponse } from 'next/server';
import { getGeminiEnvDiagnostics, getServerGeminiApiKey } from '@/lib/gemini-env';
import { resolveLiveAgentVoice } from '@/lib/live-agent-voices';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

  return NextResponse.json({
    configured: true,
    apiKey,
    voice,
    keyHint: diagnostics.keyHint,
  });
}
