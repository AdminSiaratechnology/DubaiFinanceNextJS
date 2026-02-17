'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockTelecallers } from '@/lib/mock/team';
import { MemberForm } from '@/features/owner/team/components/MemberForm';

export default function EditTelecallerPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const member = mockTelecallers.find(m => m.id === id);

    const handleSave = (data: any) => {
        console.log('Telecaller Updated:', data);
    };

    if (!member) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-text-muted">
                <p>Telecaller not found</p>
                <button
                    onClick={() => router.push('/owner/team/telecallers')}
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
            title={`Edit Telecaller: ${member.fullName}`}
            role="telecaller"
            onSave={handleSave}
            onCancel={() => router.push('/owner/team/telecallers')}
        />
    );
}
