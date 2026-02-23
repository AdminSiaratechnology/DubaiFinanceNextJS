import React from 'react';
import { mockBanks } from '@/lib/mock/banks';
import { PageHeader } from '@/components/PageHeader';
import { BankTable } from '@/features/owner/bank/components/BankTable';

export default async function BanksPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';

    const filteredBanks = mockBanks.filter(b =>
        b.bankName.toLowerCase().includes(query) ||
        b.shortCode.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Bank Management"
                description="Manage your partner banks and their loan products."
            />

            <BankTable banks={filteredBanks} />
        </div>
    );
}
