import LegalPage from '@/components/views/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { privacyPolicyContent } from '@/lib/legal-pages';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.privacyPolicy;

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('privacyPolicy')} />
      <LegalPage content={privacyPolicyContent} />
    </>
  );
}
