import { NextResponse } from 'next/server';
import { getGeminiEnvDiagnostics, getServerGeminiApiKey } from '@/lib/gemini-env';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const apiKey = getServerGeminiApiKey();
  const diagnostics = getGeminiEnvDiagnostics();

  if (!apiKey) {
    return NextResponse.json(
      {
        ...diagnostics,
        message:
          'GEMINI_API_KEY is not set. Add GEMINI_API_KEY to .env in the project root and restart the app.',
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    configured: true,
    apiKey,
    keyHint: diagnostics.keyHint,
  });
}
