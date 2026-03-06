'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export function OwnerLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);

    const isSidebarCollapsed = !isSidebarOpen && !isSidebarHovered;

    return (
        <div className="min-h-screen flex bg-background">
            <div
                className="hidden lg:block transition-all duration-300 shrink-0"
                style={{ width: isSidebarCollapsed ? '80px' : '288px' }}
            />
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onHoverChange={setIsSidebarHovered}
            />
            <div className="flex-1 flex flex-col min-w-0 relative">
                <div className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 pointer-events-none p-4 sm:p-6 sm:pt-4 ${isSidebarCollapsed ? 'lg:left-[80px]' : 'lg:left-[288px]'}`}>
                    <div className="pointer-events-auto">
                        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
                    </div>
                </div>
                <div className="h-28 sm:h-36" />
                <main className="flex-1 pb-12">
                    <div className="px-4 sm:px-6 lg:px-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
