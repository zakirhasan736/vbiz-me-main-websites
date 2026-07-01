/** Detect multiple distinct questions in one visitor turn. */
export function looksLikeMultipleQuestions(transcript: string): boolean {
  const text = transcript.trim();
  if (!text) return false;

  const questionMarks = (text.match(/\?/g) || []).length;
  if (questionMarks >= 2) return true;

  if (
    /\b(and also|also tell me|another question|two questions|few questions|first question|second question)\b/i.test(
      text,
    )
  ) {
    return true;
  }

  // "what is X and how much is Y" / "who is the founder and what services"
  const andSplit = text.split(/\band\b/i);
  if (andSplit.length >= 3) return true;

  const questionStarters =
    /\b(who|what|when|where|why|how|can you|could you|do you|does|is there|tell me about|explain)\b/gi;
  const starterMatches = text.match(questionStarters);
  if (starterMatches && starterMatches.length >= 2 && text.length > 35) {
    return true;
  }

  return false;
}

export function buildMultiQuestionNudge(transcript: string): string {
  return `[SYSTEM — The visitor asked several things at once: "${transcript}". Answer EVERY question — one at a time, in order. Start aloud with something like: "Great questions — let me take these one at a time." Answer question one fully, then question two, and so on. Do not skip any. Do not go silent.]`;
}

/** Any clear question — agent must respond aloud. */
export function looksLikeVisitorQuestion(transcript: string): boolean {
  const text = transcript.trim();
  if (!text) return false;

  if (text.includes('?')) return true;

  return /^(who|what|when|where|why|how|can you|could you|would you|do you|does|is there|are there|tell me|explain|describe|help me|i want to know|i have a question)/i.test(
    text,
  );
}

export function buildMustAnswerQuestionNudge(transcript: string): string {
  return `[SYSTEM — The visitor asked: "${transcript}". You MUST respond aloud now — never stay silent after a question. Answer from approved card and platform data when possible. If off-topic, acknowledge warmly and bridge to services, the card tour, founder story, pricing, or contact options. If unclear, say your best guess and offer two simple paths. Always speak.]`;
}

export function buildOffTopicBridgeNudge(transcript: string): string {
  return `[SYSTEM — The visitor said something off-topic or outside card data: "${transcript}". Still speak aloud immediately. Briefly acknowledge it in a friendly human way, then connect to something useful on this card — services, owner story, V BIZ me value, intro video, or how to contact them. Never ignore them or go quiet.]`;
}
