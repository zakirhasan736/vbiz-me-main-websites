import type { Metadata } from 'next';
import Link from 'next/link';
import { AiVoicesPicker } from '@/components/AiVoicesPicker';
import {
  GEMINI_VOICE_SAMPLES_URL,
  GOOGLE_AI_STUDIO_URL,
  resolveLiveAgentVoice,
} from '@/lib/live-agent-voices';

export const metadata: Metadata = {
  title: 'Live AI Voice Options | vBiz Me',
  description:
    'Choose a male voice for the vBiz Me live AI assistant. Click to select and play a sample.',
};

export default function AiVoicesPage() {
  const activeVoice = resolveLiveAgentVoice();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-zinc-500">vBiz Me Live AI Assistant</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Men&apos;s voice options</h1>
        <p className="mt-4 text-zinc-400 leading-relaxed">
          Send this page to your client. They can <strong className="font-medium text-zinc-200">click a voice to select it</strong> and{' '}
          <strong className="font-medium text-zinc-200">press Play</strong> to hear how it sounds on
          the live assistant.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={GEMINI_VOICE_SAMPLES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
          >
            More samples on Google
          </a>
          <a
            href={GOOGLE_AI_STUDIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
          >
            Google AI Studio
          </a>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200"
          >
            Back to site
          </Link>
        </div>

        <AiVoicesPicker activeVoice={activeVoice} />
      </div>
    </main>
  );
}
