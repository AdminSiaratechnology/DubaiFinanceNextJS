'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TeamSearchProps {
    role: string;
}

export function TeamSearch({ role }: TeamSearchProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
            <input
                type="text"
                placeholder={`Search ${role}s...`}
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand outline-none transition-all w-full sm:w-64"
            />
        </div>
    );
}
