/** How long to wait after the agent stops speaking before nudging a quiet visitor */
export const LIVE_AGENT_USER_SILENCE_MS = 14_000;

/** How long to wait after the visitor speaks before recovering if the agent stays silent */
export const LIVE_AGENT_AGENT_SILENCE_MS = 7_500;

/** Minimum gap between automatic nudges so the agent does not loop annoyingly */
export const LIVE_AGENT_NUDGE_COOLDOWN_MS = 22_000;

/** Mic RMS/peak threshold — visitor is likely speaking */
export const LIVE_AGENT_USER_SPEECH_THRESHOLD = 0.014;

const USER_SILENCE_NUDGES = [
  'The visitor has been quiet after your last message. Speak aloud now in one to three warm, conversational sentences. Do not repeat your last question word for word. Gently re-engage: remind them you are here, offer a quick guided tour of the card, or suggest starting with the introduction video. Make them feel you understood they may still be thinking—never go silent.',
  'The visitor has not responded yet. Speak aloud now. Briefly share something useful they may not know—how the V BIZ me card turns a handshake into a guided experience, or that they can ask about services, pricing, or how to reach the owner. End with one easy yes-or-no or A-or-B choice. Stay friendly and conversational.',
  'Still no reply from the visitor. Speak aloud now with confidence and warmth. Acknowledge you are still here to help, mention one high-value option (tour, intro video, services, or contact), and invite them to say just one word if they want the quick version. Never sound robotic or impatient.',
] as const;

const AGENT_SILENCE_RECOVERY_NUDGES = [
  'The visitor just spoke but you have not answered aloud yet. Respond now in one to three conversational sentences. Acknowledge what you heard or what they likely meant. If unclear, offer two simple paths tied to this card. Never stay silent after user speech.',
  'The visitor spoke and is waiting. Speak aloud immediately. Reflect their intent in plain language, answer from approved card data when possible, or guide them to the best next step on this card. If you are unsure, say so warmly and offer the intro video or a quick tour.',
  'User voice input was detected and you have not replied yet. Speak now. Start with a short acknowledgment (Got it, Sure, Great question), then give a helpful answer or a clear next step. Never leave them wondering if you understood.',
] as const;

let nudgeIndex = 0;

function nextRotating<T extends readonly string[]>(pool: T): string {
  const item = pool[nudgeIndex % pool.length];
  nudgeIndex += 1;
  return item;
}

export function buildUserSilenceNudge(): string {
  return `[SYSTEM — ${nextRotating(USER_SILENCE_NUDGES)}]`;
}

export function buildAgentSilenceRecoveryNudge(): string {
  return `[SYSTEM — ${nextRotating(AGENT_SILENCE_RECOVERY_NUDGES)}]`;
}

/** Quick level check for mic activity without importing full audio utils */
export function detectUserSpeechLevel(samples: Float32Array): number {
  let peak = 0;
  let sumSquares = 0;
  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    peak = Math.max(peak, abs);
    sumSquares += samples[i] * samples[i];
  }
  const rms = Math.sqrt(sumSquares / Math.max(1, samples.length));
  return Math.max(peak, rms * 3.5);
}
