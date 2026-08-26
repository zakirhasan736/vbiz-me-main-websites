import { NextRequest, NextResponse } from 'next/server'
import { joinPublicApiPath } from '@/lib/publicCards/publicApi'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

async function proxyPublicApi(request: NextRequest, path: string[]) {
  const search = request.nextUrl.search
  const target = joinPublicApiPath(`/${path.join('/')}${search}`)
  const forwarded = request.headers.get('x-forwarded-for')
  const clientIp = request.headers.get('x-real-ip') || request.ip

  try {
    const response = await fetch(target, {
      method: request.method,
      headers: {
        Accept: request.headers.get('accept') || 'application/json',
        ...(forwarded || clientIp ? { 'X-Forwarded-For': forwarded || clientIp } : {}),
      },
      cache: 'no-store',
    })

    const body = await response.text()
    return new NextResponse(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to reach public cards API' }, { status: 502 })
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  if (!path?.length) {
    return NextResponse.json({ success: false, error: 'Missing path' }, { status: 400 })
  }
  return proxyPublicApi(request, path)
}
