import { EmailConfigForm } from "@/features/owner/settings/components/EmailConfigForm";
import React from 'react';

export const metadata = {
    title: 'Email Configuration | Dubai Finance',
    description: 'Manage system email settings',
};

export default function EmailConfigPage() {
    return (
        <div className="p-4 sm:p-8">
            <EmailConfigForm />
        </div>
    );
}