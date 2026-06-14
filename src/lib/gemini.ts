export function getGeminiApiKey(): string {
  return (
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    ''
  );
}
