import InvisibleAdvantage from '@/components/views/InvisibleAdvantage';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.advantage;

export default function AdvantagePage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('advantage')} />
      <InvisibleAdvantage />
    </>
  );
}
