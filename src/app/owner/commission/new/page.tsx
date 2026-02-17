'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { CommissionForm } from '@/features/owner/commission/components/CommissionForm';

export default function NewCommissionRulePage() {
    const router = useRouter();

    const handleSave = (data: any) => {
        console.log('New Commission Rule Saved:', data);
        // TODO: Add logic here to save to store/API
        router.push('/owner/commission');
    };

    return (
        <CommissionForm
            title="Add New Commission Rule"
            onSave={handleSave}
            onCancel={() => router.push('/owner/commission')}
        />
    );
}
