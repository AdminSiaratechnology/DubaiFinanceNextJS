import React from 'react';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { currentUser } from '@/lib/mock/currentUser';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] py-6 sm:py-10">
            <div className="mx-auto px-6 lg:px-12">
                <ProfileForm initialData={currentUser} />
            </div>
        </div>
    );
}
