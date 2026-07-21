import { absoluteUrl, siteConfig } from './site';
import { SEO_PAGES, pageContent, type SeoPageKey } from './pages';

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.defaultOgImage),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    sameAs: ['https://www.vbizme.com', 'https://app.vbizme.com'],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-US',
  };
}

export function webPageJsonLd(key: SeoPageKey): JsonLd {
  const page = pageContent[key];
  const nav = SEO_PAGES.find((entry) => entry.key === key);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(page.path)}#webpage`,
    name: `${page.title} | ${siteConfig.name}`,
    description: page.description,
    url: absoluteUrl(page.path),
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-US',
    ...(nav ? { breadcrumb: `${absoluteUrl(page.path)}#breadcrumb` } : {}),
  };
}

export function breadcrumbJsonLd(key: SeoPageKey): JsonLd {
  const page = pageContent[key];
  const nav = SEO_PAGES.find((entry) => entry.key === key);
  const items =
    key === 'home'
      ? [{ name: 'Home', path: '/' }]
      : [
          { name: 'Home', path: '/' },
          { name: nav?.name ?? page.title, path: page.path },
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function siteNavigationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: siteConfig.url,
    hasPart: SEO_PAGES.map((page) => ({
      '@type': 'WebPage',
      name: page.name,
      url: absoluteUrl(page.path),
    })),
  };
}

export function pageJsonLdBundle(key: SeoPageKey): JsonLd[] {
  const bundle: JsonLd[] = [webPageJsonLd(key), breadcrumbJsonLd(key)];
  if (key === 'home') {
    bundle.unshift(organizationJsonLd(), websiteJsonLd(), siteNavigationJsonLd());
  }
  return bundle;
}
