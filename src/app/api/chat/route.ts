import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';
import { buildLiveAgentSystemPrompt } from '@/lib/live-agent-prompt';
import { getServerGeminiApiKey } from '@/lib/gemini-env';

const ai = new GoogleGenAI({
  apiKey: getServerGeminiApiKey(),
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const systemInstruction = buildLiveAgentSystemPrompt(undefined, undefined, {
  voice: false,
});

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const chatHistory = history || [];
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    for (const turn of chatHistory) {
      if (turn.role === 'user') {
        contents.push({ role: 'user', parts: [{ text: turn.text }] });
      } else if (turn.role === 'model') {
        contents.push({ role: 'model', parts: [{ text: turn.text }] });
      }
    }

    contents.push({ role: 'user', parts: [{ text: message }] });

    const models = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let success = false;
    let lastError: unknown = null;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        for (const targetModel of models) {
          let attempts = 2;

          while (attempts > 0) {
            try {
              const responseStream = await ai.models.generateContentStream({
                model: targetModel,
                contents,
                config: {
                  systemInstruction,
                  temperature: 0.8,
                  topP: 0.95,
                },
              });

              for await (const chunk of responseStream) {
                const textChunk = chunk.text;
                if (textChunk) {
                  controller.enqueue(encoder.encode(textChunk));
                }
              }

              success = true;
              break;
            } catch (err) {
              lastError = err;
              attempts -= 1;
              if (attempts > 0) {
                await new Promise((resolve) => setTimeout(resolve, 300));
              }
            }
          }

          if (success) break;
        }

        if (!success) {
          console.error('Gemini API error in Next.js route:', lastError);
          controller.enqueue(
            encoder.encode(
              'I apologize, but my sensory systems are experiencing a brief delay. Feel free to contact our support line at +1 (860) 770-9893, or just ask another question!'
            )
          );
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Express routing level error in /api/chat:', err);
    return new Response(
      'I apologize, but my sensory systems are experiencing a brief delay. Feel free to contact our support line at +1 (860) 770-9893, or just ask another question!',
      {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }
}
