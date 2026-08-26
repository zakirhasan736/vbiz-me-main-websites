import { GoogleGenAI, Type } from '@google/genai'
import { getServerGeminiApiKey } from '@/lib/gemini-env'

type ReviewVerdict = 'allow' | 'block'

type GeminiReview = {
  verdict?: string
}

const REVIEW_TIMEOUT_MS = 4500

export async function reviewContactMessage(input: {
  name: string
  email: string
  message: string
}): Promise<ReviewVerdict> {
  const apiKey = getServerGeminiApiKey()
  if (!apiKey) return 'allow'

  try {
    const ai = new GoogleGenAI({ apiKey })
    const work = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Name: ${input.name}\nEmail: ${input.email}\nMessage:\n${input.message}`,
      config: {
        systemInstruction: `You screen website contact-form messages for vBiz Me, a digital business card / vCard company.
Return JSON only.
verdict must be "genuine" or "spam".
Mark spam if it is bot-like, gibberish, SEO/backlink/crypto/loan/casino ads, unrelated bulk marketing, or not a real human inquiry.
Mark genuine if a person is asking about vCards, pricing, demos, partnerships, support, or a normal business question — even if imperfect English.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ['verdict'],
        },
      },
    })

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('review-timeout')), REVIEW_TIMEOUT_MS)
    })

    const response = await Promise.race([work, timeout])
    const parsed = JSON.parse(response.text || '{}') as GeminiReview
    return parsed.verdict?.trim().toLowerCase() === 'spam' ? 'block' : 'allow'
  } catch {
    return 'allow'
  }
}
