'use client';

import React, { useEffect, useState } from 'react';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { getMe } from '@/features/owner/api/auth.api';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe();
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
                    <p className="text-sm font-medium text-text-muted animate-pulse">Loading Profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto">
                <ProfileForm initialData={user} />
            </div>
        </div>
    );
}
