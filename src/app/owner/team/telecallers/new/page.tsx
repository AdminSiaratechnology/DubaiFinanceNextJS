'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MemberForm } from '@/features/owner/team/components/MemberForm';

export default function NewTelecallerPage() {
    const router = useRouter();

    return (
        <MemberForm
            title="Create New Telecaller"
            role="telecaller"
        />
    );
}
