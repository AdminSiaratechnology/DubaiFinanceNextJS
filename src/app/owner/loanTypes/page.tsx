import React from 'react';
import { mockLoanTypes } from '@/lib/mock/loanTypes';
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
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-light text-foreground">Loan Types Management</h1>
                <p className="text-xs text-text-muted italic">Manage available loan product types and their configurations.</p>
            </header>

            <LoanTypeTable loanTypes={filteredLoanTypes} />
        </div>
    );
}
