const WINDOW_MS = 60 * 60 * 1000
const MAX_ATTEMPTS = 5
const hits = new Map<string, number[]>()

export function isContactRateLimited(ip: string): boolean {
  const key = ip.trim() || 'unknown'
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((stamp) => now - stamp < WINDOW_MS)
  if (recent.length >= MAX_ATTEMPTS) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  return false
}

export function getRequestIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}
