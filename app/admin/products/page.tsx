import ProductManagementPage from '@/components/admin/ProductManagementPage';
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper';

export default function AdminProductsPage() {
  return (
    <AdminAuthWrapper>
      <ProductManagementPage />
    </AdminAuthWrapper>
  );
}