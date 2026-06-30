export type MyCardMediaBlock = {
  enabled?: boolean
  video_url?: string | null
  url?: string | null
  extension?: string
  is_video?: boolean
  regular_video?: { url?: string | null; extension?: string }
}

export type MyCardProfile = {
  city: string | null
  state: string | null
}

export type MyCardData = {
  profile: MyCardProfile
  intro_video: MyCardMediaBlock
  profile_media: MyCardMediaBlock
}

export type MyCardResponse = {
  success: boolean
  data?: MyCardData
  error?: string
}
