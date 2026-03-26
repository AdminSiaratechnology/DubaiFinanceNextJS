'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { adminLogin } from '@/features/owner/api/auth.api';
import { useAuthStore } from '@/store/useAuthStore';
import { getMe } from '@/features/owner/api/auth.api';
import { saveFcmToken } from '@/features/notifications/api/notification.api';
import { getFcmToken } from "@/lib/getFcmToken";
import { getDeviceId } from "@/lib/device";

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { setUser } = useAuthStore();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await adminLogin(formData);
            const token = await getFcmToken();
            console.log("token", token);
            if (token) {
                console.log("token", token);
                const device_id = getDeviceId();
                const device_type = "web";
                await saveFcmToken(device_id, device_type, token);
            }
            const role = response.data.user.role
            const me = await getMe();
            setUser(me.data);
            if (role === 'admin') {
                router.push('/owner/dashboard');
            }
            else if (role === 'coordinator' || role === 'analyst') {
                router.push('/dashboard/analyst/main');
            }
            else if (role === 'telecaller') {
                router.push('/dashboard/telecaller/main');
            }
            else if (role === 'agent') {
                router.push('/dashboard/agent/main');
            }
            else {
                router.push('/user');
            }
        } catch (err: any) {
            const errorDetail = err?.response?.data?.detail;
            if (errorDetail) {
                setError(errorDetail);
            } else {
                setError(err?.response?.data?.message || err?.message || 'Authentication failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-6 sm:p-10 relative">
            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>

            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-background font-bold">D</span>
                        </div>
                        <h1 className="text-2xl font-black text-foreground">Dubai Finance</h1>
                    </div>

                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-medium text-foreground tracking-tight">
                            Portal Access
                        </h3>
                        <p className="text-[12px] sm:text-sm text-text-muted italic mt-1 uppercase tracking-widest font-medium opacity-80">
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest pl-1 text-text-muted">
                                Email
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-muted/20 border border-border focus:ring-2 focus:ring-foreground/20 outline-none transition-all text-sm font-semibold"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest pl-1 text-text-muted">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-xl bg-muted/20 border border-border focus:ring-2 focus:ring-foreground/20 outline-none transition-all text-sm font-semibold pr-11"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 12 12s.12 0 .12 0" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                                w-full h-12 rounded-xl font-bold uppercase tracking-widest text-xs
                                bg-foreground text-background shadow-xl
                                transition-all duration-300 flex items-center justify-center gap-3
                                ${isLoading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:bg-foreground/90 hover:-translate-y-0.5 active:translate-y-0'
                                }
                            `}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            ) : (
                                'Authorize Access'
                            )}
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => router.push('/forgot-password')}
                                className="h-12 rounded-xl font-bold tracking-widest text-[10px] uppercase
                                    bg-muted/50 text-text-muted border border-border
                                    transition-all duration-300 flex items-center justify-center gap-3 hover:bg-muted"
                            >
                                Forgot Password
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/register')}
                                className="h-12 rounded-xl font-bold tracking-widest text-[10px] uppercase
                                    bg-muted/50 text-text-muted border border-border
                                    transition-all duration-300 flex items-center justify-center gap-3 hover:bg-muted"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
