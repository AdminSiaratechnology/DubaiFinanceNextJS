'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

type Role = 'admin' | 'agent' | 'analyst' | 'telecaller' | 'coordinator';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isInitializing } = useAuthStore();

  useEffect(() => {
    // Wait until auth initialization is complete
    if (isInitializing) return;

    // Not logged in
    if (!user) {
      router.replace(redirectTo);
      return;
    }

    // Role-based protection
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace('/unauthorized'); // optional page
    }
  }, [user, router, allowedRoles, redirectTo, isInitializing]);
  // Prevent UI flash while checking auth
  if (isInitializing || !user) {
    return (
      <div className="flex items-center justify-center h-screen font-semibold">
        Verifying access...
      </div>
    );
  }

  return <>{children}</>;
}