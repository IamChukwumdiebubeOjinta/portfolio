import { AdminSidebar } from '@/components/views/admin/admin-sidebar';
import { AdminHeader } from '@/components/views/admin/admin-header';
import { SessionExpiryNotification } from '@/components/session-expiry-notification';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className='min-h-screen bg-background flex w-full'>
        <SessionExpiryNotification />
        <AdminSidebar />
        <SidebarInset className='flex-1 flex flex-col min-w-0'>
          <div className='fixed top-0 right-0 left-0 z-50 md:left-64'>
            <AdminHeader />
          </div>
          <main className='flex-1 p-6 mt-16'>
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
