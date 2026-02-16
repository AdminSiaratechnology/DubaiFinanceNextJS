import React from 'react';
import { DashboardHeader } from '@/features/owner/dashboard/components/DashboardHeader';
import { DashboardSidebar } from '@/features/owner/dashboard/components/DashboardSidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-background">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />
                <main className="flex-1 pb-12">
                    <div className="dashboard-container">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
