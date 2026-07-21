import Pricing from '@/components/views/Pricing';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.pricing;

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('pricing')} />
      <Pricing />
    </>
  );
}
