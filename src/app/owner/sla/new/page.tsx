'use client';

import { useRouter } from 'next/navigation';
import { SLATemplateForm } from '@/features/owner/slatemplates/components/SLATemplateForm';

export default function NewSLATemplatePage() {
    const router = useRouter();

    const handleSave = async (data: any) => {
        console.log('Create SLA Template:', data);
        // TODO: POST /sla-templates (backend)
        router.push('/owner/sla');
    };

    return (
        <SLATemplateForm
            title="Create New SLA Template"
            onSave={handleSave}
            onCancel={() => router.push('/owner/sla')}
        />
    );
}
