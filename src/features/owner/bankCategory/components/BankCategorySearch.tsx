'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface BankCategorySearchProps {
    showFilter?: boolean;
    filterOptions?: string[];
}

export function BankCategorySearch({
    showFilter = false,
    filterOptions = ['active', 'inactive'],
}: BankCategorySearchProps) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
    const status = searchParams.get('status') || '';

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page', '1');

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };

    // debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            updateParams('query', searchValue);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateParams('status', e.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

            <div className="relative w-full sm:w-80">
                <input
                    type="search"
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder="Search loan types..."
                    className="w-full pl-10 pr-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand outline-none transition-all"
                />
            </div>

            {showFilter && (
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full sm:w-auto px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold"
                >
                    <option value="">All Status</option>
                    {filterOptions.map((option) => (
                        <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}