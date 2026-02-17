'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BankProductForm } from '@/features/owner/bankproducts/components/BankProductForm';

export default function NewBankProductPage() {
    const router = useRouter();

    const handleSave = (data: any) => {
        console.log('New Bank Product Saved:', data);
        // TODO: Add logic here to save to store/API
        router.push('/owner/bankproducts');
    };

    return (
        <BankProductForm
            title="Add New Bank Product"
            onSave={handleSave}
            onCancel={() => router.push('/owner/bankproducts')}
        />
    );
}
