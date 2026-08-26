/**
 * Server-only Gemini API key resolution.
 * Never read NEXT_PUBLIC_* here — those values are exposed in the browser bundle.
 */
export function getServerGeminiApiKey(): string {
  return process.env.GEMINI_API_KEY?.trim() || ''
}

export function getGeminiEnvDiagnostics() {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY?.trim())
  const resolved = getServerGeminiApiKey()

  return {
    hasGeminiKey,
    hasPublicKey: false,
    configured: Boolean(resolved),
    keyHint: resolved ? `${resolved.slice(0, 6)}…` : null,
    checkedVars: ['GEMINI_API_KEY'] as const,
  }
}
