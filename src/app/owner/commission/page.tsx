import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { CommissionTable } from '@/features/owner/commission/components/CommissionTable';
import { getCommissions } from '@/features/owner/commission/api/commission.api';

export default async function CommissionRulesPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; page?: string; limit?: string }>;
}) {
    const params = await searchParams;
    const query = params.query || '';
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 5;

    // Fetch from real API
    const response = await getCommissions({
        page,
        limit,
        search: query,
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <PageHeader
                title="Commission Rules Management"
                description="Configure bank and product-wise commission distribution, agent share, telecaller share, and coordinator share rules."
            />

            {/* Table Section */}
            <CommissionTable rules={response.items} total={response.total} page={response.page} limit={response.limit}/>
        </div>
    );
}
