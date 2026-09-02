export type PublicCardId = string | number

export type PublicCard = {
  id: PublicCardId
  name: string
  slug: string
  profession: string | null
  profession_id: PublicCardId | null
  designation?: string | null
  image: string
  image_type: string
  is_video: boolean
  profile_url: string
}

export type PublicCardsFilterOption = {
  id: PublicCardId
  name: string
}

export type PublicCardsDropdowns = {
  states?: PublicCardsFilterOption[]
  cities?: PublicCardsFilterOption[]
  professions?: PublicCardsFilterOption[]
}

export type PublicCardsFiltersApplied = {
  state_id?: string | null
  city_id?: string | null
  profession_id?: string | null
  service?: string | null
}

export type PublicCardsPaginationLink = {
  url: string | null
  label: string
  active: boolean
}

export type PublicCardsPaginationMeta = {
  current_page: number
  last_page: number
  per_page: number
  total: number
  next_page_url: string | null
  prev_page_url: string | null
}

export type PublicCardsPaginatedData = {
  current_page: number
  data: PublicCard[]
  first_page_url?: string
  from?: number | null
  last_page: number
  last_page_url?: string
  links?: PublicCardsPaginationLink[]
  next_page_url?: string | null
  path?: string
  per_page: number
  prev_page_url?: string | null
  to?: number | null
  total: number
}

export type PublicCardsSearchParams = {
  page?: number
  per_page?: number
  state_id?: PublicCardId
  city_id?: PublicCardId
  profession_id?: PublicCardId
  service?: string
  search?: string
  dropdowns?: 0 | 1
}

export type PublicCardsResponse = {
  success: boolean
  data?: PublicCardsPaginatedData
  dropdowns?: PublicCardsDropdowns
  filters_applied?: PublicCardsFiltersApplied
  pagination?: PublicCardsPaginationMeta
  error?: string
}

export type PublicCardsQueryResult = {
  cards: PublicCard[]
  pagination: PublicCardsPaginatedData
  filtersApplied?: PublicCardsFiltersApplied
  dropdowns?: PublicCardsDropdowns
}
