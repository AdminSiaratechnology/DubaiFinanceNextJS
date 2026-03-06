'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { getMe } from '@/features/owner/api/auth.api';

export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        if (user) {
          redirectByRole(user.role);
          return;
        }

        const res = await getMe();
        const userData = res?.data;

        if (userData) {
          setUser(userData);
          redirectByRole(userData.role);
        } else {
          router.replace('/login');
        }
      } catch (error) {
        router.replace('/login');
      }
    };

    init();
  }, [router, user, setUser]);

  const redirectByRole = (role: string) => {
    if (role === 'admin') {
      router.replace('/owner/dashboard');
    } else if (role === 'analyst') {
      router.replace('/dashboard/analyst/main');
    } else if (role === 'telecaller') {
      router.replace('/dashboard/telecaller/main');
    } else if (role === 'coordinator') {
      router.replace('/dashboard/coordinator/main');
    } else {
      router.replace('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm font-semibold text-muted-foreground">
        Checking session...
      </p>
    </div>
  );
}