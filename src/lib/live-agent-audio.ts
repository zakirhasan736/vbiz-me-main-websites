export const LIVE_AGENT_PCM_SAMPLE_RATE = 16000;

/** Target peak after normalization (0–1). */
const TARGET_PEAK = 0.92;
/** Max boost for very quiet / distant speech. */
const MAX_PEAK_GAIN = 160;
/** Minimum boost applied even to moderate-level input. */
const MIN_PEAK_GAIN = 3;

/** Pre-encoder Web Audio gain (applied before compressor). */
export const LIVE_AGENT_INPUT_GAIN = 9;

/** ScriptProcessor buffer — smaller = lower latency, larger = smoother quiet capture. */
export const LIVE_AGENT_MIC_BUFFER_SIZE = 1024;

/** Dynamics compressor — lifts quiet/distant speech before PCM encoding. */
export const LIVE_AGENT_COMPRESSOR = {
  threshold: -52,
  knee: 24,
  ratio: 10,
  attack: 0.002,
  release: 0.18,
} as const;

export const LIVE_AGENT_MIC_CONSTRAINTS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    channelCount: 1,
  },
};

export const LIVE_AGENT_VAD = {
  prefixPaddingMs: 700,
  silenceDurationMs: 1600,
} as const;

function resampleLinear(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (Math.abs(fromRate - toRate) < 1) return input;

  const ratio = fromRate / toRate;
  const outLength = Math.max(1, Math.floor(input.length / ratio));
  const output = new Float32Array(outLength);

  for (let i = 0; i < outLength; i++) {
    const srcPos = i * ratio;
    const idx = Math.floor(srcPos);
    const frac = srcPos - idx;
    const s0 = input[idx] ?? 0;
    const s1 = input[Math.min(idx + 1, input.length - 1)] ?? s0;
    output[i] = s0 + (s1 - s0) * frac;
  }

  return output;
}

function measureLevel(samples: Float32Array) {
  let peak = 0;
  let sumSquares = 0;

  for (let i = 0; i < samples.length; i++) {
    const abs = Math.abs(samples[i]);
    peak = Math.max(peak, abs);
    sumSquares += samples[i] * samples[i];
  }

  const rms = Math.sqrt(sumSquares / Math.max(1, samples.length));
  // RMS helps catch spread-out quiet speech; peak catches consonants.
  return Math.max(peak, rms * 3.5);
}

/** Encode mic audio for Gemini Live — continuous stream with distance-friendly gain. */
export function encodeMicChunk(input: Float32Array, sourceSampleRate: number) {
  const resampled = resampleLinear(input, sourceSampleRate, LIVE_AGENT_PCM_SAMPLE_RATE);
  const level = measureLevel(resampled);

  const autoGain = level > 1e-7 ? Math.min(MAX_PEAK_GAIN, TARGET_PEAK / level) : MIN_PEAK_GAIN;
  const gain = Math.max(MIN_PEAK_GAIN, autoGain);

  const pcm16 = new Int16Array(resampled.length);
  for (let i = 0; i < resampled.length; i++) {
    const sample = Math.max(-1, Math.min(1, resampled[i] * gain));
    pcm16[i] = sample * 0x7fff;
  }

  const uint8 = new Uint8Array(pcm16.buffer);
  let binary = '';
  for (let i = 0; i < uint8.byteLength; i++) {
    binary += String.fromCharCode(uint8[i]);
  }

  return {
    mimeType: `audio/pcm;rate=${LIVE_AGENT_PCM_SAMPLE_RATE}`,
    data: btoa(binary),
  };
}

export function createMicProcessingChain(audioContext: AudioContext, stream: MediaStream) {
  const source = audioContext.createMediaStreamSource(stream);

  const inputGain = audioContext.createGain();
  inputGain.gain.value = LIVE_AGENT_INPUT_GAIN;

  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = LIVE_AGENT_COMPRESSOR.threshold;
  compressor.knee.value = LIVE_AGENT_COMPRESSOR.knee;
  compressor.ratio.value = LIVE_AGENT_COMPRESSOR.ratio;
  compressor.attack.value = LIVE_AGENT_COMPRESSOR.attack;
  compressor.release.value = LIVE_AGENT_COMPRESSOR.release;

  const processor = audioContext.createScriptProcessor(LIVE_AGENT_MIC_BUFFER_SIZE, 1, 1);
  const silentOut = audioContext.createGain();
  silentOut.gain.value = 0;

  source.connect(inputGain);
  inputGain.connect(compressor);
  compressor.connect(processor);
  processor.connect(silentOut);
  silentOut.connect(audioContext.destination);

  return { processor, silentOut };
}
