'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { mapPublicCardToListItem, type PublicCardListItem } from '@/lib/publicCards/mapPublicCards'
import { fetchPublicCards } from '@/lib/publicCards/fetchPublicCards'
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
  PUBLIC_CARDS_INITIAL_PER_PAGE,
  PUBLIC_CARDS_MAX_PER_PAGE,
  PUBLIC_CARDS_SEARCH_MIN_CHARS,
  updatePublicCardsFilter,
  type PublicCardsFilterState,
} from '@/lib/publicCards/publicCardsSearch'
import { useEnrichPublicCardImages } from '@/hooks/useEnrichPublicCardImages'
import type { PublicCard, PublicCardsDropdowns } from '@/lib/publicCards/types'
import { sortPublicCardsByMediaPriority } from '@/lib/publicCards/publicCardImage'

function resetPagination(setters: {
  setExtraCards: (value: PublicCardListItem[]) => void
  setLoadedThroughPage: (value: number) => void
  setHasLoadedAll: (value: boolean) => void
}) {
  setters.setExtraCards([])
  setters.setLoadedThroughPage(1)
  setters.setHasLoadedAll(false)
}

function dedupePublicCards(cards: PublicCardListItem[]): PublicCardListItem[] {
  const seen = new Set<number>()
  return cards.filter((card) => {
    if (seen.has(card.id)) return false
    seen.add(card.id)
    return true
  })
}

function dedupeRawPublicCards(cards: PublicCard[]): PublicCard[] {
  const seen = new Set<number>()
  return cards.filter((card) => {
    if (seen.has(card.id)) return false
    seen.add(card.id)
    return true
  })
}

function hasStructuralPublicCardsFilters(filters: PublicCardsFilterState): boolean {
  return filters.stateId != null || filters.cityId != null || filters.professionId != null
}

export function usePublicCardsDirectory() {
  const [draftFilters, setDraftFilters] = useState<PublicCardsFilterState>(EMPTY_PUBLIC_CARDS_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<PublicCardsFilterState>(EMPTY_PUBLIC_CARDS_FILTERS)
  const [firstPageCards, setFirstPageCards] = useState<PublicCardListItem[]>([])
  const [extraCards, setExtraCards] = useState<PublicCardListItem[]>([])
  const [dropdowns, setDropdowns] = useState<PublicCardsDropdowns>({})
  const [total, setTotal] = useState(0)
  const [lastPage, setLastPage] = useState(1)
  const [loadedThroughPage, setLoadedThroughPage] = useState(1)
  const [hasLoadedAll, setHasLoadedAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isPrefetchingAll, setIsPrefetchingAll] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [catalogSnapshot, setCatalogSnapshot] = useState<PublicCard[]>([])

  const hasLoadedOnceRef = useRef(false)
  const prefetchTokenRef = useRef(0)

  const structuralFilters = useMemo<PublicCardsFilterState>(
    () => ({
      ...appliedFilters,
      service: '',
    }),
    [appliedFilters.cityId, appliedFilters.professionId, appliedFilters.stateId]
  )

  const hasStructuralFilters = hasStructuralPublicCardsFilters(appliedFilters)

  const loadedCards = useMemo(
    () => dedupePublicCards([...firstPageCards, ...extraCards]),
    [extraCards, firstPageCards]
  )

  const mergedDropdowns: PublicCardsDropdowns = useMemo(() => {
    const professionsFromCatalog = deriveProfessionOptionsFromPublicCards(catalogSnapshot)
    const professions =
      professionsFromCatalog.length > 0
        ? professionsFromCatalog
        : deriveProfessionOptionsFromListItems(loadedCards)

    return {
      ...dropdowns,
      professions,
    }
  }, [catalogSnapshot, dropdowns, loadedCards])

  const searchQuery = normalizePublicCardsSearchQuery(appliedFilters.service)
  const isSearchActive = isPublicCardsSearchReady(searchQuery)

  const { displayCards: enrichedLoadedCards, isEnrichingImages } = useEnrichPublicCardImages(
    loadedCards,
    isSearchActive
  )

  const cards = useMemo(() => {
    const filtered = isSearchActive
      ? filterPublicCardsByQuery(enrichedLoadedCards, searchQuery)
      : enrichedLoadedCards
    return sortPublicCardsByMediaPriority(filtered)
  }, [enrichedLoadedCards, isSearchActive, searchQuery])

  const isSinglePageResult = lastPage <= 1
  const effectiveHasLoadedAll = hasLoadedAll || isSinglePageResult
  const hasMore = !effectiveHasLoadedAll && loadedThroughPage < lastPage
  const remainingCount = Math.max(total - loadedCards.length, 0)
  const serverTotal = total

  const fetchFirstPage = useCallback(
    async (filters: PublicCardsFilterState, signal?: AbortSignal) => {
      setIsFetching(true)
      if (!hasLoadedOnceRef.current) setIsLoading(true)

      try {
        const structuralOnly: PublicCardsFilterState = { ...filters, service: '' }
        const result = await fetchPublicCards(
          buildPublicCardsSearchParams(structuralOnly, 1, {
            perPage: hasStructuralPublicCardsFilters(filters)
              ? PUBLIC_CARDS_INITIAL_PER_PAGE
              : PUBLIC_CARDS_CATALOG_PER_PAGE,
          }),
          signal
        )

        hasLoadedOnceRef.current = true
        const mapped = result.cards.map(mapPublicCardToListItem)
        setFirstPageCards(mapped)
        setDropdowns(result.dropdowns ?? {})
        setTotal(result.pagination.total)
        setLastPage(result.pagination.last_page)
        setLoadedThroughPage(1)
        setExtraCards([])
        setHasLoadedAll(result.pagination.last_page <= 1)
        setError(null)

        if (!hasStructuralPublicCardsFilters(filters)) {
          setCatalogSnapshot(dedupeRawPublicCards(result.cards))
        }
      } catch (err) {
        if (signal?.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to load public cards')
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false)
          setIsFetching(false)
        }
      }
    },
    []
  )

  useEffect(() => {
    const controller = new AbortController()
    void fetchFirstPage(appliedFilters, controller.signal)
    return () => controller.abort()
  }, [appliedFilters, fetchFirstPage])

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
    resetPagination({ setExtraCards, setLoadedThroughPage, setHasLoadedAll })
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
        resetPagination({ setExtraCards, setLoadedThroughPage, setHasLoadedAll })
        return next
      })
    },
    []
  )

  const clearFilters = useCallback(() => {
    setDraftFilters(EMPTY_PUBLIC_CARDS_FILTERS)
    setAppliedFilters(EMPTY_PUBLIC_CARDS_FILTERS)
    resetPagination({ setExtraCards, setLoadedThroughPage, setHasLoadedAll })
  }, [])

  const refetch = useCallback(() => {
    resetPagination({ setExtraCards, setLoadedThroughPage, setHasLoadedAll })
    setAppliedFilters((current) => ({ ...current }))
  }, [])

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return

    setIsLoadingMore(true)
    try {
      const nextPage = loadedThroughPage + 1
      const result = await fetchPublicCards(
        buildPublicCardsSearchParams(structuralFilters, nextPage, {
          perPage: PUBLIC_CARDS_INITIAL_PER_PAGE,
        })
      )
      setExtraCards((prev) => dedupePublicCards([...prev, ...result.cards.map(mapPublicCardToListItem)]))
      setLoadedThroughPage(nextPage)
      if (nextPage >= result.pagination.last_page) {
        setHasLoadedAll(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more cards')
    } finally {
      setIsLoadingMore(false)
    }
  }, [hasMore, isLoadingMore, loadedThroughPage, structuralFilters])

  const prefetchAllCards = useCallback(async () => {
    if (effectiveHasLoadedAll || isPrefetchingAll || isLoading) return

    const token = ++prefetchTokenRef.current
    setIsPrefetchingAll(true)

    try {
      if (lastPage <= 1) {
        if (token === prefetchTokenRef.current) setHasLoadedAll(true)
        return
      }

      if (total <= PUBLIC_CARDS_MAX_PER_PAGE) {
        const result = await fetchPublicCards(
          buildPublicCardsSearchParams(structuralFilters, 1, {
            perPage: total,
          })
        )

        if (token !== prefetchTokenRef.current) return

        const mapped = result.cards.map(mapPublicCardToListItem)
        setFirstPageCards(mapped.slice(0, PUBLIC_CARDS_INITIAL_PER_PAGE))
        setExtraCards(mapped.slice(PUBLIC_CARDS_INITIAL_PER_PAGE))
        setLoadedThroughPage(result.pagination.last_page)
        setHasLoadedAll(true)
        return
      }

      let page = loadedThroughPage + 1
      let accumulated = [...extraCards]

      while (page <= lastPage) {
        const result = await fetchPublicCards(
          buildPublicCardsSearchParams(structuralFilters, page, {
            perPage: PUBLIC_CARDS_INITIAL_PER_PAGE,
          })
        )

        if (token !== prefetchTokenRef.current) return

        accumulated = dedupePublicCards([...accumulated, ...result.cards.map(mapPublicCardToListItem)])
        setExtraCards(accumulated)
        setLoadedThroughPage(page)

        if (page >= lastPage) {
          setHasLoadedAll(true)
          break
        }

        page += 1
      }
    } finally {
      if (token === prefetchTokenRef.current) {
        setIsPrefetchingAll(false)
      }
    }
  }, [
    effectiveHasLoadedAll,
    extraCards,
    isLoading,
    isPrefetchingAll,
    lastPage,
    loadedThroughPage,
    structuralFilters,
    total,
  ])

  useEffect(() => {
    if (effectiveHasLoadedAll || isLoading) return
    if (isSearchActive || hasStructuralFilters) {
      queueMicrotask(() => {
        void prefetchAllCards()
      })
    }
  }, [
    appliedFilters.cityId,
    appliedFilters.professionId,
    appliedFilters.stateId,
    effectiveHasLoadedAll,
    hasStructuralFilters,
    isLoading,
    isSearchActive,
    prefetchAllCards,
  ])

  return {
    cards,
    loadedCards,
    dropdowns: mergedDropdowns,
    draftFilters,
    appliedFilters,
    hasActiveFilters: hasActivePublicCardsFilters(appliedFilters),
    isLoading,
    isFetching,
    isLoadingMore,
    isPrefetchingAll,
    isEnrichingImages,
    isSearching: isFetching && !isLoading,
    isSearchActive,
    searchQuery,
    error,
    hasMore,
    hasLoadedAll: effectiveHasLoadedAll,
    loadedCount: loadedCards.length,
    remainingCount,
    total: isSearchActive ? cards.length : serverTotal,
    serverTotal,
    setDraftFilter,
    applyFilters,
    updateAndApplyFilter,
    clearFilters,
    loadMore,
    prefetchAllCards,
    refetch,
  }
}
