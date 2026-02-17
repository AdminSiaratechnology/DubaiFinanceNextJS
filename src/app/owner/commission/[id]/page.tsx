'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { mockCommissionRules } from '@/lib/mock/commissionRules'
import { CommissionForm } from '@/features/owner/commission/components/CommissionForm'

export default function EditCommissionPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const commission = mockCommissionRules.find(c => c.id === id)
    const handleSave = (data: any) => {
        console.log('Commission Updated:', data)
        // TODO: Add logic here to update in store/API
        router.push('/owner/commission')
    }

    if (!commission) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Commission not found</p>
                <button
                    onClick={() => router.push('/owner/commission')}
                    className="mt-4 text-brand font-bold hover:underline"
                >
                    Return to List
                </button>
            </div>
        )
    }

    return (
        <CommissionForm
            commissionForm={commission}
            title={`Edit Commission Rule`}
            onSave={handleSave}
            onCancel={() => router.push('/owner/commission')}
        />
    )
}