import { NextResponse } from 'next/server';
import { getGeminiEnvDiagnostics, getServerGeminiApiKey } from '@/lib/gemini-env';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Returns the Gemini API key from server runtime env.
 * On VPS: put GEMINI_API_KEY in project root `.env`, then restart the Node process.
 */
export async function GET() {
  const apiKey = getServerGeminiApiKey();
  const diagnostics = getGeminiEnvDiagnostics();

  if (!apiKey) {
    return NextResponse.json(
      {
        ...diagnostics,
        message:
          'GEMINI_API_KEY is not visible to the running Node process. Add GEMINI_API_KEY=your-key to .env in the project root (same folder as package.json), then restart the app (pm2 restart / docker restart / systemctl restart).',
        vpsChecklist: [
          'File path: /path/to/your-app/.env (not only on your local PC)',
          'Line format: GEMINI_API_KEY=AIza... (no spaces around =)',
          'Restart after editing .env — Next.js only loads env when the process starts',
          'If using PM2, set cwd to the project root or put GEMINI_API_KEY in ecosystem.config.js env',
        ],
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    configured: true,
    apiKey,
    keyHint: diagnostics.keyHint,
    source: diagnostics.hasGeminiKey ? 'GEMINI_API_KEY' : 'NEXT_PUBLIC_GEMINI_API_KEY',
  });
}
