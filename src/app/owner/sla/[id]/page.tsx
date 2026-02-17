'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockSLATemplates } from '@/lib/mock/slaTemplates';
import { SLATemplateForm } from '@/features/owner/slatemplates/components/SLATemplateForm';

export default function EditLoanTypePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const slaTemplate = mockSLATemplates.find(st => st.id === id);

    const handleSave = (data: any) => {
        console.log('SLA Template Updated:', data);
        // TODO: Add logic here to update in store/API
        router.push('/owner/sla');
    };

    if (!slaTemplate) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>SLA Template not found</p>
                <button
                    onClick={() => router.push('/owner/sla')}
                    className="mt-4 text-brand font-bold hover:underline"
                >
                    Return to List
                </button>
            </div>
        );
    }

    return (
        <SLATemplateForm
            slaTemplate={slaTemplate}
            title={`Edit SLA Template: ${slaTemplate.name}`}
            onSave={handleSave}
            onCancel={() => router.push('/owner/sla')}
        />
    );
}
