import React from 'react';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] py-6 sm:py-10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Header Section - Server Rendered */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-2.5 bg-purple-soft rounded-xl mb-3 text-purple">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="16" y1="11" x2="22" y2="11" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1 uppercase">Agent Registration</h1>
                    <p className="text-[11px] font-semibold text-text-muted">
                        Earn competitive commissions by referring customers for financial products.
                        Complete the registration to get your unique referral code.
                    </p>
                </div>

                {/* Client Side Form */}
                <RegisterForm />
            </div>
        </div>
    );
}
