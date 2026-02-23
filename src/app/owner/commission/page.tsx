import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { CommissionTable } from '@/features/owner/commission/components/CommissionTable';
import { mockCommissionRules } from '@/lib/mock/commissionRules'

export default async function CommissionRulesPage({
    searchParams,
}: {
    searchParams: { query?: string };
}) {
    const query = searchParams.query?.toLowerCase() || '';

    // 🔍 SSR Filtering (matches LoanTypes pattern)
    const filteredRules = mockCommissionRules.filter((rule) => {
        const bankName = rule.bankName?.toLowerCase() || '';
        const productName = rule.productName?.toLowerCase() || '';

        return (
            bankName.includes(query) ||
            productName.includes(query)
        );
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <PageHeader
                title="Commission Rules Management"
                description="Configure bank and product-wise commission distribution, agent share, telecaller share, and coordinator share rules."
            />

            {/* Table Section */}
            <CommissionTable rules={filteredRules} />
        </div>
    );
}
