import React from 'react';
import { notFound } from 'next/navigation';
import { getCoordinatorById } from '@/features/owner/team/api/analyst.api';
import { MemberForm } from '@/features/owner/team/components/MemberForm';
import Link from 'next/link';

export default async function EditAnalystPage({
    params
}: {
    params: { id: string }
}) {
    const { id } = await params;
    const member = await getCoordinatorById(Number(id));

    if (!member) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Analyst not found</p>
                <Link
                    href="/owner/team/analysts"
                    className="mt-4 text-brand font-bold hover:underline underline-offset-4"
                >
                    Return to List
                </Link>
            </div>
        );
    }

    return (
        <MemberForm
            member={member}
            memberId={Number(id)}
            title={`Edit Analyst: ${member.name}`}
            role="analyst"
        />
    );
}
