import React from 'react';

/** Reusable shimmer skeleton block */
export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div
            style={style}
            className={`animate-pulse rounded-xl bg-muted/60 dark:bg-muted/40 ${className}`}
        />
    );
}

/** Full-page table list skeleton (used by list pages) */
export function TablePageSkeleton() {
    return (
        <div className="space-y-8 pb-10">
            {/* Page header */}
            <div className="space-y-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-96" />
            </div>

            {/* Search / action bar */}
            <div className="flex justify-between items-center gap-4">
                <Skeleton className="h-10 w-80" />
                <Skeleton className="h-10 w-36" />
            </div>

            {/* Table card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                {/* Table header */}
                <div className="flex gap-4 px-4 py-3 bg-muted/40 border-b border-border">
                    {[200, 140, 100, 140, 80, 80, 60].map((w, i) => (
                        <Skeleton key={i} className="h-3" style={{ width: w }} />
                    ))}
                </div>
                {/* Table rows */}
                {Array.from({ length: 7 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 px-4 py-4 border-b border-border last:border-0"
                    >
                        <div className="flex items-center gap-3" style={{ width: 200 }}>
                            <Skeleton className="w-10 h-10 shrink-0" />
                            <div className="space-y-1.5 flex-1">
                                <Skeleton className="h-3 w-28" />
                                <Skeleton className="h-2.5 w-20" />
                            </div>
                        </div>
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-6 w-20 rounded-lg" />
                        <div className="space-y-1.5" style={{ width: 140 }}>
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-2.5 w-20" />
                        </div>
                        <div className="flex items-center gap-1.5" style={{ width: 80 }}>
                            <Skeleton className="w-2 h-2 rounded-full" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Form page skeleton (used by new/edit pages) */
export function FormPageSkeleton() {
    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-64" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <Skeleton className="h-10 w-40" />
            </div>

            {/* Card skeleton */}
            <div className="bg-card border border-border rounded-2xl p-8 space-y-8 shadow-sm">
                {/* Section */}
                {[1, 2, 3].map((s) => (
                    <div key={s} className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-border pb-3">
                            <Skeleton className="w-9 h-9 rounded-lg" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                            {Array.from({ length: s === 3 ? 6 : 4 }).map((_, i) => (
                                <div key={i} className={`space-y-2 ${s === 3 && i === 5 ? 'md:col-span-2' : ''}`}>
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className={`h-10 w-full ${s === 3 && i === 5 ? 'h-24' : ''}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-4">
                <Skeleton className="h-11 w-36" />
                <Skeleton className="h-11 w-36" />
            </div>
        </div>
    );
}
