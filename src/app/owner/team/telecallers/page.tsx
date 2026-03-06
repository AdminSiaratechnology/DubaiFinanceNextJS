import React from 'react';
import { mockTelecallers, TeamMember } from '@/lib/mock/team';
import { PageHeader } from '@/components/PageHeader';
import { TeamTable } from '@/features/owner/team/components/TeamTable';
import { Coordinator } from '@/features/owner/team/api/analyst.api';

export default async function TelecallersPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; status?: string }>
}) {
    const params = await searchParams;
    const query = params.query?.toLowerCase() || '';
    const page = Number(params.page) || 1;
    const status = params.status || '';

    // Map mock data for now to satisfy types until Telecaller API is available
    const mappedMembers: Coordinator[] = mockTelecallers
        .filter(m =>
            (m.fullName.toLowerCase().includes(query) ||
                m.email.toLowerCase().includes(query) ||
                m.emiratesId.toLowerCase().includes(query)) &&
            (status === '' || m.status === status)
        )
        .map(m => ({
            id: parseInt(m.id.replace(/\D/g, '') || '0'),
            name: m.fullName,
            email: m.email,
            phone: m.mobile,
            emirates_id: m.emiratesId,
            nationality: m.nationality,
            experience: parseInt(m.experience),
            account_holder_name: m.accountHolder,
            bank_name: m.bankName,
            account_number: m.accountNumber,
            iban: m.iban,
            status: m.status,
            created_at: m.joinedDate,
            updated_at: m.joinedDate
        }));

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <PageHeader
                title="Telecallers Management"
                description="Review and manage your lead generators and collection team."
            />

            <TeamTable
                members={mappedMembers}
                role="telecaller"
                page={page}
                total={mappedMembers.length}
                limit={10}
            />
        </div>
    );
}
