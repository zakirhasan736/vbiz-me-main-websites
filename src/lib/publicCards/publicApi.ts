/**
 * Same public API base as administration and Live Agent.
 * Example: https://api.vbizme.com/api/v1/public
 */
export function getVbizApiBase(): string {
  return (process.env.VBIZ_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.vbizme.com/api/v1').replace(
    /\/$/,
    ''
  )
}

export function getPublicApiBase(): string {
  const raw = getVbizApiBase()
  if (raw.endsWith('/v1/public') || raw.endsWith('/public')) return raw
  if (raw.endsWith('/api/v1')) return `${raw}/public`
  if (raw.endsWith('/api')) return `${raw}/v1/public`
  return `${raw}/api/v1/public`
}

export function getPublicCardAppBase(): string {
  return (process.env.NEXT_PUBLIC_VCARD_APP_URL || 'https://app.vbizme.com').replace(/\/$/, '')
}

export function joinPublicApiPath(path: string): string {
  const base = getPublicApiBase()
  const suffix = path.startsWith('/') ? path : `/${path}`
  if (suffix.startsWith('/public/')) {
    return `${base}${suffix.slice('/public'.length)}`
  }
  return `${base}${suffix}`
}
