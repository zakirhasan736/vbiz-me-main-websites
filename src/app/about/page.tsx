import About from '@/components/views/About';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.about;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('about')} />
      <About />
    </>
  );
}
