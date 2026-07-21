import Community from '@/components/views/Community';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.community;

export default function CommunityPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('community')} />
      <Community />
    </>
  );
}
