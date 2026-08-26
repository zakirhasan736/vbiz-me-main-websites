export const CONTACT_MIN_MESSAGE_CHARS = 40
export const CONTACT_MIN_MESSAGE_WORDS = 6
export const CONTACT_MAX_MESSAGE_CHARS = 4000
export const CONTACT_MIN_FILL_MS = 4000
export const CONTACT_MAX_FILL_MS = 1000 * 60 * 60 * 2

const SPAM_PHRASES = [
  'seo ranking',
  'backlink',
  'guest post',
  'link building',
  'crypto',
  'bitcoin',
  'forex',
  'casino',
  'viagra',
  'cialis',
  'loan approval',
  'make money fast',
  'click here',
  'onlyfans',
  'telegram.me',
  't.me/',
  'whatsapp group',
  'investment opportunity',
  'guaranteed profit',
]

export type ContactFieldErrors = {
  name?: string
  email?: string
  message?: string
  turnstile?: string
  confirm?: string
}

export type ContactProtectionResult = {
  ok: boolean
  errors: ContactFieldErrors
  wordCount: number
  charCount: number
}

function wordList(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 0)
}

function looksLikeGibberish(text: string): boolean {
  const letters = text.replace(/[^a-zA-Z]/g, '')
  if (letters.length < 20) return false
  const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length
  const vowelRatio = vowels / letters.length
  const unique = new Set(letters.toLowerCase()).size
  return vowelRatio < 0.18 || unique < 8
}

export function evaluateContactMessage(message: string): ContactProtectionResult {
  const trimmed = message.trim()
  const errors: ContactFieldErrors = {}
  const words = wordList(trimmed)
  const charCount = trimmed.length
  const wordCount = words.length
  const lower = trimmed.toLowerCase()

  if (!trimmed) {
    errors.message = 'Please write a message before sending.'
  } else if (charCount < CONTACT_MIN_MESSAGE_CHARS) {
    errors.message = `Please write at least ${CONTACT_MIN_MESSAGE_CHARS} characters so we understand what you need.`
  } else if (wordCount < CONTACT_MIN_MESSAGE_WORDS) {
    errors.message = `Please write at least ${CONTACT_MIN_MESSAGE_WORDS} words describing your request.`
  } else if (charCount > CONTACT_MAX_MESSAGE_CHARS) {
    errors.message = `Please keep your message under ${CONTACT_MAX_MESSAGE_CHARS} characters.`
  } else {
    const urls = trimmed.match(/https?:\/\/|www\./gi) || []
    if (urls.length >= 3) {
      errors.message = 'Please remove extra links and describe your request in your own words.'
    } else if (SPAM_PHRASES.some((phrase) => lower.includes(phrase))) {
      errors.message = 'Please write a genuine inquiry about vBiz Me in your own words.'
    } else if (/(.)\1{8,}/.test(trimmed)) {
      errors.message = 'Please write a real message without repeated characters.'
    } else if (looksLikeGibberish(trimmed)) {
      errors.message = 'Please write a clear message we can understand.'
    }
  }

  return {
    ok: !errors.message,
    errors,
    wordCount,
    charCount,
  }
}

export function evaluateContactFields(input: {
  name: string
  email: string
  message: string
}): ContactProtectionResult {
  const errors: ContactFieldErrors = {}
  const name = input.name.trim()
  const email = input.email.trim()

  if (!name) errors.name = 'Name is required'
  else if (name.length < 2) errors.name = 'Please enter your full name'
  else if (name.length > 120) errors.name = 'Name is too long'

  if (!email) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address'
  else if (email.length > 160) errors.email = 'Email is too long'

  const messageResult = evaluateContactMessage(input.message)
  Object.assign(errors, messageResult.errors)

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    wordCount: messageResult.wordCount,
    charCount: messageResult.charCount,
  }
}

export function isSuspiciousFillTime(startedAt: unknown): boolean {
  if (typeof startedAt !== 'number' || !Number.isFinite(startedAt)) return true
  const elapsed = Date.now() - startedAt
  return elapsed < CONTACT_MIN_FILL_MS || elapsed > CONTACT_MAX_FILL_MS
}
