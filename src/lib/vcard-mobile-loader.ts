import { getVcardDemoOrigin } from './vcard-profile-url'

/** Brief loader while a live vCard iframe connects (mobile popups & phone frames). */
export const VCARD_SHORT_LOADER = {
  compact: true,
  showUrlInLoader: false,
  minLoaderMs: 320,
  maxLoaderMs: 1700,
  shortLoader: true,
} as const

function embedOrigins(): string[] {
  return Array.from(
    new Set(
      [
        getVcardDemoOrigin(),
        'https://app.nextcreavo.com',
        'https://app.vbizme.com',
        'https://vcard.vbizme.com',
      ].filter(Boolean)
    )
  )
}

function permissionsForFeature(feature: string): string {
  const allow = embedOrigins()
    .map((origin) => `"${origin}"`)
    .join(' ')
  return `${feature}=(self ${allow})`
}

/** Permissions delegated to embedded live-demo vCard iframes (video autoplay, fullscreen, etc.). */
export const VCARD_IFRAME_ALLOW =
  'autoplay *; fullscreen *; encrypted-media *; picture-in-picture *; accelerometer *; gyroscope *; clipboard-write; web-share'

/** Parent Permissions-Policy — must allow delegating media features to vcard embeds. */
export const VCARD_EMBED_PERMISSIONS_POLICY = [
  'microphone=(self)',
  permissionsForFeature('autoplay'),
  permissionsForFeature('fullscreen'),
  permissionsForFeature('encrypted-media'),
  permissionsForFeature('picture-in-picture'),
].join(', ')

/** Silent background preload — pair with overlay until {@link VCardShortPhoneLoader} clears. */
export const VCARD_SILENT_PRELOAD = {
  hideLoader: true,
} as const

/** Default props for any visible mobile / modal vCard iframe. */
export const VCARD_MOBILE_FRAME_LOADER = VCARD_SHORT_LOADER
