import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/site';
import { SEO_PAGES } from '@/lib/seo/pages';
import { INDEXABLE_SITE_VIDEOS, sitemapVideoEntries } from '@/lib/seo/videos';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const videosByPath = new Map<string, ReturnType<typeof sitemapVideoEntries>[]>();
  for (const video of INDEXABLE_SITE_VIDEOS) {
    const list = videosByPath.get(video.path) ?? [];
    list.push(sitemapVideoEntries(video));
    videosByPath.set(video.path, list);
  }

  return SEO_PAGES.map((page) => {
    const videos = videosByPath.get(page.path);
    return {
      url: absoluteUrl(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(videos?.length ? { videos } : {}),
    };
  });
}
