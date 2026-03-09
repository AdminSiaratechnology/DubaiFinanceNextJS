'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AnalystLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={['analyst', 'coordinator', 'admin']}>
            {children}
        </ProtectedRoute>
    );
}
