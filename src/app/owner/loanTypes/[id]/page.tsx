import { LoanTypeForm } from '@/features/owner/loantypes/components/LoanTypeForm';
import { getLoanTypeById, updateLoanType } from '@/features/owner/loantypes/api/loanTypes.api';
import { notFound } from 'next/navigation';

export default async function EditLoanTypePage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params; // ← params will now be defined

    const loanType = await getLoanTypeById(Number(id));

    if (!loanType) {
        notFound();
    }

    return (
        <LoanTypeForm
            loanType={loanType}
            title={`Edit Loan Type: ${loanType.name}`}
            loanTypeId={Number(id)}
        />
    );
}