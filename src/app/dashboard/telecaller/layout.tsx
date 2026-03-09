'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function TelecallerLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={['telecaller', 'admin']}>
            {children}
        </ProtectedRoute>
    );
}
