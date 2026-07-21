import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/site';
import { SEO_PAGES } from '@/lib/seo/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SEO_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
