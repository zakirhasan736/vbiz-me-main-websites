export const siteConfig = {
  name: 'vBiz Me',
  legalName: 'vBiz Me',
  tagline: 'Interactive virtual business cards for modern professionals.',
  description:
    'Stand out with vBiz Me digital business cards — video intros, QR codes, and custom designs. Share in seconds, no printing needed.',
  url: (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    'https://www.vbizme.com'
  ).replace(/\/$/, ''),
  locale: 'en_US',
  email: 'mcasanova@vbizme.com',
  phone: '+18607709893',
  defaultOgImage: '/logo-vbizme.webp',
  twitterHandle: '@vbizme',
  defaultKeywords: [
    'vBiz Me',
    'digital business card',
    'virtual business card',
    'smart vCard',
    'QR business card',
    'interactive business card',
    'digital networking',
    'paperless business card',
  ],
} as const;

export function absoluteUrl(path: string) {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized || '/'}`;
}
