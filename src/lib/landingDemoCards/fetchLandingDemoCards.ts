import { publicCardsRequestUrl } from '@/lib/publicCards/publicApi'
import type { LandingDemoCard, LandingDemoCardsResponse } from '@/lib/landingDemoCards/types'

export async function fetchLandingDemoCards(): Promise<LandingDemoCard[]> {
  const response = await fetch(publicCardsRequestUrl('/landing/demo-cards'), {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Landing demo cards failed (${response.status})`)
  }

  const payload = (await response.json()) as LandingDemoCardsResponse
  if (!payload.success || !Array.isArray(payload.data)) {
    throw new Error(payload.error || 'Landing demo cards response invalid')
  }

  return payload.data
}
