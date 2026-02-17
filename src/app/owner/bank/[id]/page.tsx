'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockBanks } from '@/lib/mock/banks';
import { BankForm } from '@/features/owner/bank/components/BankForm';

export default function EditBankPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const bank = mockBanks.find(b => b.id === id);

    const handleSave = (data: any) => {
        console.log('Bank Updated:', data);
        // TODO: Add logic here to update in store/API
        router.push('/owner/bank');
    };

    if (!bank) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Bank not found</p>
                <button
                    onClick={() => router.push('/owner/bank')}
                    className="mt-4 text-brand font-bold hover:underline"
                >
                    Return to List
                </button>
            </div>
        );
    }

    return (
        <BankForm
            bank={bank}
            title={`Edit Bank: ${bank.bankName}`}
            onSave={handleSave}
            onCancel={() => router.push('/owner/bank')}
        />
    );
}
