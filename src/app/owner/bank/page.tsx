import React from 'react';
import { mockBanks } from '@/lib/mock/banks';
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
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-light text-foreground">Bank Management</h1>
                <p className="text-xs text-text-muted italic">Manage your partner banks and their loan products.</p>
            </header>

            <BankTable banks={filteredBanks} />
        </div>
    );
}
