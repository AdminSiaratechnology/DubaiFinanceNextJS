import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { BankCategoryTable } from '@/features/owner/bankCategory/components/BankCategoryTable';
import { getBankCategories } from '@/features/owner/bankCategory/api/bankCategory.api';

export default async function BankCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; status?: string }>;
}) {
  const params = await searchParams;

  const query = params.query || '';
  const page = Number(params.page || 1);
  const status = params.status || '';

  const data = await getBankCategories({
    page,
    limit: 5,
    search: query,
    status: status || undefined, // only send if selected
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <PageHeader
        title="Bank Categories Management"
        description="Manage available bank categories and their configurations."
      />

      <BankCategoryTable
        bankCategories={data.items}
        page={data.page}
        total={data.total}
        limit={data.limit}
      />
    </div>
  );
}