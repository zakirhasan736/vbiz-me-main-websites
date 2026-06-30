'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchPublicCards } from '@/lib/publicCards/fetchPublicCards'
import {
  buildPublicCardsSearchParams,
  EMPTY_PUBLIC_CARDS_FILTERS,
  hasActivePublicCardsFilters,
  updatePublicCardsFilter,
  type PublicCardsFilterState,
} from '@/lib/publicCards/publicCardsSearch'
import type { PublicCard, PublicCardsDropdowns } from '@/lib/publicCards/types'

function resetPagination(setters: {
  setExtraCards: (value: PublicCard[]) => void
  setLoadedThroughPage: (value: number) => void
}) {
  setters.setExtraCards([])
  setters.setLoadedThroughPage(1)
}

export function usePublicCardsDirectory() {
  const [draftFilters, setDraftFilters] = useState<PublicCardsFilterState>(EMPTY_PUBLIC_CARDS_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<PublicCardsFilterState>(EMPTY_PUBLIC_CARDS_FILTERS)
  const [firstPageCards, setFirstPageCards] = useState<PublicCard[]>([])
  const [extraCards, setExtraCards] = useState<PublicCard[]>([])
  const [dropdowns, setDropdowns] = useState<PublicCardsDropdowns>({})
  const [total, setTotal] = useState(0)
  const [lastPage, setLastPage] = useState(1)
  const [loadedThroughPage, setLoadedThroughPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cards = useMemo(() => [...firstPageCards, ...extraCards], [firstPageCards, extraCards])
  const hasMore = loadedThroughPage < lastPage

  const hasLoadedOnceRef = useRef(false)

  const fetchFirstPage = useCallback(async (filters: PublicCardsFilterState, signal?: AbortSignal) => {
    setIsFetching(true)
    if (!hasLoadedOnceRef.current) setIsLoading(true)

    try {
      const result = await fetchPublicCards(buildPublicCardsSearchParams(filters, 1), signal)
      hasLoadedOnceRef.current = true
      setFirstPageCards(result.cards)
      setDropdowns(result.dropdowns ?? {})
      setTotal(result.pagination.total)
      setLastPage(result.pagination.last_page)
      setLoadedThroughPage(1)
      setExtraCards([])
      setError(null)
    } catch (err) {
      if (signal?.aborted) return
      setError(err instanceof Error ? err.message : 'Failed to load public cards')
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false)
        setIsFetching(false)
      }
    }
  }, [])

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
    const nextApplied = { ...draftFilters, service: draftFilters.service.trim() }
    setDraftFilters(nextApplied)
    setAppliedFilters(nextApplied)
    resetPagination({ setExtraCards, setLoadedThroughPage })
  }, [draftFilters])

  const updateAndApplyFilter = useCallback(
    <K extends keyof PublicCardsFilterState>(key: K, value: PublicCardsFilterState[K]) => {
      setDraftFilters((prev) => {
        const next = updatePublicCardsFilter(prev, key, value)
        const applied = { ...next, service: next.service.trim() }
        setAppliedFilters(applied)
        resetPagination({ setExtraCards, setLoadedThroughPage })
        return next
      })
    },
    []
  )

  const clearFilters = useCallback(() => {
    setDraftFilters(EMPTY_PUBLIC_CARDS_FILTERS)
    setAppliedFilters(EMPTY_PUBLIC_CARDS_FILTERS)
    resetPagination({ setExtraCards, setLoadedThroughPage })
  }, [])

  const refetch = useCallback(() => {
    resetPagination({ setExtraCards, setLoadedThroughPage })
    setAppliedFilters((current) => ({ ...current }))
  }, [])

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return

    setIsLoadingMore(true)
    try {
      const nextPage = loadedThroughPage + 1
      const result = await fetchPublicCards(buildPublicCardsSearchParams(appliedFilters, nextPage))
      setExtraCards((prev) => [...prev, ...result.cards])
      setLoadedThroughPage(nextPage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more cards')
    } finally {
      setIsLoadingMore(false)
    }
  }, [appliedFilters, hasMore, isLoadingMore, loadedThroughPage])

  return {
    cards,
    dropdowns,
    draftFilters,
    appliedFilters,
    hasActiveFilters: hasActivePublicCardsFilters(appliedFilters),
    isLoading,
    isFetching,
    isLoadingMore,
    isSearching: isFetching && !isLoading,
    error,
    hasMore,
    total,
    setDraftFilter,
    applyFilters,
    updateAndApplyFilter,
    clearFilters,
    loadMore,
    refetch,
  }
}
