export const dynamic = 'force-dynamic'; // important for dashboards

import React from 'react';
import { OwnerLayoutClient } from '@/features/owner/dashboard/components/OwnerLayoutClient';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthInitializer from '@/components/auth/AuthInitializer';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthInitializer>
            <ProtectedRoute allowedRoles={['admin']}>
                <OwnerLayoutClient>
                    {children}
                </OwnerLayoutClient>
            </ProtectedRoute>
        </AuthInitializer>
    );
}