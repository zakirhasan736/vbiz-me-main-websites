import OurVCards from '@/components/views/OurVCards';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.vcards;

export default function OurCardPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('vcards')} />
      <OurVCards />
    </>
  );
}
