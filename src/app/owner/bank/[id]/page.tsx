import { notFound } from 'next/navigation';
import { BankForm } from '@/features/owner/bank/components/BankForm';
import { getBankById } from '@/features/owner/bank/api/bank.api';
export default async function EditBankPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;
    const bank = await getBankById(Number(id));

    if (!bank) {
        notFound();
    }

    return (
        <BankForm
            bank={bank}
            title={`Edit Bank: ${bank.name}`}
            bankId={Number(id)}
        />
    );
}
