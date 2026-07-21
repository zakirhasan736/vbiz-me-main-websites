import OurWork from '@/components/views/OurWork';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.portfolio;

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('portfolio')} />
      <OurWork />
    </>
  );
}
