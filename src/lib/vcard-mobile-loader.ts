/** Brief loader while a live vCard iframe connects (mobile popups & phone frames). */
export const VCARD_SHORT_LOADER = {
  compact: true,
  showUrlInLoader: false,
  minLoaderMs: 320,
  maxLoaderMs: 5000,
  shortLoader: true,
} as const;

/** Silent background preload — pair with overlay until {@link VCardShortPhoneLoader} clears. */
export const VCARD_SILENT_PRELOAD = {
  hideLoader: true,
} as const;

/** Default props for any visible mobile / modal vCard iframe. */
export const VCARD_MOBILE_FRAME_LOADER = VCARD_SHORT_LOADER;
