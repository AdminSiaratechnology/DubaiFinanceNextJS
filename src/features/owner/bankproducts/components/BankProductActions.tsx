'use client';

import React from 'react';
import Link from 'next/link';

interface BankProductActionsProps {
    id: string;
}

export function BankProductActions({ id }: BankProductActionsProps) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this bank product?')) {
            console.log('Deleting bank product:', id);
            // TODO: Add delete logic
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Link
                href={`/owner/bankproducts/${id}`}
                className="p-2 rounded-lg hover:bg-brand/10 text-brand transition-all group-hover:scale-110"
                title="Edit Bank Product"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            </Link>
            <button
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-red/10 text-red transition-all group-hover:scale-110"
                title="Delete Bank Product"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>
        </div>
    );
}
