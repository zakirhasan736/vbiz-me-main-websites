const DEFAULT_VCARD_DEMO_BASE_URL = 'https://app.nextcreavo.com'

export function getVcardDemoBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_VCARD_DEMO_BASE_URL || DEFAULT_VCARD_DEMO_BASE_URL).replace(/\/$/, '')
}

export function getVcardDemoOrigin(): string {
  try {
    return new URL(getVcardDemoBaseUrl()).origin
  } catch {
    return DEFAULT_VCARD_DEMO_BASE_URL
  }
}

export function getVcardDemoHostLabel(): string {
  try {
    return new URL(getVcardDemoBaseUrl()).host
  } catch {
    return 'app.nextcreavo.com'
  }
}

/** Live demo / See it in action cards: `{BASE}/v/{slug}` */
export function vcardProfileUrl(slug: string): string {
  const trimmed = slug.trim().replace(/^\/+/, '')
  const path = trimmed.startsWith('v/') ? trimmed : `v/${trimmed}`
  return `${getVcardDemoBaseUrl()}/${path}`
}

export function slugFromDemoUrl(url: string): string {
  try {
    return new URL(url).pathname.replace(/^\//, '') || url
  } catch {
    return url
  }
}
