import React from 'react';
import { mockLoanTypes } from '@/lib/mock/loanTypes';
import { PageHeader } from '@/components/PageHeader';
import { LoanTypeTable } from '@/features/owner/loantypes/components/LoanTypeTable';

export default async function LoanTypesPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';

    const filteredLoanTypes = mockLoanTypes.filter(lt =>
        lt.name.toLowerCase().includes(query) ||
        lt.description.toLowerCase().includes(query)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Loan Types Management"
                description="Manage available loan product types and their configurations."
            />

            <LoanTypeTable loanTypes={filteredLoanTypes} />
        </div>
    );
}
