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

const variants = {
    blue: {
        wrapper: 'from-blue-50/50 to-white border-blue-100 hover:border-blue-200 hover:shadow-blue-100/50 dark:from-blue-950/20 dark:to-transparent dark:border-blue-900/30 dark:hover:border-blue-800',
        icon: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30',
        text: 'text-blue-950 dark:text-blue-100',
        label: 'text-blue-600/80 dark:text-blue-400/80'
    },
    green: {
        wrapper: 'from-green-50/50 to-white border-green-100 hover:border-green-200 hover:shadow-green-100/50 dark:from-green-950/20 dark:to-transparent dark:border-green-900/30 dark:hover:border-green-800',
        icon: 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30',
        text: 'text-green-950 dark:text-green-100',
        label: 'text-green-600/80 dark:text-green-400/80'
    },
    purple: {
        wrapper: 'from-purple-50/50 to-white border-purple-100 hover:border-purple-200 hover:shadow-purple-100/50 dark:from-purple-950/20 dark:to-transparent dark:border-purple-900/30 dark:hover:border-purple-800',
        icon: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/30',
        text: 'text-purple-950 dark:text-purple-100',
        label: 'text-purple-600/80 dark:text-purple-400/80'
    },
    teal: {
        wrapper: 'from-teal-50/50 to-white border-teal-100 hover:border-teal-200 hover:shadow-teal-100/50 dark:from-teal-950/20 dark:to-transparent dark:border-teal-900/30 dark:hover:border-teal-800',
        icon: 'bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800/30',
        text: 'text-teal-950 dark:text-teal-100',
        label: 'text-teal-600/80 dark:text-teal-400/80'
    },
    orange: {
        wrapper: 'from-orange-50/50 to-white border-orange-100 hover:border-orange-200 hover:shadow-orange-100/50 dark:from-orange-950/20 dark:to-transparent dark:border-orange-900/30 dark:hover:border-orange-800',
        icon: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30',
        text: 'text-orange-950 dark:text-orange-100',
        label: 'text-orange-600/80 dark:text-orange-400/80'
    },
    red: {
        wrapper: 'from-red-50/50 to-white border-red-100 hover:border-red-200 hover:shadow-red-100/50 dark:from-red-950/20 dark:to-transparent dark:border-red-900/30 dark:hover:border-red-800',
        icon: 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30',
        text: 'text-red-950 dark:text-red-100',
        label: 'text-red-600/80 dark:text-red-400/80'
    },
    dark: {
        wrapper: 'from-slate-50 to-white border-slate-200 hover:border-slate-300 hover:shadow-slate-100/50 dark:from-slate-800 dark:to-slate-900/50 dark:border-slate-700 dark:hover:border-slate-600',
        icon: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
        text: 'text-slate-900 dark:text-white',
        label: 'text-slate-500 dark:text-slate-400'
    }
};

export function StatCard({
    title,
    value,
    icon,
    color,
    isActive = false,
    onClick,
}: StatCardProps) {
    const variant = variants[color];
    const Wrapper = onClick ? 'button' : 'div';

    return (
        <Wrapper
            onClick={onClick}
            className={`
                group relative w-full text-left shadow-sm
                bg-linear-to-br ${variant.wrapper}
                border rounded-2xl p-5
                transition-all duration-300 ease-out
                ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg' : ''}
                ${isActive ? 'ring-2 ring-brand/80 ring-offset-2 ring-offset-background scale-[1.02] shadow-xl z-20' : ''}
            `}
        >
            <div className="flex items-center gap-4 relative z-10">          
                {icon && (
                    <div className={`
                        p-3.5 rounded-xl border
                        flex items-center justify-center shrink-0
                        transition-all duration-300
                        group-hover:scale-110 group-hover:rotate-3
                        ${variant.icon}
                    `}>
                        {icon}
                    </div>
                )}

                <div className="flex flex-col">
                    <span className={`text-2xl font-black tracking-tight leading-none mb-1.5 ${variant.text}`}>
                        {value}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${variant.label}`}>
                        {title}
                    </span>
                </div>
            </div>

            {/* Decorative Shine Effect */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/40 dark:bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Wrapper>
    );
}