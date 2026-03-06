import React from 'react';
import { notFound } from 'next/navigation';
import { mockTelecallers } from '@/lib/mock/team';
import { MemberForm } from '@/features/owner/team/components/MemberForm';
import { Coordinator } from '@/features/owner/team/api/analyst.api';
import Link from 'next/link';

export default async function EditTelecallerPage({
    params
}: {
    params: { id: string }
}) {
    const { id } = await params;
    const mockMember = mockTelecallers.find(m => m.id === id);

    if (!mockMember) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Telecaller not found</p>
                <Link
                    href="/owner/team/telecallers"
                    className="mt-4 text-brand font-bold hover:underline"
                >
                    Return to List
                </Link>
            </div>
        );
    }

    // Map mock to Coordinator type for MemberForm
    const member: Coordinator = {
        id: parseInt(mockMember.id.replace(/\D/g, '') || '0'),
        name: mockMember.fullName,
        email: mockMember.email,
        phone: mockMember.mobile,
        emirates_id: mockMember.emiratesId,
        nationality: mockMember.nationality,
        experience: parseInt(mockMember.experience) || 0,
        account_holder_name: mockMember.accountHolder,
        bank_name: mockMember.bankName,
        account_number: mockMember.accountNumber,
        iban: mockMember.iban,
        status: mockMember.status,
        created_at: mockMember.joinedDate,
        updated_at: mockMember.joinedDate
    };

    return (
        <MemberForm
            member={member}
            memberId={member.id}
            title={`Edit Telecaller: ${member.name}`}
            role="telecaller"
        />
    );
}
