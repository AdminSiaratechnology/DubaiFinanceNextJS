'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuthStore } from '@/store/useAuthStore';
import { adminLogout } from '@/features/owner/api/auth.api';
import { toast } from 'sonner';
import NotificationPopover from '@/features/notifications/components/NotificationPopover';

interface TopHeaderProps {
    onMenuClick?: () => void;
}

export function TopHeader({ onMenuClick }: TopHeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, clearUser } = useAuthStore();
    const role = user?.role || '';
    const roleTitle: Record<string, string> = {
        agent: 'Agent Portal',
        telecaller: 'Telecaller Portal',
        analyst: 'Analyst Portal',
        coordinator: 'Analyst Portal',
        owner: 'Executive Portal',
    };

    const currentRoleTitle = roleTitle[role] || 'Finance Portal';

    // Extract display name from nested profiles or top-level name
    const getDisplayName = () => {
        if (!user) return 'User';
        if (user.name) return user.name;
        if (user.role === 'telecaller' && user.telecaller_profile) return user.telecaller_profile.name;
        if (user.role === 'coordinator' && user.coordinator_profile) return user.coordinator_profile.name;
        return user.email.split('@')[0];
    };

    const currentUserName = getDisplayName();

    const handleLogout = async () => {
        try {
            await adminLogout();
            clearUser();
            router.push('/login');
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Logout failed');
            // Even if API fails, clear local state
            clearUser();
            router.push('/login');
        }
    };
    return (
        <header className="
            h-20
            executive-header
            flex items-center justify-between
            px-4 sm:px-6 lg:px-8
            shadow-lg
            sticky top-0 z-40
            transition-all duration-300
        ">
            {/* Left Section */}
            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-white/70 hover:text-white hover:bg-card/10 rounded-lg transition-colors border border-transparent hover:border-white/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>

                <div className="p-2 sm:p-2.5 bg-card/20 rounded-xl backdrop-blur-sm border border-white/30 shrink-0 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div className="leading-tight cursor-pointer" onClick={() => router.push('/profile')}>
                    <h1 className="text-lg sm:text-2xl font-light text-white tracking-wide">
                        {currentRoleTitle}
                    </h1>
                    <p className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-wider mt-0.5">
                        {currentUserName}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <NotificationPopover />
                <ThemeToggle />

                <button
                    onClick={handleLogout}
                    className="
                        flex items-center gap-2
                        px-3 py-2 sm:px-4 sm:py-2
                        text-[10px] sm:text-xs font-bold
                        rounded-xl
                        border border-white/20
                        bg-card/10
                        text-white/80
                        hover:bg-card/20
                        hover:text-white
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
