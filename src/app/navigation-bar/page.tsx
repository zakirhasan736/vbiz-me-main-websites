import NavigationBar from '@/components/views/NavigationBar';
import JsonLd from '@/components/seo/JsonLd';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.navigationBar;

export default function NavigationBarPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('navigationBar')} />
      <NavigationBar />
    </>
  );
}
