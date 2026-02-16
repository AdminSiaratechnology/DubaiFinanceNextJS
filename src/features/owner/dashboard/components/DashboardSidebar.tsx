'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        name: 'Dashboard',
        href: '/owner/dashboard',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
        ),
        active: true
    },
    {
        name: 'Team',
        href: '/owner/team',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        active: false
    },
    {
        name: 'Agents',
        href: '/owner/agents',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
        active: false
    },
    {
        name: 'Banks',
        href: '/owner/banks',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
            </svg>
        ),
        active: false
    },
    {
        name: 'Settings',
        href: '/owner/settings',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        active: false
    }
];

import { useRouter } from 'next/navigation';

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border min-h-screen sticky top-0 shadow-sm transition-all duration-300">
            {/* Logo / Branding */}
            <div className="p-8 pb-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl executive-header flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl">D</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-foreground">Dubai Finance</h2>
                            <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">Wealth Management</p>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 mt-8 space-y-2">
                <p className="px-4 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Main Menu</p>
                {navItems.map((item) => {
                    const isActive = pathname.includes(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-brand/10 text-brand shadow-sm border border-brand/20'
                                : 'text-text-secondary hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            <div className={`transition-colors duration-200 ${isActive ? 'text-brand' : 'text-text-muted group-hover:text-text-secondary'}`}>
                                {item.icon}
                            </div>
                            <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(230,192,79,0.5)]"></div>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Support / Quick Links (Commented out as per user) */}

            {/* User Profile Summary */}
            <div className="p-4 border-t border-border mt-auto space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200 group text-left">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border border-border shadow-inner overflow-hidden">
                        <div className="text-text-muted text-xs font-bold group-hover:scale-110 transition-transform duration-300">ADMIN</div>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground leading-none">Johnathan Doe</p>
                        <p className="text-[10px] text-text-secondary mt-1">Chief Financial Officer</p>
                    </div>
                </button>

                <button
                    onClick={() => router.push('/login')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-text-muted hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 dark:hover:bg-red-950/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
