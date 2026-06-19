/** Flat SVG assets for capability cards — one DOM node per icon (vs Lucide svg + paths). */
export const CAPABILITY_ICON_SRC = {
  edit: '/icons/capability/edit.svg',
  video: '/icons/capability/video.svg',
  sparkles: '/icons/capability/sparkles.svg',
  layers: '/icons/capability/layers.svg',
  'trending-up': '/icons/capability/trending-up.svg',
  'qr-code': '/icons/capability/qr-code.svg',
  bot: '/icons/capability/bot.svg',
  bell: '/icons/capability/bell.svg',
  wallet: '/icons/capability/wallet.svg',
} as const;

export type CapabilityIconName = keyof typeof CAPABILITY_ICON_SRC;
