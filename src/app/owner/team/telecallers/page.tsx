import React from 'react';
import { mockTelecallers } from '@/lib/mock/team';
import { TeamTable } from '@/features/owner/team/components/TeamTable';

export default async function TelecallersPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';

    const filteredMembers = mockTelecallers.filter(m =>
        m.fullName.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.emiratesId.toLowerCase().includes(query)
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-light text-foreground">Telecallers Management</h1>
                <p className="text-xs text-text-muted italic">Review and manage your lead generators and collection team.</p>
            </header>

            <TeamTable members={filteredMembers} role="telecaller" />
        </div>
    );
}
