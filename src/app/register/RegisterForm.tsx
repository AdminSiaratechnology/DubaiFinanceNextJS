'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        emiratesId: '',
        nationality: '',
        companyName: '',
        experience: '',
        accountHolder: '',
        bankName: '',
        accountNumber: '',
        iban: '',
        agreedKYC: false,
        agreedTerms: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise((res) => setTimeout(res, 2000));
            // Show success or redirect
            router.push('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-4xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/20 space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-soft text-purple text-[10px] font-black">1</span>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                    <div className="col-span-1 md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Legal Full Name *</label>
                        <input
                            type="text"
                            required
                            placeholder="As per Emirates ID"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-text-muted/50"
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Email Address *</label>
                        <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Mobile Number *</label>
                        <input
                            type="tel"
                            required
                            placeholder="+971 50 123 4567"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Emirates ID *</label>
                        <input
                            type="text"
                            required
                            placeholder="784-YYYY-XXXXXXX-X"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, emiratesId: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Nationality *</label>
                        <input
                            type="text"
                            required
                            placeholder="Country of passport"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-soft text-purple text-[10px] font-black">2</span>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Professional Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Company / Freelance</label>
                        <input
                            type="text"
                            placeholder="Your organization name"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Experience (Years)</label>
                        <input
                            type="text"
                            placeholder="e.g. 5 Years"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-soft text-purple text-[10px] font-black">3</span>
                    <h3 className="text-sm font-bold text-foreground tracking-wider">Bank Details (for commission payouts)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                    <div className="col-span-1 md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Account Holder Name *</label>
                        <input
                            type="text"
                            required
                            placeholder="As per bank statement"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Bank Name *</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. FAB, ENBD"
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">IBAN Number *</label>
                        <input
                            type="text"
                            required
                            placeholder="AE07..."
                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-purple-soft/30 dark:bg-purple-900/10 rounded-2xl p-5 border border-purple/10">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black text-purple uppercase tracking-widest">Global Commission Structure</h4>
                    <span className="text-[9px] font-bold text-text-muted italic underline cursor-help">Payout Terms</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {[
                        { label: 'Credit Card (Lead)', value: 'AED 200' },
                        { label: 'Credit Card (Complete)', value: 'AED 500' },
                        { label: 'Personal Loan', value: 'AED 750' },
                        { label: 'Personal Finance', value: '1.5% (Max 2k)' },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[11px] font-bold border-b border-purple/5 pb-1">
                            <span className="text-text-secondary truncate pr-2">{item.label}</span>
                            <span className="text-foreground shrink-0">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label className="flex items-start gap-3 p-3 bg-muted/10 border border-border rounded-xl cursor-pointer hover:bg-muted/20 transition-all group">
                    <input
                        type="checkbox"
                        required
                        className="mt-0.5 w-4 h-4 rounded border-border text-purple focus:ring-purple-500 accent-purple transition-all"
                        onChange={(e) => setFormData({ ...formData, agreedKYC: e.target.checked })}
                    />
                    <span className="text-[11px] font-semibold text-text-secondary leading-relaxed group-hover:text-foreground">
                        Complete KYC verification & provide legal documentation (Emirates ID, Bank Proof).
                    </span>
                </label>
                <label className="flex items-start gap-3 p-3 bg-muted/10 border border-border rounded-xl cursor-pointer hover:bg-muted/20 transition-all group">
                    <input
                        type="checkbox"
                        required
                        className="mt-0.5 w-4 h-4 rounded border-border text-purple focus:ring-purple-500 accent-purple transition-all"
                        onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
                    />
                    <span className="text-[11px] font-semibold text-text-secondary leading-relaxed group-hover:text-foreground">
                        Explicitly accept the <button type="button" className="text-purple font-bold">Agent Agreement</button> and <button type="button" className="text-purple font-bold">Code of Conduct</button>.
                    </span>
                </label>
            </div>
            <div className="flex items-center gap-4 pt-2">
                <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="px-6 py-3 border border-border rounded-xl text-xs font-black uppercase tracking-widest text-text-muted hover:bg-muted hover:text-foreground transition-all"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3.5 bg-brand text-brand-foreground rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-brand/20 hover:scale-[1.01] active:translate-y-px transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Verify & Register
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </>
                    )}
                </button>
            </div>

            <p className="text-center text-[10px] font-bold text-text-muted/60 pt-2 border-t border-border/50">
                After submission, our team will review and activate your account within 24-48 hours.            </p>
        </form>
    );
}
