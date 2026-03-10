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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        subItems: [
            { name: 'Analysts', href: '/owner/team/analysts' },
            { name: 'Telecallers', href: '/owner/team/telecallers' },
            { name: 'Agents', href: '/owner/team/agents' },
        ]
    },
    // {
    //     name: 'Agents',
    //     href: '/owner/team/agents',
    //     icon: (
    //         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //             <path d="M3 3v18h18" />
    //             <path d="m19 9-5 5-4-4-3 3" />
    //         </svg>
    //     )
    // },
    {
        name: 'Banks',
        href: '/owner/bank',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
            </svg>
        )
    },
    {
        name: "Bank Categories",
        href: "/owner/bankCategory",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
        )
    },
    {
        name: 'Bank Products',
        href: '/owner/bankproducts',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
            </svg>
        )
    },
    // {
    //     name: 'Settings',
    //     href: '/owner/settings',
    //     icon: (
    //         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //             <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    //             <circle cx="12" cy="12" r="3" />
    //         </svg>
    //     )
    // },
    {
        name: 'Loan Types',
        href: '/owner/loanTypes',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="12" x="2" y="6" rx="2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M6 12h.01M18 12h.01" />
            </svg>
        )
    },
    {
        name: 'SLA Templates',
        href: '/owner/sla',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="8" height="4" x="8" y="2" rx="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
            </svg>
        )
    },
    {
        name: 'Commission Rules',
        href: '/owner/commission',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
            </svg>
        )
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
        subItems: [
            { name: 'Email Configuration', href: '/owner/settings/email-configuration' },
        ]
    },
];

import { useRouter } from 'next/navigation';
import { adminLogout } from '../../api/auth.api';

interface DashboardSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    onHoverChange?: (hovered: boolean) => void;
}

export function DashboardSidebar({ isOpen, onClose, onHoverChange }: DashboardSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    // State for hover and expanded items
    const [isHovered, setIsHovered] = React.useState(false);
    const [expandedItems, setExpandedItems] = React.useState<string[]>(() => {
        return navItems
            .filter(item => item.subItems && pathname.startsWith(item.href))
            .map(item => item.name)
            .sort((a, b) => a.localeCompare(b));
    });

    const toggleExpand = (name: string) => {
        setExpandedItems(prev =>
            prev.includes(name)
                ? prev.filter(i => i !== name)
                : [...prev, name]
        );
    };

    const handleHover = (hovered: boolean) => {
        setIsHovered(hovered);
        onHoverChange?.(hovered);
    };

    // Determine if sidebar should be collapsed (desktop only, when not hovered)
    const isCollapsed = !isOpen && !isHovered;

    const handleLogout = async () => {
        try {
            await adminLogout();
            router.push('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden animate-in fade-in duration-300"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-60 bg-card border-r border-border shadow-2xl transition-all duration-300
                    lg:translate-x-0 lg:flex lg:flex-col lg:shadow-none
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isCollapsed ? 'w-20' : 'w-72'}
                `}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
            >
                {/* Logo / Branding */}
                <div className={`p-8 pb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl executive-header flex items-center justify-center shadow-md shrink-0">
                            <span className="text-white font-bold text-xl">D</span>
                        </div>
                        <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}`}>
                            <h2 className="text-lg font-bold tracking-tight text-foreground">Dubai Finance</h2>
                            <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">Wealth Management</p>
                        </div>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-text-muted hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>

                    {!isCollapsed && (
                        <div className="hidden lg:block">
                            <ThemeToggle />
                        </div>
                    )}

                    {/* {isCollapsed && (
                        <div className="absolute right-0 top-8 hidden lg:block">
                            <ThemeToggle />
                        </div>
                    )} */}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 mt-8 space-y-2 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        const isExpanded = expandedItems.includes(item.name);

                        // Unified rendering for smooth transition
                        const content = (
                            <div
                                className={`w-full flex items-center gap-4 py-3.5 rounded-xl transition-all duration-300 group relative ${isCollapsed ? 'px-0 justify-center' : 'px-4 cursor-pointer'
                                    } ${isActive && !hasSubItems
                                        ? 'bg-brand/10 text-brand shadow-sm border border-brand/20'
                                        : 'text-text-secondary hover:bg-muted hover:text-foreground'
                                    } ${hasSubItems && isActive ? 'text-brand' : ''}`}
                            >
                                <div className={`shrink-0 transition-colors duration-200 flex items-center justify-center ${isActive ? 'text-brand' : 'text-text-muted group-hover:text-text-secondary'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-base font-semibold tracking-wide whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'flex-1 opacity-100'}`}>
                                    {item.name}
                                </span>
                                {isActive && !hasSubItems && !isCollapsed && (
                                    <div className={`ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(230,192,79,0.5)] transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 h-0 hidden' : 'opacity-100'}`}></div>
                                )}
                                {hasSubItems && !isCollapsed && (
                                    <svg className={`ml-auto shrink-0 w-4 h-4 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''} ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                )}

                                {/* Tooltip for collapsed state */}
                                <div className={`absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded transition-all whitespace-nowrap z-50 shadow-md border border-border pointer-events-none ${isCollapsed ? 'opacity-0 invisible group-hover:opacity-100 group-hover:visible' : 'hidden'}`}>
                                    {item.name}
                                </div>
                            </div>
                        );

                        return (
                            <div key={item.name} className={`space-y-1 relative group/container ${hasSubItems && !isCollapsed ? 'cursor-pointer' : ''}`}>
                                {hasSubItems && !isCollapsed ? (
                                    <div onClick={() => toggleExpand(item.name)}>
                                        {content}
                                    </div>
                                ) : hasSubItems && isCollapsed ? (
                                    <div>
                                        {content}
                                    </div>
                                ) : (
                                    <Link href={item.href} onClick={() => onClose?.()}>
                                        {content}
                                    </Link>
                                )}

                                {/* Render Sub Items if expanded */}
                                <div className={`transition-all duration-300 overflow-hidden ${hasSubItems && isExpanded && !isCollapsed ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                    <div className="ml-12 space-y-1">
                                        {item.subItems?.map((sub) => {
                                            const isSubActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    onClick={() => onClose?.()}
                                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${isSubActive
                                                        ? 'text-brand bg-brand/5'
                                                        : 'text-text-muted hover:text-foreground hover:bg-muted'
                                                        }`}
                                                >
                                                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isSubActive ? 'bg-brand' : 'bg-transparent'}`}></div>
                                                    {sub.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </nav>

                {/* User Profile Summary */}
                <div className={`p-4 border-t border-border mt-auto space-y-2 relative`}>
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 py-3 rounded-xl text-xs font-bold text-text-muted hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 dark:hover:bg-red-950/20 group relative ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
                    >
                        <div className="shrink-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                        </div>
                        <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'flex-1 text-left opacity-100'}`}>Sign Out</span>
                        <div className={`absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded transition-all whitespace-nowrap z-50 shadow-md border border-border pointer-events-none ${isCollapsed ? 'opacity-0 invisible group-hover:opacity-100 group-hover:visible' : 'hidden'}`}>
                            Sign Out
                        </div>
                    </button>
                </div>
            </aside>
        </>
    );
}