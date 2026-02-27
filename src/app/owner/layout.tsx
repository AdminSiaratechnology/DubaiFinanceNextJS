import React from 'react';
import { OwnerLayoutClient } from '@/features/owner/dashboard/components/OwnerLayoutClient';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <OwnerLayoutClient>
                {children}
            </OwnerLayoutClient>
        </ProtectedRoute>
    );
}
