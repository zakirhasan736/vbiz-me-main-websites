'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { mapPublicCardToListItem, type PublicCardListItem } from '@/lib/publicCards/mapPublicCards'
import {
  buildPublicCardsSearchParams,
  deriveProfessionOptionsFromListItems,
  deriveProfessionOptionsFromPublicCards,
  EMPTY_PUBLIC_CARDS_FILTERS,
  filterPublicCardsByQuery,
  hasActivePublicCardsFilters,
  isPublicCardsSearchReady,
  normalizePublicCardsSearchQuery,
  PUBLIC_CARDS_CATALOG_PER_PAGE,
  PUBLIC_CARDS_SEARCH_MIN_CHARS,
  updatePublicCardsFilter,
  type PublicCardsFilterState,
} from '@/lib/publicCards/publicCardsSearch'
import { useEnrichPublicCardImages } from '@/hooks/useEnrichPublicCardImages'
import type { PublicCard, PublicCardsDropdowns } from '@/lib/publicCards/types'
import { sortPublicCardsByMediaPriority } from '@/lib/publicCards/publicCardImage'
import { useGetPublicCardsQuery, useLazyGetPublicCardsQuery } from '@/redux/publicCards.api'

function dedupePublicCards(cards: PublicCardListItem[]): PublicCardListItem[] {
  const seen = new Set<string>()
  return cards.filter((card) => {
    const key = String(card.id)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function dedupeRawPublicCards(cards: PublicCard[]): PublicCard[] {
  const seen = new Set<string>()
  return cards.filter((card) => {
    const key = String(card.id)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function usePublicCardsDirectory(priorityCardIds: Array<string | number> = []) {
  const [draftFilters, setDraftFilters] = useState<PublicCardsFilterState>(EMPTY_PUBLIC_CARDS_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<PublicCardsFilterState>(EMPTY_PUBLIC_CARDS_FILTERS)
  const [extraCards, setExtraCards] = useState<PublicCardListItem[]>([])
  const [isPrefetchingAll, setIsPrefetchingAll] = useState(false)
  const prefetchTokenRef = useRef(0)

  const catalogParams = useMemo(
    () =>
      buildPublicCardsSearchParams(
        { ...appliedFilters, service: '' },
        1,
        { perPage: PUBLIC_CARDS_CATALOG_PER_PAGE, dropdowns: 1 }
      ),
    [appliedFilters.cityId, appliedFilters.professionId, appliedFilters.stateId]
  )

  const { data, isLoading, isFetching, error, refetch } = useGetPublicCardsQuery(catalogParams)
  const [fetchPage] = useLazyGetPublicCardsQuery()

  const firstCards = useMemo(() => data?.cards.map(mapPublicCardToListItem) ?? [], [data?.cards])
  const loadedCards = useMemo(() => dedupePublicCards([...firstCards, ...extraCards]), [extraCards, firstCards])

  const dropdowns: PublicCardsDropdowns = useMemo(() => {
    const apiDropdowns = data?.dropdowns ?? {}
    const professionsFromCatalog = deriveProfessionOptionsFromPublicCards(dedupeRawPublicCards(data?.cards ?? []))
    const professions =
      professionsFromCatalog.length > 0 ? professionsFromCatalog : deriveProfessionOptionsFromListItems(loadedCards)

    return {
      ...apiDropdowns,
      professions: professions.length > 0 ? professions : apiDropdowns.professions,
    }
  }, [data?.cards, data?.dropdowns, loadedCards])

  const searchQuery = normalizePublicCardsSearchQuery(appliedFilters.service)
  const isSearchActive = isPublicCardsSearchReady(searchQuery)

  const { displayCards: enrichedLoadedCards, isEnrichingImages } = useEnrichPublicCardImages(
    loadedCards,
    isSearchActive,
    priorityCardIds
  )

  const cards = useMemo(() => {
    const filtered = isSearchActive
      ? filterPublicCardsByQuery(enrichedLoadedCards, searchQuery)
      : enrichedLoadedCards
    return sortPublicCardsByMediaPriority(filtered)
  }, [enrichedLoadedCards, isSearchActive, searchQuery])

  const lastPage = data?.pagination.last_page ?? 1
  const serverTotal = data?.pagination.total ?? 0
  const remainingPagesLoaded = extraCards.length > 0 || lastPage <= 1
  const hasLoadedAll = remainingPagesLoaded || firstCards.length >= serverTotal
  const hasMore = !hasLoadedAll
  const catalogKey = `${JSON.stringify(catalogParams)}:${lastPage}:${serverTotal}`
  const loadedCatalogKeyRef = useRef('')

  useEffect(() => {
    loadedCatalogKeyRef.current = ''
    setExtraCards([])
  }, [catalogParams])

  useEffect(() => {
    if (!data || isFetching) return
    if (lastPage <= 1) {
      loadedCatalogKeyRef.current = catalogKey
      return
    }
    if (loadedCatalogKeyRef.current === catalogKey) return

    const token = ++prefetchTokenRef.current
    setIsPrefetchingAll(true)

    void (async () => {
      try {
        const collected: PublicCardListItem[] = []
        for (let page = 2; page <= lastPage; page += 1) {
          const result = await fetchPage(
            buildPublicCardsSearchParams(
              { ...appliedFilters, service: '' },
              page,
              { perPage: PUBLIC_CARDS_CATALOG_PER_PAGE, dropdowns: 0 }
            )
          ).unwrap()
          if (token !== prefetchTokenRef.current) return
          collected.push(...result.cards.map(mapPublicCardToListItem))
        }
        if (token === prefetchTokenRef.current) {
          loadedCatalogKeyRef.current = catalogKey
          setExtraCards(dedupePublicCards(collected))
        }
      } finally {
        if (token === prefetchTokenRef.current) setIsPrefetchingAll(false)
      }
    })()
  }, [appliedFilters, catalogKey, data, fetchPage, isFetching, lastPage])

  const setDraftFilter = useCallback(
    <K extends keyof PublicCardsFilterState>(key: K, value: PublicCardsFilterState[K]) => {
      setDraftFilters((prev) => updatePublicCardsFilter(prev, key, value))
    },
    []
  )

  const applyFilters = useCallback(() => {
    const trimmedService = normalizePublicCardsSearchQuery(draftFilters.service)
    const nextApplied = {
      ...draftFilters,
      service:
        trimmedService.length > 0 && trimmedService.length < PUBLIC_CARDS_SEARCH_MIN_CHARS ? '' : trimmedService,
    }
    setDraftFilters(nextApplied)
    setAppliedFilters(nextApplied)
    setExtraCards([])
  }, [draftFilters])

  const updateAndApplyFilter = useCallback(
    <K extends keyof PublicCardsFilterState>(key: K, value: PublicCardsFilterState[K]) => {
      setDraftFilters((prev) => {
        const next = updatePublicCardsFilter(prev, key, value)
        const trimmedService = normalizePublicCardsSearchQuery(next.service)
        const applied = {
          ...next,
          service:
            key === 'service' && trimmedService.length > 0 && trimmedService.length < PUBLIC_CARDS_SEARCH_MIN_CHARS
              ? ''
              : trimmedService,
        }
        setAppliedFilters(applied)
        setExtraCards([])
        return next
      })
    },
    []
  )

  const clearFilters = useCallback(() => {
    setDraftFilters(EMPTY_PUBLIC_CARDS_FILTERS)
    setAppliedFilters(EMPTY_PUBLIC_CARDS_FILTERS)
    setExtraCards([])
  }, [])

  return {
    cards,
    loadedCards,
    dropdowns,
    draftFilters,
    appliedFilters,
    hasActiveFilters: hasActivePublicCardsFilters(appliedFilters),
    isLoading,
    isFetching,
    isLoadingMore: false,
    isPrefetchingAll,
    isEnrichingImages,
    isSearching: isFetching && !isLoading,
    isSearchActive,
    searchQuery,
    error: error ? 'Failed to load public cards' : null,
    hasMore,
    hasLoadedAll,
    loadedCount: loadedCards.length,
    remainingCount: Math.max(serverTotal - loadedCards.length, 0),
    total: isSearchActive ? cards.length : serverTotal,
    serverTotal,
    setDraftFilter,
    applyFilters,
    updateAndApplyFilter,
    clearFilters,
    loadMore: async () => undefined,
    prefetchAllCards: async () => undefined,
    refetch,
  }
}
