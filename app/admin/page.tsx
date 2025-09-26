import { OverviewPage } from '@/components/admin/OverviewPage';
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper';

export default function AdminPage() {
  return (
    <AdminAuthWrapper>
      <OverviewPage />
    </AdminAuthWrapper>
  );
}