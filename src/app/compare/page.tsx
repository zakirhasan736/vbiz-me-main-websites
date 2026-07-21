import Compare from '@/components/views/Compare';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.compare;

export default function ComparePage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('compare')} />
      <Compare />
    </>
  );
}
