/** Brief loader while a live vCard iframe connects (mobile popups & phone frames). */
export const VCARD_SHORT_LOADER = {
  compact: true,
  showUrlInLoader: false,
  minLoaderMs: 320,
  maxLoaderMs: 1700,
  shortLoader: true,
} as const;

/** Permissions delegated to embedded vcard.vbizme.com iframes (video autoplay, fullscreen, etc.). */
export const VCARD_IFRAME_ALLOW =
  'autoplay *; fullscreen *; encrypted-media *; picture-in-picture *; accelerometer *; gyroscope *; clipboard-write; web-share';

/** Parent Permissions-Policy — must allow delegating media features to vcard embeds. */
export const VCARD_EMBED_PERMISSIONS_POLICY =
  'microphone=(self), autoplay=(self "https://vcard.vbizme.com"), fullscreen=(self "https://vcard.vbizme.com"), encrypted-media=(self "https://vcard.vbizme.com"), picture-in-picture=(self "https://vcard.vbizme.com")';

/** Silent background preload — pair with overlay until {@link VCardShortPhoneLoader} clears. */
export const VCARD_SILENT_PRELOAD = {
  hideLoader: true,
} as const;

/** Default props for any visible mobile / modal vCard iframe. */
export const VCARD_MOBILE_FRAME_LOADER = VCARD_SHORT_LOADER;
