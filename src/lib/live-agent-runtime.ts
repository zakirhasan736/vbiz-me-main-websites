/** Lazy-load the Gemini client SDK (~50 KiB gzip) only when a voice session starts. */
export type LiveAgentRuntime = {
  GoogleGenAI: typeof import('@google/genai').GoogleGenAI;
  Modality: typeof import('@google/genai').Modality;
  Type: typeof import('@google/genai').Type;
  StartSensitivity: typeof import('@google/genai').StartSensitivity;
  EndSensitivity: typeof import('@google/genai').EndSensitivity;
};

let runtimePromise: Promise<LiveAgentRuntime> | null = null;

export function loadLiveAgentRuntime(): Promise<LiveAgentRuntime> {
  if (!runtimePromise) {
    runtimePromise = import('@google/genai').then((mod) => ({
      GoogleGenAI: mod.GoogleGenAI,
      Modality: mod.Modality,
      Type: mod.Type,
      StartSensitivity: mod.StartSensitivity,
      EndSensitivity: mod.EndSensitivity,
    }));
  }
  return runtimePromise;
}
