import React from 'react';
import { notFound } from 'next/navigation';
import { getTelecallerById } from '@/features/owner/team/api/telecaller.api';
import { MemberForm } from '@/features/owner/team/components/MemberForm';
import Link from 'next/link';

export default async function EditTelecallerPage({
    params
}: {
    params: { id: string }
}) {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const member = await getTelecallerById(id);

    if (!member) {
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

    return (
        <MemberForm
            member={member}
            memberId={member.id}
            title={`Edit Telecaller: ${member.name}`}
            role="telecaller"
        />
    );
}
