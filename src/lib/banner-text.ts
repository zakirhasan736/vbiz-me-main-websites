/** Split long banner copy into ~3 readable lines */
export function splitBannerLines(text: string, maxLines = 3): string[] {
  const normalized = text.trim();
  if (!normalized) return [];

  const byDash = normalized.split(/\s+[—–-]\s+/);
  if (byDash.length > 1 && byDash.length <= maxLines) {
    return byDash.map((s) => s.trim()).filter(Boolean);
  }

  const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length >= 2 && sentences.length <= maxLines) {
    return sentences;
  }

  const words = normalized.split(/\s+/);
  const targetLen = Math.ceil(normalized.length / maxLines);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (lines.length < maxLines - 1 && next.length >= targetLen) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}
