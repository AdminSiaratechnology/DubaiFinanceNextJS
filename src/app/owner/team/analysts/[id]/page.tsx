'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockAnalysts } from '@/lib/mock/team';
import { MemberForm } from '@/features/owner/team/components/MemberForm';

export default function EditAnalystPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const member = mockAnalysts.find(m => m.id === id);

    const handleSave = (data: any) => {
        console.log('Analyst Updated:', data);
        // Add logic here to update in store/API
    };

    if (!member) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Analyst not found</p>
                <button
                    onClick={() => router.push('/owner/team/analysts')}
                    className="mt-4 text-brand font-bold hover:underline"
                >
                    Return to List
                </button>
            </div>
        );
    }

    return (
        <MemberForm
            member={member}
            title={`Edit Analyst: ${member.fullName}`}
            role="analyst"
            onSave={handleSave}
            onCancel={() => router.push('/owner/team/analysts')}
        />
    );
}
