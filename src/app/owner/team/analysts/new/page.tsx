'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MemberForm } from '@/features/owner/team/components/MemberForm';

export default function NewAnalystPage() {
    const router = useRouter();

    const handleSave = (data: any) => {
        console.log('New Analyst Saved:', data);
        // Add logic here to save to store/API
    };

    return (
        <MemberForm
            title="Create New Analyst"
            role="analyst"
            onSave={handleSave}
            onCancel={() => router.push('/owner/team/analysts')}
        />
    );
}
