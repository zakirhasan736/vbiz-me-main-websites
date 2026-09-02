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

/** Live demo / See it in action cards: `{BASE}/vCard/{slug}` */
export function vcardProfileUrl(slug: string): string {
  const trimmed = slug.trim().replace(/^\/+/, '')
  const path = trimmed.startsWith('vCard/') ? trimmed : trimmed.startsWith('v/') ? trimmed.replace(/^v\//, 'vCard/') : `vCard/${trimmed}`
  return `${getVcardDemoBaseUrl()}/${path}`
}

export function slugFromDemoUrl(url: string): string {
  try {
    const parts = new URL(url).pathname.replace(/^\//, '').split('/').filter(Boolean)
    if (parts[0] === 'vCard' || parts[0] === 'v') return parts[1] || parts[0] || url
    return parts.join('/') || url
  } catch {
    return url
  }
}
