import { NextResponse } from 'next/server';
import { GoogleGenAI, Modality } from '@google/genai';
import { getServerGeminiApiKey } from '@/lib/gemini-env';
import { isValidLiveAgentVoice } from '@/lib/live-agent-voices';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { LIVE_AGENT_GREETING_TEXT } from '@/lib/live-agent-prompt';

const PREVIEW_LINE = LIVE_AGENT_GREETING_TEXT.replace(
  " I can offer a quick guided tour of the card if you'd like.",
  ". I'm your live AI assistant. How can I help you today?",
);
const TTS_MODELS = [
  'gemini-2.5-flash-preview-tts',
  'gemini-2.5-pro-preview-tts',
  'gemini-3.1-flash-tts-preview',
] as const;

function pcm16ToWav(pcm: Buffer, sampleRate = 24000): Buffer {
  const dataSize = pcm.length;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  pcm.copy(buffer, 44);

  return buffer;
}

export async function POST(request: Request) {
  const apiKey = getServerGeminiApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 503 });
  }

  let voice = '';
  try {
    const body = (await request.json()) as { voice?: string };
    voice = body.voice?.trim() || '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!voice || !isValidLiveAgentVoice(voice)) {
    return NextResponse.json({ error: 'Invalid voice name.' }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown;

  for (const model of TTS_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: PREVIEW_LINE,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice },
            },
          },
        },
      });

      const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      const raw = inlineData?.data;
      if (!raw) continue;

      const pcm = Buffer.from(raw, 'base64');
      const wav = pcm16ToWav(pcm);

      return new NextResponse(wav, {
        headers: {
          'Content-Type': 'audio/wav',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    } catch (err) {
      lastError = err;
    }
  }

  console.error('Voice preview failed:', lastError);
  return NextResponse.json({ error: 'Could not generate voice preview.' }, { status: 502 });
}
