import { absoluteUrl } from '@/lib/seo/site';
import type { SeoPageKey } from '@/lib/seo/pages';
import {
  FOUNDER_INTRO_VIDEO,
  INVISIBLE_ADVANTAGE_VIDEO,
  NAVIGATION_BAR_VIDEO,
  OUR_VCARDS_2D_EXPLAINER_VIDEO,
} from '@/lib/site-assets';

export type IndexableSiteVideo = {
  id: string;
  /** Page where this video is the primary/content video (not a decorative background). */
  pageKey: SeoPageKey;
  path: string;
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  durationSeconds: number;
};

/**
 * Content videos eligible for Google video indexing (VideoObject + sitemap).
 * Decorative hero YouTube backgrounds, partner-logo MP4s, and community demo clips
 * are intentionally excluded — Google correctly leaves those "not indexed".
 */
export const INDEXABLE_SITE_VIDEOS: IndexableSiteVideo[] = [
  {
    id: 'founder-intro',
    pageKey: 'home',
    path: '/',
    name: 'vBiz Me Founder Introduction',
    description:
      'Meet Michaelangelo Casanova, founder of vBiz Me, and see how interactive virtual business cards help professionals network smarter.',
    contentUrl: FOUNDER_INTRO_VIDEO,
    thumbnailUrl: '/video-thumbs/founder-intro.webp',
    uploadDate: '2025-06-01',
    durationSeconds: 50,
  },
  {
    id: 'invisible-advantage',
    pageKey: 'advantage',
    path: '/advantage',
    name: 'The Invisible Advantage — vBiz Me Explainer',
    description:
      'Discover the invisible advantage of vBiz Me digital business cards — engagement analytics, SEO, instant load, and psychology-driven design.',
    contentUrl: INVISIBLE_ADVANTAGE_VIDEO,
    thumbnailUrl: '/video-thumbs/invisible-advantage.webp',
    uploadDate: '2025-08-01',
    durationSeconds: 239,
  },
  {
    id: 'navigation-bar-demo',
    pageKey: 'navigationBar',
    path: '/navigation-bar',
    name: 'vBiz Me Scrolling Navigation Bar Demo',
    description:
      'See the vBiz Me smart scrolling navigation bar in action — tabs, portfolio links, and CTAs clients use on every interactive vCard.',
    contentUrl: NAVIGATION_BAR_VIDEO,
    thumbnailUrl: '/video-thumbs/navigation-bar-demo.webp',
    uploadDate: '2025-09-01',
    durationSeconds: 106,
  },
  {
    id: 'vcards-2d-explainer',
    pageKey: 'vcards',
    path: '/our-card',
    name: 'vBiz Me vCards 2D Explainer',
    description:
      'A 2D explainer of how vBiz Me interactive virtual business cards work — video intros, QR codes, and shareable digital networking.',
    contentUrl: OUR_VCARDS_2D_EXPLAINER_VIDEO,
    thumbnailUrl: '/video-thumbs/vcards-2d-explainer.webp',
    uploadDate: '2025-08-15',
    durationSeconds: 120,
  },
];

function iso8601Duration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m <= 0) return `PT${s}S`;
  if (s <= 0) return `PT${m}M`;
  return `PT${m}M${s}S`;
}

export function videosForPage(pageKey: SeoPageKey): IndexableSiteVideo[] {
  return INDEXABLE_SITE_VIDEOS.filter((video) => video.pageKey === pageKey);
}

export function videoObjectJsonLd(video: IndexableSiteVideo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${absoluteUrl(video.path)}#video-${video.id}`,
    name: video.name,
    description: video.description,
    thumbnailUrl: [absoluteUrl(video.thumbnailUrl)],
    contentUrl: absoluteUrl(video.contentUrl),
    embedUrl: absoluteUrl(video.path),
    uploadDate: video.uploadDate,
    duration: iso8601Duration(video.durationSeconds),
    inLanguage: 'en-US',
    isFamilyFriendly: true,
    publisher: {
      '@type': 'Organization',
      name: 'vBiz Me',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-vbizme.webp'),
      },
    },
  };
}

export function sitemapVideoEntries(video: IndexableSiteVideo) {
  return {
    title: video.name,
    thumbnail_loc: absoluteUrl(video.thumbnailUrl),
    description: video.description,
    content_loc: absoluteUrl(video.contentUrl),
    publication_date: video.uploadDate,
    duration: video.durationSeconds,
    family_friendly: 'yes' as const,
  };
}
