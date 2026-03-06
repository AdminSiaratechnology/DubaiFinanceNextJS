'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface DashboardHeaderProps {
    onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user) as any;

    const handleViewProfile = () => {
        router.push('/profile');
    };

    // Helper to get display name and initials
    const getDisplayName = () => {
        if (!user) return 'User';
        if (user.role === 'admin') return user.admin_profile?.name.toUpperCase() || 'Administrator';
        return user.fullName || user.email?.split('@')[0] || 'Member';
    };

    const getInitials = () => {
        const name = getDisplayName();
        return name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const getRoleTitle = () => {
        if (!user) return '';
        if (user.role === 'admin') return 'Admin';
        return user.role.charAt(0).toUpperCase() + user.role.slice(1);
    };

    return (
        <header className="rounded-xl executive-header p-4 sm:p-6 flex items-center justify-between gap-4 shadow-lg text-white overflow-hidden relative group w-full">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Mobile Trigger */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-1 hover:bg-white/10 rounded-lg transition-colors border border-white/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>

                <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8">
                        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                    </svg>
                </div>
                <div className="text-left min-w-0 flex-1">
                    <h1 className="text-lg sm:text-2xl font-light tracking-wide leading-tight truncate">Executive Command Center</h1>
                    <p className="text-white/80 text-[10px] sm:text-xs font-medium tracking-wider uppercase mt-0.5 truncate">Business Intelligence & Control</p>
                </div>
            </div>

            {/* Right Side Icons (Optional for desktop) */}
            <div className="hidden sm:flex items-center gap-3 cursor-pointer shrink-0" onClick={handleViewProfile}>
                <div className="flex flex-col items-end">
                    <p className="text-xl font-medium">{getDisplayName()}</p>
                    <p className="text-[12px] text-white/80">{getRoleTitle()}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white/30 p-0.5">
                    <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                        {getInitials()}
                    </div>
                </div>
            </div>
        </header>
    );
}
