'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MemberForm } from '@/features/owner/team/components/MemberForm';

export default function NewAnalystPage() {
    const router = useRouter();

    return (
        <MemberForm
            title="Create New Coordinator"
            role="analyst"
        />
    );
}
