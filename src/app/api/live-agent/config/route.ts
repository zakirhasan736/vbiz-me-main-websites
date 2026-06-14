import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Returns the Gemini API key from server runtime env.
 * On VPS, set GEMINI_API_KEY in the process environment — no rebuild required.
 */
export async function GET() {
  const apiKey =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() ||
    '';

  if (!apiKey) {
    return NextResponse.json(
      {
        configured: false,
        message:
          'GEMINI_API_KEY is not set on the server. Add it to your VPS environment and restart the app.',
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ configured: true, apiKey });
}
