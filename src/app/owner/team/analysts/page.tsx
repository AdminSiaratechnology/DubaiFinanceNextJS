import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { TeamTable } from '@/features/owner/team/components/TeamTable';
import { getCoordinators } from '@/features/owner/team/api/analyst.api';

export default async function AnalystsPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; status?: string }>
}) {
    const params = await searchParams;
    const query = params.query || '';
    const page = Number(params.page) || 1;
    const status = params.status || '';

    const response = await getCoordinators({
        search: query,
        page,
        limit: 10,
        status
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Analysts Management"
                description="Review and manage your credit analysts and case handlers."
            />

            <TeamTable
                members={response.items}
                role="analyst"
                page={response.page}
                total={response.total}
                limit={response.limit}
            />
        </div>
    );
}
