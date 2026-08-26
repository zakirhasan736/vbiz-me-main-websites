import type { MyCardData, MyCardResponse } from '@/lib/publicCards/myCardTypes'
import { joinPublicApiPath } from '@/lib/publicCards/publicApi'

export async function fetchMyCardBySlug(slug: string, signal?: AbortSignal): Promise<MyCardData> {
  const url = joinPublicApiPath(`/v/${encodeURIComponent(slug.trim())}`)
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
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
