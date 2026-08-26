import type {
  PublicCard,
  PublicCardId,
  PublicCardsFiltersApplied,
  PublicCardsSearchParams,
} from '@/lib/publicCards/types'

export const PUBLIC_CARDS_SEARCH_MIN_CHARS = 2
export const PUBLIC_CARDS_SEARCH_DEBOUNCE_MS = 350
export const PUBLIC_CARDS_INITIAL_PER_PAGE = 20
/** Backend max is 100 — one request loads as many public owners as allowed. */
export const PUBLIC_CARDS_CATALOG_PER_PAGE = 100
export const PUBLIC_CARDS_MAX_PER_PAGE = 100

export type PublicCardsFilterState = {
  stateId: PublicCardId | null
  cityId: PublicCardId | null
  professionId: PublicCardId | null
  service: string
}

export const EMPTY_PUBLIC_CARDS_FILTERS: PublicCardsFilterState = {
  stateId: null,
  cityId: null,
  professionId: null,
  service: '',
}

export function hasActivePublicCardsFilters(filters: PublicCardsFilterState): boolean {
  return (
    filters.stateId != null ||
    filters.cityId != null ||
    filters.professionId != null ||
    isPublicCardsSearchReady(filters.service)
  )
}

export function isPublicCardsSearchReady(query: string): boolean {
  return query.trim().length >= PUBLIC_CARDS_SEARCH_MIN_CHARS
}

export function normalizePublicCardsSearchQuery(query: string): string {
  return query.trim()
}

export function buildPublicCardsSearchParams(
  filters: PublicCardsFilterState,
  page?: number,
  options?: { perPage?: number }
): PublicCardsSearchParams {
  const params: PublicCardsSearchParams = {}

  if (page != null && page > 0) params.page = page
  if (options?.perPage != null && options.perPage > 0) params.per_page = options.perPage
  if (filters.stateId != null && filters.stateId !== '') params.state_id = filters.stateId
  if (filters.cityId != null && filters.cityId !== '') params.city_id = filters.cityId
  if (filters.professionId != null && filters.professionId !== '') params.profession_id = filters.professionId

  const service = normalizePublicCardsSearchQuery(filters.service)
  if (isPublicCardsSearchReady(service)) {
    params.service = service
    params.search = service
  }

  return params
}

export function buildPublicCardsQueryPath(params?: PublicCardsSearchParams): string {
  const search = new URLSearchParams()

  if (params?.page) search.set('page', String(params.page))
  if (params?.per_page) search.set('per_page', String(params.per_page))
  if (params?.state_id != null && params.state_id !== '') search.set('state_id', String(params.state_id))
  if (params?.city_id != null && params.city_id !== '') search.set('city_id', String(params.city_id))
  if (params?.profession_id != null && params.profession_id !== '') {
    search.set('profession_id', String(params.profession_id))
  }
  if (params?.service) search.set('service', params.service)
  if (params?.search) search.set('search', params.search)

  const qs = search.toString()
  return `/public-cards${qs ? `?${qs}` : ''}`
}

export function deriveProfessionOptionsFromPublicCards(
  cards: PublicCard[]
): { id: PublicCardId; name: string }[] {
  const byId = new Map<string, string>()

  for (const card of cards) {
    if (card.profession_id == null) continue
    const name = card.profession?.trim()
    if (!name) continue
    byId.set(String(card.profession_id), name)
  }

  return Array.from(byId.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function deriveProfessionOptionsFromListItems(
  cards: Array<{ professionId: PublicCardId | null; profession: string }>
): { id: PublicCardId; name: string }[] {
  const byId = new Map<string, string>()

  for (const card of cards) {
    if (card.professionId == null) continue
    const name = card.profession?.trim()
    if (!name || name === 'Professional') continue
    byId.set(String(card.professionId), name)
  }

  return Array.from(byId.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function filterPublicCardsByQuery<
  T extends { name: string; profession: string; slug: string; city?: string | null; state?: string | null },
>(cards: T[], query: string): T[] {
  const normalized = normalizePublicCardsSearchQuery(query).toLowerCase()
  if (!isPublicCardsSearchReady(normalized)) return cards

  return cards.filter((card) => {
    const haystack = [card.name, card.profession, card.slug, card.city, card.state]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(normalized)
  })
}

function parseFilterId(value?: string | null): PublicCardId | null {
  if (!value) return null
  const asNumber = Number(value)
  if (Number.isFinite(asNumber) && String(asNumber) === value) return asNumber
  return value
}

export function parsePublicCardsFiltersApplied(applied?: PublicCardsFiltersApplied): PublicCardsFilterState {
  if (!applied) return { ...EMPTY_PUBLIC_CARDS_FILTERS }

  return {
    stateId: parseFilterId(applied.state_id),
    cityId: parseFilterId(applied.city_id),
    professionId: parseFilterId(applied.profession_id),
    service: applied.service ?? '',
  }
}

export function updatePublicCardsFilter<K extends keyof PublicCardsFilterState>(
  filters: PublicCardsFilterState,
  key: K,
  value: PublicCardsFilterState[K]
): PublicCardsFilterState {
  const next = { ...filters, [key]: value }

  if (key === 'stateId') {
    next.cityId = null
  }

  return next
}
