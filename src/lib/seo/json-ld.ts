import { absoluteUrl, siteConfig } from './site';
import { SEO_PAGES, pageContent, type SeoPageKey } from './pages';
import { GOOGLE_BUSINESS_PROFILE, GOOGLE_REVIEWS } from '@/lib/google-reviews';
import { videoObjectJsonLd, videosForPage } from '@/lib/seo/videos';

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  const sameAs = ['https://www.vbizme.com', 'https://app.vbizme.com'];
  if (GOOGLE_BUSINESS_PROFILE.mapsUrl) {
    sameAs.push(GOOGLE_BUSINESS_PROFILE.mapsUrl);
  }

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
    sameAs,
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

/** Product/software reviews are eligible for review snippets; self-serving LocalBusiness stars are not. */
export function googleReviewsJsonLd(): JsonLd {
  const profile = GOOGLE_BUSINESS_PROFILE;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.url}/#vbiz-me-app`,
    name: 'vBiz Me Virtual Business Card',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: siteConfig.url,
    description: siteConfig.description,
    image: absoluteUrl(siteConfig.defaultOgImage),
    author: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: profile.ratingValue,
      reviewCount: profile.reviewCount,
      bestRating: profile.bestRating,
      worstRating: profile.worstRating,
    },
    review: GOOGLE_REVIEWS.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.rater,
      },
      name: `${review.rater} Google review`,
      reviewBody: review.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: profile.bestRating,
        worstRating: profile.worstRating,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Google',
      },
    })),
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
    bundle.unshift(
      organizationJsonLd(),
      websiteJsonLd(),
      siteNavigationJsonLd(),
      googleReviewsJsonLd(),
    );
  }

  for (const video of videosForPage(key)) {
    bundle.push(videoObjectJsonLd(video));
  }

  return bundle;
}
