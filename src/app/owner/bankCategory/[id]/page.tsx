import { notFound } from 'next/navigation';
import { BankCategoryForm } from '@/features/owner/bankCategory/components/BankCategoryForm';
import { getBankCategoryById } from '@/features/owner/bankCategory/api/bankCategory.api';

export default async function EditBankCategoryPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;

    const bankCategory = await getBankCategoryById(Number(id));

    if (!bankCategory) {
        notFound();
    }

    return (
        <BankCategoryForm
            bankCategory={bankCategory}
            title={`Edit Bank Category: ${bankCategory.name}`}
            bankCategoryId={Number(id)}
        />
    );
}