import { notFound } from 'next/navigation';
import { getCommissionById } from '@/features/owner/commission/api/commission.api';
import { CommissionForm } from '@/features/owner/commission/components/CommissionForm';

export default async function EditCommissionPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const commission = await getCommissionById(Number(id));

    if (!commission) {
        notFound();
    }

    return (
        <CommissionForm
            commission={commission}
            commissionId={Number(id)}
            title={`Edit Commission Rule`}
        />
    );
}