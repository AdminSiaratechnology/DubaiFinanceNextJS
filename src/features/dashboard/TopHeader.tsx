'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export function TopHeader() {
    const pathname = usePathname();
    const role = pathname.split('/')[2]; // /dashboard/[role]/...

    const roleTitle = {
        agent: 'Agent Portal',
        telecaller: 'Telecaller Portal',
        analyst: 'Analyst Portal',
    }[role] || 'Finance Portal';

    const userName = {
        agent: 'Sarah Johnson',
        telecaller: 'Mohammed Hassan',
        analyst: 'Fatima Al Ali',
    }[role] || 'User';

    return (
        <header className="
            h-20
            bg-background/80
            border-b border-border
            flex items-center justify-between
            px-4 sm:px-6 lg:px-8
            backdrop-blur-sm
            sticky top-0 z-40
            transition-colors duration-300
        ">
            {/* Left Section */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div className="leading-tight">
                    <h1 className="text-sm sm:text-lg font-bold text-foreground tracking-tight">
                        {roleTitle}
                    </h1>
                    <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground">
                        {userName}
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />

                <button
                    className="
                        flex items-center gap-2
                        px-3 py-2 sm:px-4 sm:py-2
                        text-[10px] sm:text-xs font-bold
                        rounded-xl
                        border border-border
                        bg-card
                        text-muted-foreground
                        hover:bg-muted
                        hover:text-foreground
                        transition-all duration-200
                        shadow-sm
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <span className="hidden xs:inline">Logout</span>
                </button>
            </div>
        </header>
    );
}
