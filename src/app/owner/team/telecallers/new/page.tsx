'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MemberForm } from '@/features/owner/team/components/MemberForm';

export default function NewTelecallerPage() {
    const router = useRouter();

    const handleSave = (data: any) => {
        console.log('New Telecaller Saved:', data);
    };

    return (
        <MemberForm
            title="Create New Telecaller"
            role="telecaller"
            onSave={handleSave}
            onCancel={() => router.push('/owner/team/telecallers')}
        />
    );
}
