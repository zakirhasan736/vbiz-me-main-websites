export type PublicCard = {
  id: number
  name: string
  slug: string
  profession: string | null
  profession_id: number | null
  image: string
  image_type: string
  is_video: boolean
  profile_url: string
}

export type PublicCardsFilterOption = {
  id: number
  name: string
}

export type PublicCardsDropdowns = {
  states?: PublicCardsFilterOption[]
  cities?: PublicCardsFilterOption[]
  professions?: PublicCardsFilterOption[]
}

export type PublicCardsFiltersApplied = {
  state_id?: string
  city_id?: string
  profession_id?: string
  service?: string
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
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

export type PublicCardsSearchParams = {
  page?: number
  per_page?: number
  state_id?: number
  city_id?: number
  profession_id?: number
  service?: string
}

export type PublicCardsResponse = {
  success: boolean
  data?: PublicCardsPaginatedData
  dropdowns?: PublicCardsDropdowns
  filters_applied?: PublicCardsFiltersApplied
  error?: string
}

export type PublicCardsQueryResult = {
  cards: PublicCard[]
  pagination: PublicCardsPaginatedData
  filtersApplied?: PublicCardsFiltersApplied
  dropdowns?: PublicCardsDropdowns
}
