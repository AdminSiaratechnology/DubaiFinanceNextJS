import React from 'react';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background text-foreground">
            <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden border-r border-border">
                <div className="absolute inset-0 bg-linear-to-br from-brand/5 via-transparent to-blue-500/5" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-xl shadow-brand/20">
                            <span className="text-white font-black text-xl">D</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">
                            Dubai Finance
                        </h1>
                    </div>

                    <div className="max-w-lg">
                        <h2 className="text-5xl font-black leading-tight mb-6">
                            Executive <span className="text-brand">Finance</span> Portal
                        </h2>
                        <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                            Secure access to analytics, case management, and real-time
                            financial operations for your organization.
                        </p>

                        <div className="mt-10 flex gap-6 text-sm font-semibold text-muted-foreground">
                            <span>• Real-time Analytics</span>
                            <span>• Role-Based Access</span>
                            <span>• Secure System</span>
                        </div>
                    </div>
                </div>

                <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    © 2026 Dubai Finance. All Rights Reserved.
                </p>
            </div>

            <LoginForm />
        </div>
    );
}
