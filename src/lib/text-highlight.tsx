import type { ReactNode } from 'react';

/** Inline gold spans only where needed — avoids per-word DOM wrappers. */
export function renderHighlightedText(text: string, highlightedWords: string[] = []): ReactNode {
  if (highlightedWords.length === 0) return text;

  const escaped = highlightedWords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern).filter((part) => part.length > 0);

  return parts.map((part, idx) => {
    const isHighlighted = highlightedWords.some(
      (word) => word.toLowerCase() === part.toLowerCase(),
    );

    if (isHighlighted) {
      return (
        <span key={idx} className="text-brand-gold font-semibold">
          {part}
        </span>
      );
    }

    return part;
  });
}
