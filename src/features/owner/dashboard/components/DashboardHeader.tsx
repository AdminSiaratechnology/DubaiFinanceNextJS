import React from 'react';

export function DashboardHeader() {
    return (
        <header className="rounded-xl executive-header p-6 mb-8 flex flex-col sm:flex-row items-center gap-4 shadow-lg mx-0 sm:mx-6 mt-6 text-white">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                </svg>
            </div>
            <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-light tracking-wide">Executive Command Center</h1>
                <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wider uppercase mt-1">Complete Business Intelligence & Control</p>
            </div>
        </header>
    );
}
