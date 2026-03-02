import { SLATemplateForm } from '@/features/owner/slatemplates/components/SLATemplateForm';
import { getSLAById } from '@/features/owner/slatemplates/api/sla.api';
import { notFound } from 'next/navigation';

export default async function EditLoanTypePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const slaTemplate = await getSLAById(Number(id));

    if (!slaTemplate) {
        notFound();
    }

    return (
        <SLATemplateForm
            slaTemplate={slaTemplate}
            title={`Edit SLA Template: ${slaTemplate.template_name}`}
            slaId={Number(id)}
        />
    );
}
