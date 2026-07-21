import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from './site';

export interface PageSeoInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const canonical = absoluteUrl(input.path);
  const fullTitle = input.title.includes(siteConfig.name)
    ? input.title
    : `${input.title} | ${siteConfig.name}`;
  const keywords = [...siteConfig.defaultKeywords, ...(input.keywords ?? [])];
  const image = input.image
    ? input.image.startsWith('http')
      ? input.image
      : absoluteUrl(input.image)
    : absoluteUrl(siteConfig.defaultOgImage);

  return {
    title: fullTitle,
    description: input.description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: input.description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function buildDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    ...buildPageMetadata({
      title: 'Create Interactive Virtual Business Cards',
      description: siteConfig.description,
      path: '/',
    }),
    title: {
      default: 'Create Interactive Virtual Business Cards | vBiz Me',
      template: `%s | ${siteConfig.name}`,
    },
    icons: {
      icon: '/logo-vbizme.webp',
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  };
}
