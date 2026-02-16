'use client';

import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color: 'blue' | 'green' | 'purple' | 'teal' | 'orange' | 'red' | 'dark';
    isActive?: boolean;
    onClick?: () => void;
}

export function StatCard({
    title,
    value,
    icon,
    color,
    isActive = false,
    onClick
}: StatCardProps) {
    const colorMap = {
        blue: 'bg-blue-soft text-blue border-blue/10',
        green: 'bg-green-soft text-green border-green/10',
        purple: 'bg-purple-soft text-purple border-purple/10',
        teal: 'bg-teal-soft text-teal border-teal/10',
        orange: 'bg-orange-soft text-orange border-orange/10',
        red: 'bg-red-soft text-red border-red/10',
        dark: 'bg-muted text-foreground border-border',
    };

    const activeClasses = isActive
        ? `${colorMap[color]} shadow-lg ring-2 ring-offset-2 ring-offset-background ring-current scale-[1.02] z-10`
        : 'bg-card border-border text-text-muted hover:bg-muted hover:shadow-md';

    const baseClasses = `p-5 rounded-2xl border flex items-center gap-4 transition-all duration-300 ${onClick ? 'cursor-pointer text-left w-full' : 'shadow-sm'}`;

    const content = (
        <>
            {icon && (
                <div className={`
                    p-3 rounded-xl backdrop-blur-sm shadow-sm
                    ${isActive ? 'bg-white/60 dark:bg-black/20' : 'bg-muted dark:bg-zinc-800'}
                `}>
                    {icon}
                </div>
            )}
            <div>
                <div className={`text-2xl font-bold tracking-tight ${isActive ? '' : 'text-foreground'}`}>
                    {value}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    {title}
                </p>
            </div>
        </>
    );

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={`${baseClasses} ${activeClasses}`}
            >
                {content}
            </button>
        );
    }

    return (
        <div className={`${baseClasses} ${colorMap[color]} dark:bg-zinc-900/40`}>
            {content}
        </div>
    );
}
