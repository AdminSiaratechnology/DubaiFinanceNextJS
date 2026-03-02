import { PageHeader } from '@/components/PageHeader';
import { BankTable } from '@/features/owner/bank/components/BankTable';
import { getBanks } from '@/features/owner/bank/api/bank.api';
export default async function BanksPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; status?: string }>
}) {
     const params = await searchParams;

  const query = params.query || '';
  const page = Number(params.page || 1);
  const status = params.status || '';

    const data = await getBanks({
        page,
        limit: 5,
        search: query,
        status,
    });
    console.log(data)
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Bank Management"
                description="Manage your partner banks and their loan products."
            />

            <BankTable banks={data.items} page={data.page} total={data.total} limit={data.limit} />
        </div>
    );
}
