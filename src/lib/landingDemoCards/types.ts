export type LandingDemoCard = {
  id: string
  category: string
  slug: string
  name: string | null
  designation: string | null
  avatar_url: string | null
  avatar_is_video: boolean
  initials: string
  profile_path: string
  sort_order: number
}

export type LandingDemoCardsResponse = {
  success: boolean
  data?: LandingDemoCard[]
  error?: string
}
