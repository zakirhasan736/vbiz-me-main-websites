/** How long to wait after the agent stops speaking before nudging a quiet visitor */
export const LIVE_AGENT_USER_SILENCE_MS = 12_000;

/** How long to wait after the visitor speaks before recovering if the agent stays silent */
export const LIVE_AGENT_AGENT_SILENCE_MS = 3_000;

/** If the visitor was quiet longer than this, treat the next speech as a wake-up */
export const LIVE_AGENT_IDLE_WAKE_MS = 10_000;

/** Max wait for an agent reply after the visitor speaks before forcing recovery */
export const LIVE_AGENT_RESPONSE_TIMEOUT_MS = 4_000;

/** Minimum gap between automatic user-silence nudges */
export const LIVE_AGENT_NUDGE_COOLDOWN_MS = 22_000;

/** Minimum gap for agent-recovery / idle-wake nudges (must not block after user speaks) */
export const LIVE_AGENT_RECOVERY_NUDGE_COOLDOWN_MS = 2_500;

export { LIVE_AGENT_POST_TURN_DELAY_MS } from '@/lib/live-agent-audio';

/** Mic RMS/peak threshold — visitor is likely speaking */
export const LIVE_AGENT_USER_SPEECH_THRESHOLD = 0.014;

const USER_SILENCE_NUDGES = [
  'The visitor has been quiet after your last message. Speak aloud now in one to three warm, conversational sentences. Do not repeat your last question word for word. Gently re-engage: remind them you are here, offer a quick guided tour of the card, or suggest starting with the introduction video. Make them feel you understood they may still be thinking—never go silent.',
  'The visitor has not responded yet. Speak aloud now. Briefly share something useful they may not know—how the V BIZ me card turns a handshake into a guided experience, or that they can ask about services, pricing, or how to reach the owner. End with one easy yes-or-no or A-or-B choice. Stay friendly and conversational.',
  'Still no reply from the visitor. Speak aloud now with confidence and warmth. Acknowledge you are still here to help, mention one high-value option (tour, intro video, services, or contact), and invite them to say just one word if they want the quick version. Never sound robotic or impatient.',
] as const;

const AGENT_SILENCE_RECOVERY_NUDGES = [
  'The visitor just spoke but you have not answered aloud yet. Respond NOW. If they asked a question — any question — answer it. If they asked multiple questions, answer one by one in order. If off-topic, acknowledge and bridge to services, founder story, or the card. Never stay silent.',
  'The visitor spoke and is waiting. Speak aloud immediately. They may have asked something unclear or off-topic — still respond warmly, infer intent, or offer tour vs services vs founder story. If they said yes/please/go ahead, proceed with your last offer. Never ignore them.',
  'User voice detected — you have not replied. Speak now. Every visitor question requires a spoken answer. Start with Got it or Great question, then answer from approved data or redirect smartly to the card. If multiple questions, say you will take them one at a time and answer each. Never go silent.',
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

export function buildIdleWakeNudge(): string {
  return '[SYSTEM — The visitor spoke. Respond aloud immediately. If they asked a question, answer it — or if multiple questions, answer one by one. If off-topic, bridge to services or the card. If they agreed (yes, please, go ahead), proceed with your last offer. Never stay silent.]';
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
