import React from 'react';
import { mockBankProducts } from '@/lib/mock/bankProducts';
import { BankProductTable } from '@/features/owner/bankproducts/components/BankProductTable';

export default async function BankProductsPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';

    const filteredBankProducts = mockBankProducts.filter(bp =>
        bp.productName.toLowerCase().includes(query) ||
        bp.bankName.toLowerCase().includes(query) ||
        bp.loanTypeName.toLowerCase().includes(query)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-light text-foreground">Bank Products Management</h1>
                <p className="text-xs text-text-muted italic">Configure and manage loan products offered by partner banks.</p>
            </header>

            <BankProductTable bankProducts={filteredBankProducts} />
        </div>
    );
}
