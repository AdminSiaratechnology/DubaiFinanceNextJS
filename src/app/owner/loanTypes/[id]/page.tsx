'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockLoanTypes } from '@/lib/mock/loanTypes';
import { LoanTypeForm } from '@/features/owner/loantypes/components/LoanTypeForm';

export default function EditLoanTypePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const loanType = mockLoanTypes.find(lt => lt.id === id);

    const handleSave = (data: any) => {
        console.log('Loan Type Updated:', data);
        // TODO: Add logic here to update in store/API
        router.push('/owner/loanTypes');
    };

    if (!loanType) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Loan type not found</p>
                <button
                    onClick={() => router.push('/owner/loanTypes')}
                    className="mt-4 text-brand font-bold hover:underline"
                >
                    Return to List
                </button>
            </div>
        );
    }

    return (
        <LoanTypeForm
            loanType={loanType}
            title={`Edit Loan Type: ${loanType.name}`}
            onSave={handleSave}
            onCancel={() => router.push('/owner/loanTypes')}
        />
    );
}
