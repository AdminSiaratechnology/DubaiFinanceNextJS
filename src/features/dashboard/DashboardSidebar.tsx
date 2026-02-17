'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navByRole = {
    agent: [
        { name: 'Dashboard', href: '/dashboard/agent/main' },
        { name: 'My Cases', href: '/dashboard/agent/cases' },
        { name: 'Commission Calculator', href: '/dashboard/agent/calculator' },
        { name: 'Submit Lead', href: '/dashboard/agent/submit-lead' },
    ],
    telecaller: [
        { name: 'New Leads', href: '/dashboard/telecaller/main' },
        { name: 'Working On', href: '/dashboard/telecaller/working' },
        { name: 'Submitted', href: '/dashboard/telecaller/submitted' },
    ],
    analyst: [
        { name: 'Dashboard', href: '/dashboard/analyst/main' },
        { name: 'Reports', href: '/dashboard/analyst/reports' },
        { name: 'Bank Cases', href: '/dashboard/analyst/bank' },
    ],
};


import { ThemeToggle } from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    // Detect role from URL (Assuming /dashboard/[role]/main)
    const rolePath = pathname.split('/')[2];
    const role = (rolePath as keyof typeof navByRole) || 'agent';
    const navItems = navByRole[role] || [];

    const roleTitle = {
        agent: 'Agent Portal',
        telecaller: 'Telecaller Portal',
        analyst: 'Analyst Portal',
    }[role] || 'Finance Portal';

    return (
        <aside className="w-72 h-screen sticky top-0 border-r border-border bg-card flex-col hidden lg:flex">
            {/* Branding Section */}
            <div className="p-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-brand-foreground shadow-lg shadow-brand/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-foreground uppercase">Dubai Finance</span>
                </div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] pl-11">{roleTitle}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto no-scrollbar">
                <div className="px-4 mb-4">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Main Menu</span>
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 group ${isActive
                                ? 'bg-brand/10 text-brand shadow-sm border border-brand/20'
                                : 'text-text-secondary hover:bg-muted hover:text-foreground border border-transparent'
                                }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-brand scale-100' : 'bg-transparent scale-0 group-hover:scale-100 group-hover:bg-text-muted'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-6 border-t border-border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Appearance</span>
                    <ThemeToggle />
                </div>

                <button
                    onClick={() => router.push('/login')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-text-muted hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 dark:hover:bg-red-950/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                    Logout
                </button>
            </div>
        </aside>
    );
}
