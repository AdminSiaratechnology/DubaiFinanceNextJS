import React from 'react';
import { getBankProducts } from '@/features/owner/bankproducts/api/bankproducts.api';
import { PageHeader } from '@/components/PageHeader';
import { BankProductTable } from '@/features/owner/bankproducts/components/BankProductTable';

export default async function BankProductsPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; status?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';
    const page = parseInt(params.page || '1');
    const status = params.status || '';
    const response = await getBankProducts({ search: query, limit: 5, page, status });
    const bankProducts = response.items || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Bank Products Management"
                description="Configure and manage loan products offered by partner banks."
            />

            <BankProductTable bankProducts={bankProducts} page={response.page}
                total={response.total}
                limit={response.limit} />
        </div>
    );
}
