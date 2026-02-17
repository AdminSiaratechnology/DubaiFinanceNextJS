'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BankForm } from '@/features/owner/bank/components/BankForm';

export default function NewBankPage() {
    const router = useRouter();

    const handleSave = (data: any) => {
        console.log('New Bank Saved:', data);
        // TODO: Add logic here to save to store/API
        router.push('/owner/bank');
    };

    return (
        <BankForm
            title="Add New Bank"
            onSave={handleSave}
            onCancel={() => router.push('/owner/bank')}
        />
    );
}