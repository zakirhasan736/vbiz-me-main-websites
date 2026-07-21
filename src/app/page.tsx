import Home from '@/components/views/Home';
import { HeroSection } from '@/components/hero/HeroSection';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.home;

export default function HomePage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('home')} />
      <HeroSection />
      <Home />
    </>
  );
}
