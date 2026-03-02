'use client';

import { resetPassword } from '@/features/owner/api/auth.api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function ResetPasswordForm({ token }: { token: string | null }) {
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        if (password !== confirmPassword) {
            setIsError(true);
            return setMessage('Passwords do not match.');
        }

        if (!token) {
            setIsError(true);
            return setMessage('Invalid or expired reset link.');
        }

        setLoading(true);
        try {
            await resetPassword({ token, new_password: password });
            setMessage('Password reset successfully.');
            setTimeout(() => router.push('/login'), 1500);
        } catch (err: any) {
            setIsError(true);
            const errorDetail = err?.response?.data?.detail;
            if (Array.isArray(errorDetail) && errorDetail.length > 0) {
                setMessage(errorDetail[0].msg);
            } else {
                setMessage(err?.response?.data?.message || err?.message || 'Failed to reset password.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-6 sm:p-10 relative min-h-screen">
            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-black tracking-tight">
                            Reset Password
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">
                            Set a new password for your account
                        </p>
                    </div>

                    {message && (
                        <div
                            className={`mb-6 p-3 rounded-xl text-sm font-semibold border ${isError
                                ? 'bg-red-500/10 border-red-500/20 text-red-600'
                                : 'bg-green-500/10 border-green-500/20 text-green-600'
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleReset} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all text-sm font-semibold pr-11"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all text-sm font-semibold pr-11"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 12 12s.12 0 .12 0" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-2xl font-black uppercase tracking-widest text-xs
              bg-brand text-white shadow-xl shadow-brand/20 transition-all duration-300
              disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}