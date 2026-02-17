import React from 'react';
import { OwnerLayoutClient } from '@/features/owner/dashboard/components/OwnerLayoutClient';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <OwnerLayoutClient>
            {children}
        </OwnerLayoutClient>
    );
}
