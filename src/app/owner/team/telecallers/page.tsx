import React from 'react';
import { getTelecallers } from '@/features/owner/team/api/telecaller.api';
import { PageHeader } from '@/components/PageHeader';
import { TeamTable } from '@/features/owner/team/components/TeamTable';

export default async function TelecallersPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; status?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';
    const page = Number(params.page) || 1;
    const status = params.status || '';

    const { items: members, total } = await getTelecallers({
        page,
        limit: 10,
        search: query,
        status,
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Telecallers Management"
                description="Review and manage your lead generators and collection team."
            />

            <TeamTable
                members={members}
                role="telecaller"
                page={page}
                total={total}
                limit={10}
            />
        </div>
    );
}
