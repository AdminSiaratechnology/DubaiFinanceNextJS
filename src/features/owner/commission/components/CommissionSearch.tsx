'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface CommissionSearchProps {
    showFilter?: boolean;
    filterOptions?: string[];
}
export function CommissionSearch({ showFilter = true, filterOptions = ['active', 'inactive'] }: CommissionSearchProps) {
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
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder="Search commission rules..."
                    className="w-full sm:w-150 pl-10 pr-4 py-3 bg-white border border-brand  rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-brand"
                />
            </div>
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
                        className="w-full pl-10 pr-10 py-3 bg-white border border-brand rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand/20 outline-none transition-all appearance-none cursor-pointer"
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
