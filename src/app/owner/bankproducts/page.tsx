import React from 'react';
import { mockBankProducts } from '@/lib/mock/bankProducts';
import { PageHeader } from '@/components/PageHeader';
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
            <PageHeader
                title="Bank Products Management"
                description="Configure and manage loan products offered by partner banks."
            />

            <BankProductTable bankProducts={filteredBankProducts} />
        </div>
    );
}
