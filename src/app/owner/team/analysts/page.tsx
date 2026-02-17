import React from 'react';
import { mockAnalysts } from '@/lib/mock/team';
import { TeamTable } from '@/features/owner/team/components/TeamTable';

export default async function AnalystsPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';

    const filteredMembers = mockAnalysts.filter(m =>
        m.fullName.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.emiratesId.toLowerCase().includes(query)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-light text-foreground">Analysts Management</h1>
                <p className="text-xs text-text-muted italic">Review and manage your credit analysts and case handlers.</p>
            </header>

            <TeamTable members={filteredMembers} role="analyst" />
        </div>
    );
}
