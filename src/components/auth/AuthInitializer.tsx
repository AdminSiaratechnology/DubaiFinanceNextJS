'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getMe } from '@/features/owner/api/auth.api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function AuthInitializer({
    children,
}: {
    children: React.ReactNode;
}) {
    const setUser = useAuthStore((state) => state.setUser);
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    // 🔥 Bypass auth for password reset flow
    const isAuthBypassRoute =
        pathname === '/forgot-password' ||
        (pathname === '/reset-password' && token);

    const isPublicRoute = ['/', '/login', '/register', '/forgot-password', '/reset-password'].includes(pathname);

    const { isInitializing, setIsInitializing } = useAuthStore();
    const hasFetched = useRef(false);

    useEffect(() => {
        // 🚨 IMPORTANT: Skip auth check for reset password page
        if (isAuthBypassRoute) {
            setIsInitializing(false);
            return;
        }

        if (hasFetched.current) return;
        hasFetched.current = true;

        const initAuth = async () => {
            try {
                const response = await getMe();
                const userData = response.data;
                if (userData) {
                    setUser(userData);

                    // Redirect logged-in users away from auth pages
                    if (isPublicRoute && !['/forgot-password', '/reset-password'].includes(pathname)) {
                        const role = userData.role;
                        if (role === 'admin') {
                            router.push('/owner/dashboard');
                        } else if (role === 'coordinator') {
                            router.push('/dashboard/analyst/main');
                        } else if (role === 'telecaller') {
                            router.push('/dashboard/telecaller/main');
                        } else {
                            router.push('/user');
                        }
                    }
                }
            } catch (error) {
                console.debug('Auth initialization: No active session found.');
            } finally {
                setIsInitializing(false);
            }
        };

        initAuth();
    }, [pathname, token, isAuthBypassRoute, isPublicRoute, router, setUser, setIsInitializing]);

    // Also prevent loader from blocking reset page
    if (isAuthBypassRoute) {
        return <>{children}</>;
    }

    return (
        <>
            {isInitializing && (
                <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background p-4">
                    <div className="relative flex items-center justify-center">
                        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-l-2 border-brand"></div>
                        <div className="absolute h-10 w-10 animate-pulse rounded-full bg-brand/20"></div>
                    </div>
                    <div className="mt-8 flex flex-col items-center gap-1">
                        <h2 className="text-xl font-semibold tracking-wider text-brand">DUBAI FINANCE</h2>
                        <p className="text-sm font-medium text-text-muted italic">
                            Securely preparing your dashboard...
                        </p>
                    </div>
                </div>
            )}
            {children}
        </>
    );
}