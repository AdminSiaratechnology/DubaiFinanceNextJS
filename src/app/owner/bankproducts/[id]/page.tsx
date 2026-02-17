'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockBankProducts } from '@/lib/mock/bankProducts';
import { BankProductForm } from '@/features/owner/bankproducts/components/BankProductForm';

export default function EditBankProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const bankProduct = mockBankProducts.find(bp => bp.id === id);

    const handleSave = (data: any) => {
        console.log('Bank Product Updated:', data);
        // TODO: Add logic here to update in store/API
        router.push('/owner/bankproducts');
    };

    if (!bankProduct) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Bank product not found</p>
                <button
                    onClick={() => router.push('/owner/bankproducts')}
                    className="mt-4 text-brand font-bold hover:underline"
                >
                    Return to List
                </button>
            </div>
        );
    }

    return (
        <BankProductForm
            bankProduct={bankProduct}
            title={`Edit Product: ${bankProduct.productName}`}
            onSave={handleSave}
            onCancel={() => router.push('/owner/bankproducts')}
        />
    );
}
