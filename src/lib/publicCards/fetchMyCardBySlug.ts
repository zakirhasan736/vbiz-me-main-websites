import type { MyCardData, MyCardResponse } from '@/lib/publicCards/myCardTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://app.vbizme.com/api'

export async function fetchMyCardBySlug(slug: string, signal?: AbortSignal): Promise<MyCardData> {
  const url = `${API_BASE.replace(/\/$/, '')}/v/${encodeURIComponent(slug.trim())}`
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!res.ok) {
    throw new Error(`Failed to load profile (${res.status})`)
  }

  const json = (await res.json()) as MyCardResponse
  if (!json.success || !json.data) {
    throw new Error(json.error || 'Failed to load profile')
  }

  return json.data
}
