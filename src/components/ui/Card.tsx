import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

/**
 * Reusable Card Component
 * Optimized for both Server and Client rendering.
 */
export function Card({ children, className = '', noPadding = false }: CardProps) {
    return (
        <div className={`section-card overflow-hidden transition-all duration-300 ${noPadding ? '' : 'p-6'} ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</h3>
                {subtitle && <p className="text-[10px] text-text-muted mt-0.5">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
