import { ReactNode } from 'react';
import { DashboardSidebar } from '@/features/dashboard/DashboardSidebar';
import { TopHeader } from '@/features/dashboard/TopHeader';
import AuthInitializer from '@/components/auth/AuthInitializer';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthInitializer>
      <div className="min-h-screen flex bg-muted/30">
        <div className="flex-1 flex flex-col min-w-0">
          <TopHeader />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </AuthInitializer>
  );
}
