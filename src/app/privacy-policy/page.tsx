import { LegalPage } from '@/components/templates/LegalPage';
import { privacyPolicy } from '@/data/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ ...privacyPolicy.seo, path: '/privacy-policy/' });

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} path="/privacy-policy/" />;
}
