import { LegalPage } from '@/components/templates/LegalPage';
import { termsAndConditions } from '@/data/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...termsAndConditions.seo, path: '/terms-and-conditions/' });

export default function TermsPage() {
  return <LegalPage doc={termsAndConditions} path="/terms-and-conditions/" />;
}
