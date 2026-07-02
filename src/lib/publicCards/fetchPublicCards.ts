import { buildPublicCardsQueryPath } from '@/lib/publicCards/publicCardsSearch'
import type { PublicCardsQueryResult, PublicCardsResponse, PublicCardsSearchParams } from '@/lib/publicCards/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://app.vbizme.com/api'

function normalizePublicCardsResponse(response: PublicCardsResponse): PublicCardsQueryResult {
  if (!response.success || !response.data) {
    throw new Error(response.error || 'Failed to load public cards')
  }

  return {
    cards: response.data.data,
    pagination: response.data,
    filtersApplied: response.filters_applied,
    dropdowns: response.dropdowns,
  }
}

export async function fetchPublicCards(
  params?: PublicCardsSearchParams,
  signal?: AbortSignal
): Promise<PublicCardsQueryResult> {
  const path = buildPublicCardsQueryPath(params)
  const url = `${API_BASE.replace(/\/$/, '')}${path}`

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
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
  if (card.profile_url) return card.profile_url
  return `https://vcard.vbizme.com/${card.slug}`
}
