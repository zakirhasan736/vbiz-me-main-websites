import LegalPage from '@/components/views/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { termsPageContent } from '@/lib/legal-pages';
import { pageJsonLdBundle } from '@/lib/seo/json-ld';
import { pagesSeo } from '@/lib/seo/pages';

export const metadata = pagesSeo.termsAndConditions;

export default function TermsAndConditionsPage() {
  return (
    <>
      <JsonLd data={pageJsonLdBundle('termsAndConditions')} />
      <LegalPage content={termsPageContent} />
    </>
  );
}
