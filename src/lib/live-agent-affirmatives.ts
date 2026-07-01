/** Filler / thinking sounds — NOT agreement. */
const FILLER_WORD =
  /^(u+h*h*m*|h+u*m*m*|h+m+|m{1,4}|a+h*|e+h*|e+r+|o+h*|uhh*|umm*|uhm*)$/i;

/** Max words for a reply we treat as a simple agreement (not a new question). */
const AFFIRMATIVE_MAX_WORDS = 7;

/** Exact phrases after normalization (includes common speech-to-text typos). */
const AFFIRMATIVE_PHRASES = new Set([
  'yes',
  'yeah',
  'yep',
  'yup',
  'sure',
  'ok',
  'okay',
  'please',
  'go',
  'yes please',
  'yeah please',
  'please yes',
  'yes yeah',
  'yeah yes',
  'yes go',
  'yeah go',
  'go ahead',
  'go on',
  'do it',
  'do that',
  'lets go',
  'lets do it',
  'sure thing',
  'yes do that',
  'yeah do that',
  'yes go ahead',
  'yeah go ahead',
  'please do',
  'please go',
  'ok yes',
  'okay yes',
  'absolutely',
  'definitely',
  'of course',
  'alright',
  'sounds good',
]);

const ALLOWED_AFFIRMATIVE_WORDS = new Set([
  'yes',
  'yeah',
  'yep',
  'yup',
  'sure',
  'ok',
  'okay',
  'please',
  'go',
  'ahead',
  'on',
  'do',
  'it',
  'that',
  'lets',
  'let',
  'absolutely',
  'definitely',
  'of',
  'course',
  'alright',
  'sounds',
  'good',
  'thing',
]);

/** Normalize transcript for matching — fix common STT typos. */
export function normalizeAffirmativeTranscript(transcript: string): string {
  return transcript
    .trim()
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\bpelase\b/g, 'please')
    .replace(/\bpleas\b/g, 'please')
    .replace(/\bplz\b/g, 'please')
    .replace(/\bpls\b/g, 'please')
    .replace(/\bya\b/g, 'yeah')
    .replace(/\byah\b/g, 'yeah')
    .replace(/\blet's\b/g, 'lets')
    .replace(/\blet s\b/g, 'lets');
}

function isFillerOnly(normalized: string): boolean {
  if (!normalized) return true;
  const words = normalized.split(' ').filter(Boolean);
  if (words.length === 0) return true;
  return words.every((word) => FILLER_WORD.test(word));
}

export function isFillerOnlyTranscript(transcript: string): boolean {
  return isFillerOnly(normalizeAffirmativeTranscript(transcript));
}

function isComposedAffirmativePhrase(normalized: string): boolean {
  const words = normalized.split(' ').filter(Boolean);
  if (words.length === 0 || words.length > AFFIRMATIVE_MAX_WORDS) return false;

  const hasStrong =
    words.some((w) =>
      ['yes', 'yeah', 'yep', 'yup', 'please', 'sure', 'okay', 'ok', 'absolutely', 'definitely'].includes(
        w,
      ),
    ) || normalized === 'go';

  if (!hasStrong) return false;

  return words.every((w) => ALLOWED_AFFIRMATIVE_WORDS.has(w.replace(/'/g, '')));
}

export function isLikelyAffirmativeReply(transcript: string): boolean {
  const normalized = normalizeAffirmativeTranscript(transcript);
  if (!normalized || isFillerOnly(normalized)) return false;

  if (AFFIRMATIVE_PHRASES.has(normalized)) return true;

  return isComposedAffirmativePhrase(normalized);
}

export function buildAffirmativeProceedNudge(transcript: string): string {
  const normalized = normalizeAffirmativeTranscript(transcript);
  return `[SYSTEM — The visitor finished speaking and clearly agreed (heard: "${transcript}"${normalized !== transcript.trim().toLowerCase() ? `, meaning: "${normalized}"` : ''}). Respond now in a warm, natural, conversational tone — like a real assistant, not a rushed robot. Brief acknowledgment, then proceed with what you last offered. Do not ask permission again. Never treat umm/hmm/uhh alone as yes.]`;
}

/** Very short or garbled transcript — prompt model to clarify without stopping. */
export function isLikelyUnclearReply(transcript: string): boolean {
  const normalized = normalizeAffirmativeTranscript(transcript);
  if (!normalized) return true;
  if (isFillerOnly(normalized)) return true;
  if (isLikelyAffirmativeReply(transcript)) return false;

  if (/^(hi|hello|hey|howdy|thanks|thank you|bye|goodbye)\b/.test(normalized)) {
    return false;
  }

  if (normalized.length <= 2 && !/^(no|ok)$/i.test(normalized)) {
    return true;
  }

  return false;
}

export function buildUnclearSpeechNudge(transcript: string): string {
  const heard = transcript.trim() || '(unclear audio)';
  const normalized = normalizeAffirmativeTranscript(transcript);

  if (isFillerOnly(normalized)) {
    return `[SYSTEM — Visitor made a filler sound (${heard}) like umm or hmm. This is NOT yes. Wait for a clear reply, or gently ask: "Take your time — want the tour, services, or founder story? Just say one word." Do not proceed as if they agreed.]`;
  }

  return `[SYSTEM — Visitor speech was unclear: "${heard}". You MUST still speak aloud. If they clearly said yes/yeah/please, proceed; otherwise say what you think they meant and offer two simple choices. Never go silent.]`;
}
