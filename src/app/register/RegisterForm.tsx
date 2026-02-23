'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SectionCardProps {
    number: string;
    title: string;
    children: React.ReactNode;
}

function SectionCard({ number, title, children }: SectionCardProps) {
    return (
        <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold border border-indigo-200/60 dark:border-indigo-800/60">
                    {number}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {title}
                    </h3>
                    <div className="h-0.5 w-10 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mt-1" />
                </div>
            </div>
            {children}
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
}

function Input({ label, required, ...props }: InputProps) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <input
                {...props}
                className="w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
        </div>
    );
}

interface FormData {
    fullName: string;
    email: string;
    mobile: string;
    emiratesId: string;
    nationality: string;
    companyName: string;
    experience: string;
    accountHolder: string;
    bankName: string;
    iban: string;
    agreedKYC: boolean;
    agreedTerms: boolean;
}

export function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        mobile: '',
        emiratesId: '',
        nationality: '',
        companyName: '',
        experience: '',
        accountHolder: '',
        bankName: '',
        iban: '',
        agreedKYC: false,
        agreedTerms: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await new Promise((res) => setTimeout(res, 2000));
            router.push('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
        setFormData((prev) => ({ ...prev, [key]: value }));

    return (
        <form
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden"
        >
            <div className="px-7 py-7 border-b border-slate-200/70 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            Agent Registration
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Complete your profile to unlock commissions & payouts
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 space-y-4">
                <SectionCard number="01" title="Personal Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                label="Full Name (as per Emirates ID)"
                                required
                                placeholder="Enter your legal name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('fullName', e.target.value)}
                            />
                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            required
                            placeholder="you@example.com"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('email', e.target.value)}
                        />

                        <Input
                            label="Mobile Number"
                            type="tel"
                            required
                            placeholder="+971 XX XXX XXXX"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('mobile', e.target.value)}
                        />

                        <Input
                            label="Emirates ID"
                            required
                            placeholder="784-XXXX-XXXXXXX-X"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('emiratesId', e.target.value)}
                        />

                        <Input
                            label="Nationality"
                            required
                            placeholder="Country of citizenship"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('nationality', e.target.value)}
                        />
                    </div>
                </SectionCard>

                {/* Professional */}
                <SectionCard number="02" title="Professional Background">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                            label="Company / Business Name"
                            placeholder="Optional"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('companyName', e.target.value)}
                        />

                        <Input
                            label="Years of Experience"
                            placeholder="e.g. 5 years"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('experience', e.target.value)}
                        />
                    </div>
                </SectionCard>

                {/* Banking */}
                <SectionCard number="03" title="Banking Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <Input
                                label="Account Holder Name"
                                required
                                placeholder="As per bank records"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('accountHolder', e.target.value)}
                            />
                        </div>

                        <Input
                            label="Bank Name"
                            required
                            placeholder="e.g. Emirates NBD"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('bankName', e.target.value)}
                        />

                        <Input
                            label="IBAN"
                            required
                            placeholder="AE00 XXXX XXXX XXXX XXX"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('iban', e.target.value)}
                        />
                    </div>
                </SectionCard>

                {/* Commission Card (Premium look) */}
                <div className="relative overflow-hidden rounded-2xl border border-indigo-200/60 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Commission Structure
                        </h4>
                        <button
                            type="button"
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            View payout terms →
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {[
                            ['Credit Card (Lead)', 'AED 200'],
                            ['Credit Card (Complete)', 'AED 500'],
                            ['Personal Loan', 'AED 750'],
                            ['Personal Finance', '1.5% (Max 2k)'],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex items-center justify-between p-3 rounded-md bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                            >
                                <span className="text-slate-600 dark:text-slate-400">
                                    {label}
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3">
                    {([
                        {
                            key: 'agreedKYC',
                            text: 'I confirm that I will complete KYC verification and provide required documentation',
                        },
                        {
                            key: 'agreedTerms',
                            text: 'I accept the Agent Agreement and Code of Conduct',
                        },
                    ] as { key: keyof FormData; text: string }[]).map((item) => (
                        <label
                            key={item.key}
                            className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                required
                                className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(item.key as keyof FormData, e.target.checked)}
                            />
                            <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.text}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Sticky Footer CTA */}
            <div className="sticky bottom-0 px-6 md:px-8 py-5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Complete Registration'
                    )}
                </button>
            </div>
        </form>
    );
}