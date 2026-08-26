import { NextResponse } from 'next/server'
import { resolveLiveAgentVoice } from '@/lib/live-agent-voices'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function backendPublicBase(): string {
  const raw = (process.env.VBIZ_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.vbizme.com/api/v1').replace(
    /\/$/,
    ''
  )
  if (raw.endsWith('/v1/public')) return raw
  if (raw.endsWith('/api/v1')) return `${raw}/public`
  if (raw.endsWith('/api')) return `${raw}/v1/public`
  return `${raw}/api/v1/public`
}

function unwrapLiveToken(payload: unknown): { token?: string; model?: string; expiresAt?: string; message?: string } {
  if (!payload || typeof payload !== 'object') return {}
  const root = payload as Record<string, unknown>
  const nested =
    root.data && typeof root.data === 'object' && !Array.isArray(root.data)
      ? (root.data as Record<string, unknown>)
      : root
  return {
    token: typeof nested.token === 'string' ? nested.token : undefined,
    model: typeof nested.model === 'string' ? nested.model : undefined,
    expiresAt: typeof nested.expiresAt === 'string' ? nested.expiresAt : undefined,
    message: typeof root.message === 'string' ? root.message : typeof root.error === 'string' ? root.error : undefined,
  }
}

export async function POST() {
  const voice = resolveLiveAgentVoice()
  try {
    const response = await fetch(`${backendPublicBase()}/landing/assistant/live-token`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    const payload = await response.json().catch(() => null)
    const data = unwrapLiveToken(payload)

    if (!response.ok || !data.token || !data.model || !data.expiresAt) {
      return NextResponse.json(
        {
          configured: false,
          voice,
          message:
            data.message ||
            'The live assistant could not start. Check GEMINI_API_KEY on vbiz-me-backend and try again.',
        },
        { status: response.ok ? 503 : response.status }
      )
    }

    return NextResponse.json({
      configured: true,
      token: data.token,
      model: data.model,
      expiresAt: data.expiresAt,
      voice,
    })
  } catch {
    return NextResponse.json(
      {
        configured: false,
        voice,
        message: 'Could not reach the vBiz Me API for a live assistant session.',
      },
      { status: 503 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    configured: true,
    voice: resolveLiveAgentVoice(),
    message: 'Use POST /api/live-agent/config to start a session. The Gemini API key stays on the backend.',
  })
}
