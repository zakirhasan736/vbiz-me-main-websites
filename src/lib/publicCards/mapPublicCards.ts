import { initialsFromPublicCardName, resolvePublicCardImage } from '@/lib/publicCards/publicCardImage'
import type { PublicCard } from '@/lib/publicCards/types'

export type PublicCardListItem = {
  id: number
  name: string
  profession: string
  professionId: number | null
  img: string | null
  isVideo: boolean
  initials: string
  slug: string
  city: string | null
  state: string | null
}

export function mapPublicCardToListItem(card: PublicCard): PublicCardListItem {
  const image = resolvePublicCardImage(card)
  return {
    id: card.id,
    name: card.name,
    profession: card.profession?.trim() || 'Professional',
    professionId: card.profession_id,
    img: image.src,
    isVideo: image.isVideo,
    initials: initialsFromPublicCardName(card.name),
    slug: card.slug,
    city: null,
    state: null,
  }
}
