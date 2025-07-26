import { AdminSidebar } from '@/components/views/admin/admin-sidebar';
import { AdminHeader } from '@/components/views/admin/admin-header';
import { SessionExpiryNotification } from '@/components/session-expiry-notification';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-background'>
      <SessionExpiryNotification />
      <div className='flex'>
        <AdminSidebar />
        <div className='flex-1 flex flex-col'>
          <AdminHeader />
          <main className='flex-1 p-6'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
