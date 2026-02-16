import { ReactNode } from 'react';
import { DashboardSidebar } from '@/features/dashboard/DashboardSidebar';
import { TopHeader } from '@/features/dashboard/TopHeader';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar (Desktop Only) */}
      {/* <div className="hidden lg:block">
        <DashboardSidebar />
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
