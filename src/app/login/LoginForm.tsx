'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

type Role = 'agent' | 'analyst' | 'owner';

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'agent' as Role,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulate API delay (replace with real API later)
            await new Promise((res) => setTimeout(res, 1200));

            // Role-based routing (SSR friendly structure)
            switch (formData.role) {
                case 'agent':
                    router.push('/dashboard/agent/main');
                    break;
                case 'analyst':
                    router.push('/dashboard/analyst/main');
                    break;
                case 'owner':
                    router.push('/owner/dashboard');
                    break;
                default:
                    router.push('/dashboard/agent/main');
            }
        } catch (err) {
            setError('Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const roles: Role[] = ['agent', 'analyst', 'owner'];

    return (
        <div className="flex items-center justify-center p-6 sm:p-10 relative">
            {/* Top Controls */}
            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>

            {/* Subtle Background Grid */}
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

            {/* Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold">D</span>
                        </div>
                        <h1 className="text-2xl font-black">Dubai Finance</h1>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-black tracking-tight">
                            Portal Access
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Email / Username
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all text-sm font-semibold"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all text-sm font-semibold"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                        </div>

                        {/* Role Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Select Role
                            </label>
                            <div className="grid grid-cols-3 gap-2 bg-muted p-1 rounded-xl border border-border">
                                {roles.map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() =>
                                            setFormData({ ...formData, role })
                                        }
                                        className={`
                                            py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all
                                            ${formData.role === role
                                                ? 'bg-background text-brand border border-brand/30 shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                            }
                                        `}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                                w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs
                                bg-brand text-white shadow-xl shadow-brand/20
                                transition-all duration-300 flex items-center justify-center gap-3
                                ${isLoading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:-translate-y-1 hover:shadow-brand/40 active:translate-y-0'
                                }
                            `}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Authorize Access'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/register')}
                            className="w-full py-4 rounded-2xl font-black tracking-widest text-xs
                        bg-gray-500 text-black shadow-xl shadow-brand/20
                        transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            Register as Agent
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
