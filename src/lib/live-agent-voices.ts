/** Gemini Live prebuilt voices — share /ai-voices with clients for selection. */
export type LiveAgentVoiceOption = {
  id: string;
  tone: string;
  bestFor: string;
  recommended?: boolean;
};

/** Official voice samples (listen before choosing): */
export const GEMINI_VOICE_SAMPLES_URL =
  'https://cloud.google.com/text-to-speech/docs/gemini-tts';

/** Google AI Studio — test Live API voices in the browser */
export const GOOGLE_AI_STUDIO_URL = 'https://aistudio.google.com/';

export const LIVE_AGENT_DEFAULT_VOICE = 'Puck';

const MALE_VOICE_IDS = new Set([
  'Achird',
  'Algenib',
  'Alnilam',
  'Charon',
  'Enceladus',
  'Fenrir',
  'Iapetus',
  'Orus',
  'Puck',
  'Rasalgethi',
  'Sadachbia',
  'Sadaltager',
  'Schedar',
  'Umbriel',
  'Zubenelgenubi',
]);

/** Curated men's voices for the vBiz Me live sales assistant */
export const LIVE_AGENT_MALE_VOICES: LiveAgentVoiceOption[] = [
  {
    id: 'Orus',
    tone: 'Mature, resonant, calm authority',
    bestFor: 'Executive sales assistant — warm but confident',
  },
  {
    id: 'Charon',
    tone: 'Smooth, informative, approachable',
    bestFor: 'Corporate explainers and trust-building',
  },
  {
    id: 'Puck',
    tone: 'Upbeat, playful, conversational',
    bestFor: 'Friendly demos and guided tours (current default)',
    recommended: true,
  },
  {
    id: 'Fenrir',
    tone: 'Energetic, clear, enthusiastic',
    bestFor: 'High-energy pitches and product walkthroughs',
  },
  {
    id: 'Iapetus',
    tone: 'Clear, steady mid-range',
    bestFor: 'Professional narration',
  },
  {
    id: 'Rasalgethi',
    tone: 'Informative, knowledgeable',
    bestFor: 'Educational and FAQ-style answers',
  },
  {
    id: 'Sadaltager',
    tone: 'Knowledgeable, measured',
    bestFor: 'Consultative sales conversations',
  },
  {
    id: 'Schedar',
    tone: 'Even, balanced delivery',
    bestFor: 'Long-form explanations without sounding rushed',
  },
  {
    id: 'Enceladus',
    tone: 'Breathy, promotional energy',
    bestFor: 'Event-style announcements',
  },
  {
    id: 'Alnilam',
    tone: 'Firm, direct',
    bestFor: 'Confident closers and objection handling',
  },
  {
    id: 'Algenib',
    tone: 'Gravelly, distinctive',
    bestFor: 'Memorable brand personality',
  },
  {
    id: 'Achird',
    tone: 'Youthful, friendly, inquisitive',
    bestFor: 'Casual, approachable assistant tone',
  },
];

export function isValidLiveAgentVoice(name: string): boolean {
  return MALE_VOICE_IDS.has(name) || LIVE_AGENT_MALE_VOICES.some((v) => v.id === name);
}

/** Resolve voice from env (server: LIVE_AGENT_VOICE, client: NEXT_PUBLIC_LIVE_AGENT_VOICE). */
export function resolveLiveAgentVoice(): string {
  const fromEnv =
    (typeof process !== 'undefined' &&
      (process.env.NEXT_PUBLIC_LIVE_AGENT_VOICE?.trim() ||
        process.env.LIVE_AGENT_VOICE?.trim())) ||
    '';

  if (fromEnv && isValidLiveAgentVoice(fromEnv)) {
    return fromEnv;
  }

  return LIVE_AGENT_DEFAULT_VOICE;
}
