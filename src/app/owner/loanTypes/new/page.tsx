'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LoanTypeForm } from '@/features/owner/loantypes/components/LoanTypeForm';

export default function NewLoanTypePage() {
    const router = useRouter();

    const handleSave = (data: any) => {
        console.log('New Loan Type Saved:', data);
        // TODO: Add logic here to save to store/API
        router.push('/owner/loanTypes');
    };

    return (
        <LoanTypeForm
            title="Add New Loan Type"
            onSave={handleSave}
            onCancel={() => router.push('/owner/loanTypes')}
        />
    );
}
