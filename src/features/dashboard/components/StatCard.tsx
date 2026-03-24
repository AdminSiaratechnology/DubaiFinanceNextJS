'use client';

import React from 'react';

type Color = 'blue' | 'green' | 'purple' | 'teal' | 'orange' | 'red' | 'dark' | 'foreground' | 'background';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color: Color;
    isActive?: boolean;
    onClick?: () => void;
}

const variants: Record<Color, {
    solid: string;
    soft: string;
    border: string;
    glow: string;
}> = {
    blue:   { solid: 'var(--blue)',   soft: 'var(--blue-soft)',   border: 'rgba(59,130,246,0.25)',  glow: '0 8px 32px rgba(59,130,246,0.18)' },
    green:  { solid: 'var(--green)',  soft: 'var(--green-soft)',  border: 'rgba(34,197,94,0.25)',   glow: '0 8px 32px rgba(34,197,94,0.18)' },
    purple: { solid: 'var(--purple)', soft: 'var(--purple-soft)', border: 'rgba(139,92,246,0.25)',  glow: '0 8px 32px rgba(139,92,246,0.18)' },
    teal:   { solid: 'var(--teal)',   soft: 'var(--teal-soft)',   border: 'rgba(13,148,136,0.25)',  glow: '0 8px 32px rgba(13,148,136,0.18)' },
    orange: { solid: 'var(--orange)', soft: 'var(--orange-soft)', border: 'rgba(245,158,11,0.25)',  glow: '0 8px 32px rgba(245,158,11,0.18)' },
    red:    { solid: 'var(--red)',    soft: 'var(--red-soft)',    border: 'rgba(239,68,68,0.25)',   glow: '0 8px 32px rgba(239,68,68,0.18)' },
    dark:   { solid: 'var(--text-secondary)', soft: 'var(--muted)', border: 'var(--border)', glow: 'var(--shadow-soft)' },
    foreground: { solid: 'var(--foreground)', soft: 'rgba(var(--foreground-rgb), 0.1)', border: 'rgba(var(--foreground-rgb), 0.2)', glow: '0 8px 32px rgba(var(--foreground-rgb), 0.15)' },
    background: { solid: 'var(--background)', soft: 'rgba(var(--background-rgb), 0.1)', border: 'var(--border)', glow: 'var(--shadow-soft)' },
};

export function StatCard({
    title,
    value,
    icon,
    color,
    isActive = false,
    onClick,
}: StatCardProps) {
    const v = variants[color];
    const Tag = onClick ? 'button' : 'div';

    return (
        <Tag
            onClick={onClick}
            style={{
                '--c-solid': v.solid,
                '--c-soft': v.soft,
                '--c-border': v.border,
                '--c-glow': v.glow,
            } as React.CSSProperties}
            className={[
                'group relative w-full text-left overflow-hidden',
                'rounded-2xl p-5',
                'transition-all duration-300 ease-out',
                onClick ? 'cursor-pointer' : '',
            ].join(' ')}
        >
            <div
                className="absolute inset-0 rounded-[inherit]"
                style={{
                    background: 'var(--card)',
                    border: `1px solid var(--c-border, var(--border))`,
                    boxShadow: isActive
                        ? `var(--c-glow), 0 0 0 2px var(--c-solid)`
                        : `var(--shadow-card)`,
                    transform: isActive ? 'translateY(-2px)' : undefined,
                    transition: 'box-shadow 0.3s ease, transform 0.2s ease, border-color 0.2s ease',
                }}
            />

            <style>{`
                .stat-card-hover:hover > .stat-surface {
                    box-shadow: var(--c-glow) !important;
                    transform: translateY(-3px) !important;
                    border-color: var(--c-solid) !important;
                }
            `}</style>

            <div
                className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-60 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'var(--c-soft)' }}
            />
            <div
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:top-2 group-hover:bottom-2"
                style={{ background: 'var(--c-solid)' }}
            />

            <div className="relative z-10 flex items-center gap-4 pl-1">

                {icon && (
                    <div
                        className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                        style={{
                            background: 'var(--c-soft)',
                            color: 'var(--c-solid)',
                            boxShadow: `0 2px 8px color-mix(in srgb, var(--c-solid) 20%, transparent)`,
                        }}
                    >
                        {icon}
                    </div>
                )}

                <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                        className="text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-normal wrap-break-word"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {title}
                    </span>
                    <span
                        className="text-[1.65rem] font-black tracking-tight leading-none tabular-nums"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {value}
                    </span>
                </div>

                {isActive && (
                    <div
                        className="ml-auto shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--c-solid)' }}
                    >
                        <svg viewBox="0 0 10 10" fill="white" className="w-3 h-3">
                            <path d="M2 5.5 L4.2 7.5 L8 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                    </div>
                )}
            </div>

        </Tag>
    );
}


