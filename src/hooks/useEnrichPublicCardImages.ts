'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { PublicCardListItem } from '@/lib/publicCards/mapPublicCards'
import {
  applyPublicCardMediaEnrichment,
  needsPublicCardLocationEnrichment,
  needsPublicCardMediaEnrichment,
  resolvePublicCardMediaFromMyCard,
} from '@/lib/publicCards/enrichPublicCardMedia'
import { fetchMyCardBySlug } from '@/lib/publicCards/fetchMyCardBySlug'

const ENRICH_CONCURRENCY = 4

/**
 * When `/public-cards` returns the generic vBiz logo, fetch `GET /v/{slug}` and
 * use profile_media / intro_video — same source the live vCard profile uses.
 */
export function useEnrichPublicCardImages(cards: PublicCardListItem[], enrichLocationForSearch = false) {
  const [enrichedById, setEnrichedById] = useState<Record<number, PublicCardListItem>>({})
  const [enrichmentStatus, setEnrichmentStatus] = useState({ signature: '', completed: 0 })
  const inFlightRef = useRef(new Set<number>())
  const tokenRef = useRef(0)

  const cardsNeedingEnrichment = useMemo(() => {
    return cards.filter(
      (card) =>
        needsPublicCardMediaEnrichment(card) ||
        (enrichLocationForSearch && needsPublicCardLocationEnrichment(card))
    )
  }, [cards, enrichLocationForSearch])

  const enrichmentSignature = cardsNeedingEnrichment.map((card) => card.id).join('|')

  useEffect(() => {
    queueMicrotask(() => {
      setEnrichmentStatus({ signature: enrichmentSignature, completed: 0 })
    })

    if (cardsNeedingEnrichment.length === 0) return

    const token = ++tokenRef.current
    let cancelled = false
    let cursor = 0

    const enrichOne = async (card: PublicCardListItem) => {
      if (cancelled || inFlightRef.current.has(card.id)) return

      inFlightRef.current.add(card.id)
      try {
        const result = await fetchMyCardBySlug(card.slug)
        if (cancelled || token !== tokenRef.current) return

        const media = needsPublicCardMediaEnrichment(card)
          ? resolvePublicCardMediaFromMyCard(result)
          : { src: null, isVideo: false }
        const location = {
          city: result.profile.city,
          state: result.profile.state,
        }

        setEnrichedById((prev) => ({
          ...prev,
          [card.id]: applyPublicCardMediaEnrichment(card, media, location),
        }))
      } catch {
        // Keep initials fallback when profile fetch fails.
      } finally {
        inFlightRef.current.delete(card.id)
        if (!cancelled && token === tokenRef.current) {
          setEnrichmentStatus((prev) =>
            prev.signature === enrichmentSignature ? { ...prev, completed: prev.completed + 1 } : prev
          )
        }
      }
    }

    const worker = async () => {
      while (!cancelled && cursor < cardsNeedingEnrichment.length) {
        const card = cardsNeedingEnrichment[cursor++]
        await enrichOne(card)
      }
    }

    const poolSize = Math.min(ENRICH_CONCURRENCY, cardsNeedingEnrichment.length)
    for (let i = 0; i < poolSize; i++) void worker()

    return () => {
      cancelled = true
      tokenRef.current += 1
    }
  }, [cardsNeedingEnrichment, enrichmentSignature])

  const needingIds = useMemo(() => new Set(cardsNeedingEnrichment.map((card) => card.id)), [cardsNeedingEnrichment])

  const displayCards = useMemo(() => {
    return cards.map((card) => {
      if (needingIds.has(card.id) && enrichedById[card.id]) {
        return enrichedById[card.id]
      }
      return card
    })
  }, [cards, enrichedById, needingIds])

  const isEnrichingImages =
    cardsNeedingEnrichment.length > 0 &&
    (enrichmentStatus.signature !== enrichmentSignature ||
      enrichmentStatus.completed < cardsNeedingEnrichment.length)

  return { displayCards, isEnrichingImages }
}
