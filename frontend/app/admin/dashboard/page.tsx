import ProtectedRoute from '@/app/components/auth/ProtectedRoute';
import { AdminProvider } from '@/app/context/AdminContext';
import Dashboard from '@/app/components/layout/Admin/Dashboard';


export default function AdminDashboard() {
  return (
    <AdminProvider>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </AdminProvider>
  );
}