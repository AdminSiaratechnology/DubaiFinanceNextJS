'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export function BankSearch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('query') || '';

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) {
            params.set('query', e.target.value);
        } else {
            params.delete('query');
        }
        router.push(`?${params.toString()}`);
    };

    return (
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
            <input
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Search banks..."
                className="w-full sm:w-80 pl-10 pr-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-text-muted/50"
            />
        </div>
    );
}
