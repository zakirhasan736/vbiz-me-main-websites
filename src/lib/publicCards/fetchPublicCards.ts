import { normalizePublicCardsResponse } from '@/lib/publicCards/mapPublicCards'
import { getPublicCardAppBase, publicCardsRequestUrl } from '@/lib/publicCards/publicApi'
import { buildPublicCardsQueryPath } from '@/lib/publicCards/publicCardsSearch'
import type { PublicCardsQueryResult, PublicCardsResponse, PublicCardsSearchParams } from '@/lib/publicCards/types'

export async function fetchPublicCards(
  params?: PublicCardsSearchParams,
  signal?: AbortSignal
): Promise<PublicCardsQueryResult> {
  const path = buildPublicCardsQueryPath(params)
  const url = publicCardsRequestUrl(path)

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal,
  })

  if (res.status === 429) {
    throw new Error('Too many requests. Please wait a moment and try again.')
  }

  if (!res.ok) {
    throw new Error(`Failed to load public cards (${res.status})`)
  }

  const json = (await res.json()) as PublicCardsResponse
  return normalizePublicCardsResponse(json)
}

export function getPublicCardProfileUrl(card: { slug: string; profile_url?: string }): string {
  if (card.profile_url?.startsWith('http')) return card.profile_url
  const slug = card.slug?.trim()
  if (!slug) return getPublicCardAppBase()
  return `${getPublicCardAppBase()}/vCard/${encodeURIComponent(slug)}`
}
