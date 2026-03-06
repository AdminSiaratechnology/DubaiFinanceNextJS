
import { BankProductForm } from '@/features/owner/bankproducts/components/BankProductForm';
import { getBankProductById, BankProduct } from '@/features/owner/bankproducts/api/bankproducts.api';
import { notFound } from 'next/navigation';

export default async function EditBankProductPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const bankProduct = await getBankProductById(Number(id));

    if (!bankProduct) {
        notFound();
    }

    return (
        <BankProductForm
            bankProduct={bankProduct}
            title={`Edit Product: ${bankProduct.product_name}`}
            bankProductId={Number(id)}
        />
    );
}
