import OrderManagementPage from '@/components/admin/OrderManagementPage';
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper';

export default function AdminOrdersPage() {
  return (
    <AdminAuthWrapper>
      <OrderManagementPage />
    </AdminAuthWrapper>
  );
}