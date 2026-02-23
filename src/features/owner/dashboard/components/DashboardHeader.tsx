'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
    onMenuClick?: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const router = useRouter();

    const handleViewProfile = () => {
        router.push('/profile');
    };
    return (
        <header className="rounded-xl executive-header p-4 sm:p-6 mb-8 flex items-center justify-between gap-4 shadow-lg mx-0 sm:mx-6 mt-6 text-white overflow-hidden relative group">
            <div className="flex items-center gap-4">
                {/* Mobile Trigger */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-1 hover:bg-white/10 rounded-lg transition-colors border border-white/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>

                <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8">
                        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                    </svg>
                </div>
                <div className="text-left">
                    <h1 className="text-lg sm:text-2xl font-light tracking-wide leading-tight">Executive Command Center</h1>
                    <p className="text-white/80 text-[10px] sm:text-xs font-medium tracking-wider uppercase mt-0.5">Business Intelligence & Control</p>
                </div>
            </div>

            {/* Right Side Icons (Optional for desktop) */}
            <div className="hidden sm:flex items-center gap-3 cursor-pointer" onClick={handleViewProfile}>
                <div className="flex flex-col items-end">
                    <p className="text-xs font-bold">Johnathan Doe</p>
                    <p className="text-[10px] text-white/70">Chief Financial Officer</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white/30 p-0.5">
                    <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">JD</div>
                </div>
            </div>
        </header>
    );
}
