import type { PublicCardListItem } from '@/lib/publicCards/mapPublicCards'
import { initialsFromPublicCardName, isGenericPublicCardImage } from '@/lib/publicCards/publicCardImage'
import type { MyCardData, MyCardMediaBlock } from '@/lib/publicCards/myCardTypes'

function resolveMediaBlock(block?: MyCardMediaBlock | null): { src: string | null; isVideo: boolean } {
  if (!block?.enabled) return { src: null, isVideo: false }

  const candidates: Array<{ url?: string | null; isVideo?: boolean; extension?: string }> = [
    { url: block.url, isVideo: block.is_video, extension: block.extension },
    { url: block.video_url, isVideo: true, extension: block.extension },
    { url: block.regular_video?.url, isVideo: true, extension: block.regular_video?.extension },
  ]

  for (const candidate of candidates) {
    const url = candidate.url?.trim()
    if (!url || isGenericPublicCardImage(url)) continue

    const isVideo =
      candidate.isVideo === true ||
      candidate.extension?.toLowerCase() === 'mp4' ||
      candidate.extension?.toLowerCase() === 'webm' ||
      /\.(mp4|webm|mov)(\?|$)/i.test(url)

    return { src: url, isVideo }
  }

  return { src: null, isVideo: false }
}

export function resolvePublicCardMediaFromMyCard(data: MyCardData): { src: string | null; isVideo: boolean } {
  const fromProfile = resolveMediaBlock(data.profile_media)
  if (fromProfile.src) return fromProfile

  const fromIntro = resolveMediaBlock(data.intro_video)
  if (fromIntro.src) return fromIntro

  return { src: null, isVideo: false }
}

export function needsPublicCardMediaEnrichment(item: PublicCardListItem): boolean {
  return !item.img
}

export function needsPublicCardLocationEnrichment(item: PublicCardListItem): boolean {
  return !item.city && !item.state
}

export function applyPublicCardMediaEnrichment(
  item: PublicCardListItem,
  media: { src: string | null; isVideo: boolean },
  location?: { city: string | null; state: string | null }
): PublicCardListItem {
  const next: PublicCardListItem = { ...item }

  if (location) {
    next.city = location.city?.trim() || null
    next.state = location.state?.trim() || null
  }

  if (!media.src) return next

  return {
    ...next,
    img: media.src,
    isVideo: media.isVideo,
  }
}

export function createFallbackPublicCardListItem(item: PublicCardListItem): PublicCardListItem {
  return {
    ...item,
    initials: initialsFromPublicCardName(item.name),
  }
}
