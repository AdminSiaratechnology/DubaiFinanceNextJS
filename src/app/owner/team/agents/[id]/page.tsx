import React from 'react';
import { notFound } from 'next/navigation';
import { getAgentById } from '@/features/owner/team/api/agent.api';
import { MemberForm } from '@/features/owner/team/components/MemberForm';
import Link from 'next/link';

export default async function EditAgentPage({
    params
}: {
    params: { id: string }
}) {
    const { id } = await params;
    const member = await getAgentById(Number(id));

    if (!member) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Agent not found</p>
                <Link
                    href="/owner/team/agents"
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
            title={`Edit Agent: ${member.name}`}
            role="agent"
        />
    );
}
