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
    const parts = pathname.split('/');
    const role = parts[1] === 'owner' ? 'owner' : parts[2];
    // console.log(user);
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
            bg-background
            border-b border-border
            flex items-center justify-between
            px-4 sm:px-6 lg:px-8
            backdrop-blur-sm
            sticky top-0 z-40
            transition-colors duration-300
        ">
            {/* Left Section */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Mobile Menu Trigger */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-text-muted hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>

                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg ${['agent', 'telecaller', 'analyst'].includes(role) ? 'bg-blue' : 'bg-brand'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div className="leading-tight cursor-pointer" onClick={() => router.push('/profile')}>
                    <h1 className="text-sm sm:text-lg font-bold text-foreground tracking-tight">
                        {currentRoleTitle}
                    </h1>
                    <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground">
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
