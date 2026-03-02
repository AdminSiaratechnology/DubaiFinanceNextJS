'use client';

import React from 'react';
import Link from 'next/link';
import { useConfirmAction } from '@/hooks/use-confirm-action';
import { deleteBank } from '../api/bank.api';
import { useRouter } from 'next/navigation';
interface BankActionsProps {
    id: string;
}

export function BankActions({ id }: BankActionsProps) {
    const router = useRouter();
    const { confirmAction } = useConfirmAction();
    const handleDelete = () => {
        confirmAction({
            title: 'Delete Bank',
            description: 'Are you sure you want to delete this bank? This action cannot be undone.',
            confirmText: 'Delete',
            action: () => deleteBank(Number(id)),
            successMessage: 'Bank deleted successfully.',
            errorMessage: 'Failed to delete bank.',
            onSuccess: () => {
                router.refresh();
            },
        });
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Link
                href={`/owner/bank/${id}`}
                className="p-2 rounded-lg hover:bg-brand/10 text-brand transition-all group-hover:scale-110"
                title="Edit Bank"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
            </Link>
            <button
                onClick={handleDelete}
                className="p-2 rounded-lg hover:bg-red/10 text-red transition-all group-hover:scale-110"
                title="Delete Bank"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>
        </div>
    );
}
