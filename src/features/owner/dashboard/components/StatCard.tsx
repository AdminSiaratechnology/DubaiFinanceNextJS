import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
    color: 'blue' | 'purple' | 'green' | 'red' | 'orange';
}

export function StatCard({ title, value, subtitle, color }: StatCardProps) {
    const borderClass = {
        blue: 'stat-blue',
        green: 'stat-green',
        orange: 'stat-orange',
        purple: 'stat-purple',
        red: 'stat-red',
    }[color];

    return (
        <div className={`stat-card ${borderClass} flex flex-col justify-between h-full min-h-[120px] p-4! group hover:-translate-y-1 transition-all duration-300 shadow-md`}>
            <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.15em] mb-3 truncate " title={title}>
                {title}
            </h3>
            <div className="mt-auto">
                <div className="text-xl sm:text-2xl font-semibold text-foreground tracking-tighter mb-0.5 leading-none">
                    {value}
                </div>
                {subtitle && (
                    <p className="text-[10px] text-text-secondary font-semibold truncate opacity-80" title={subtitle}>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
