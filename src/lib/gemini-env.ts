/**
 * Server-only Gemini API key resolution.
 * Used by API routes — reads process env at runtime (including VPS .env after restart).
 */
export function getServerGeminiApiKey(): string {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() ||
    ''
  );
}

export function getGeminiEnvDiagnostics() {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY?.trim());
  const hasPublicKey = Boolean(process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim());
  const resolved = getServerGeminiApiKey();

  return {
    hasGeminiKey,
    hasPublicKey,
    configured: Boolean(resolved),
    keyHint: resolved ? `${resolved.slice(0, 8)}…` : null,
    checkedVars: ['GEMINI_API_KEY', 'NEXT_PUBLIC_GEMINI_API_KEY'] as const,
  };
}
