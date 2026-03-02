'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface SLATemplateSearchProps {
    showFilter?: boolean;
    filterOptions?: string[];
}

export function SLATemplateSearch({
    showFilter = false,
    filterOptions = ['active', 'inactive'],
}: SLATemplateSearchProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('query') || '';
    const status = searchParams.get('status') || '';

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) {
            params.set('query', e.target.value);
        } else {
            params.delete('query');
        }
        router.push(`?${params.toString()}`);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) {
            params.set('status', e.target.value);
        } else {
            params.delete('status');
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>

                <input
                    type="search"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search SLA templates..."
                    className="w-full pl-10 pr-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-text-muted/50"
                />
            </div>

            {/* Status Filter (Optional) */}
            {showFilter && (
                <div className="relative w-full sm:w-auto">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="w-full pl-10 pr-10 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="">All Status</option>
                        {filterOptions.map((option) => (
                            <option key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                        ))}
                    </select>
                    <svg
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            )}
        </div>
    );
}
