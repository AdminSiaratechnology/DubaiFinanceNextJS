'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from '@/lib/mock/team';
import { currentUser as mockCurrentUser } from '@/lib/mock/currentUser';
import { Card } from '@/components/ui/Card';
import { Label, Input } from '@/components/ui/Form';
import CountrySearchableSelect from '@/shared/CountrySearchableSelect';

interface ProfileFormProps {
    initialData?: TeamMember;
    onSave?: (data: Partial<TeamMember>) => void;
}

const Field = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-2">
        <Label className="text-sm font-medium text-text-muted">
            {label}
        </Label>
        {children}
    </div>
);

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<any>(initialData);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const isAdmin = formData?.role === 'admin';
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Handle nested admin_profile updates
        if (isAdmin && (name === 'name' || name === 'phone' || name === 'address')) {
            setFormData((prev: any) => ({
                ...prev,
                admin_profile: {
                    ...prev.admin_profile,
                    [name]: value
                }
            }));
            return;
        }

        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (onSave) {
                onSave(formData);
            }
            alert('Profile updated successfully');
        } catch (error) {
            alert('Failed to update profile');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-background p-4 md:p-6 lg:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-text-primary bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:bg-card hover:border-brand/30 transition-all shadow-sm hover:shadow-md group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Dashboard
                    </button>

                    <div className="hidden sm:flex text-xs font-semibold text-text-muted bg-card/30 px-4 py-2 rounded-xl border border-border uppercase tracking-widest">
                        Last updated: {isAdmin ? new Date(formData.updated_at).toLocaleDateString() : 'Today at 2:30 PM'}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="p-8 bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300 group">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 pb-5 border-b border-border/60">
                                <div className="w-12 h-12 rounded-xl bg-blue/10 dark:bg-blue/20 flex items-center justify-center text-blue shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-text-primary tracking-tight">
                                        Personal Information
                                    </h2>
                                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Identity & Contact Details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isAdmin ? (
                                    <>
                                        <Field label="Full Name">
                                            <Input
                                                name="name"
                                                value={formData.admin_profile?.name || ''}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                required
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Email Address">
                                            <Input
                                                name="email"
                                                type="email"
                                                value={formData.email || ''}
                                                disabled
                                                className="h-12 text-base bg-muted/40 border-border opacity-60 cursor-not-allowed"
                                            />
                                        </Field>

                                        <Field label="Phone">
                                            <Input
                                                name="phone"
                                                value={formData.admin_profile?.phone || ''}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Address">
                                            <Input
                                                name="address"
                                                value={formData.admin_profile?.address || ''}
                                                onChange={handleChange}
                                                placeholder="Enter address"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Member Since">
                                            <div className="h-12 flex items-center px-4 rounded-xl border border-border bg-muted/40 text-text-muted text-sm font-medium">
                                                {new Date(formData.created_at).toLocaleDateString()}
                                            </div>
                                        </Field>
                                    </>
                                ) : (
                                    <>
                                        <Field label="Full Name">
                                            <Input
                                                name="fullName"
                                                value={formData.fullName || ''}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                required
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Email Address">
                                            <Input
                                                name="email"
                                                type="email"
                                                value={formData.email || ''}
                                                disabled
                                                className="h-12 text-base bg-muted/40 border-border opacity-60 cursor-not-allowed"
                                            />
                                        </Field>

                                        <Field label="Mobile Number">
                                            <Input
                                                name="mobile"
                                                value={formData.mobile || ''}
                                                onChange={handleChange}
                                                placeholder="+971 XX XXX XXXX"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Emirates ID">
                                            <Input
                                                name="emiratesId"
                                                value={formData.emiratesId || ''}
                                                onChange={handleChange}
                                                placeholder="784-XXXX-XXXXXXX-X"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Nationality">
                                            <CountrySearchableSelect
                                                label="Nationality"
                                                value={formData.nationality || null}
                                                onChange={(value) => setFormData((prev: any) => ({ ...prev, nationality: value }))}
                                                placeholder="Select your nationality"
                                                className="w-full"
                                            />
                                        </Field>

                                        <Field label="Experience">
                                            <Input
                                                name="experience"
                                                value={formData.experience || ''}
                                                onChange={handleChange}
                                                placeholder="5 Years"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Company">
                                            <Input
                                                name="companyName"
                                                value={formData.companyName || ''}
                                                onChange={handleChange}
                                                placeholder="Company Name"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Role">
                                            <div className="h-12 flex items-center px-4 rounded-xl border border-border bg-muted/40 text-text-secondary text-base font-semibold">
                                                {formData.role || 'N/A'}
                                            </div>
                                        </Field>
                                    </>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Banking Details Card - Only for non-admins */}
                    {!isAdmin && (
                        <Card className="p-8 bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 pb-5 border-b border-border/60">
                                    <div className="w-12 h-12 rounded-xl bg-purple/10 dark:bg-purple/20 flex items-center justify-center text-purple shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="6" width="20" height="16" rx="2" />
                                            <path d="M2 10h20" />
                                            <path d="M7 15h.01" />
                                            <path d="M11 15h.01" />
                                            <path d="M15 15h.01" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-text-primary tracking-tight">
                                            Banking Details
                                        </h2>
                                        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Payment & Settlement Information</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <Field label="Account Holder Name">
                                        <Input
                                            name="accountHolder"
                                            value={formData.accountHolder || ''}
                                            onChange={handleChange}
                                            placeholder="Full name as per bank records"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>

                                    <Field label="Bank Name">
                                        <Input
                                            name="bankName"
                                            value={formData.bankName || ''}
                                            onChange={handleChange}
                                            placeholder="e.g., Emirates NBD"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>

                                    <Field label="Account Number">
                                        <Input
                                            name="accountNumber"
                                            value={formData.accountNumber || ''}
                                            onChange={handleChange}
                                            placeholder="Bank account number"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>

                                    <Field label="IBAN">
                                        <Input
                                            name="iban"
                                            value={formData.iban || ''}
                                            onChange={handleChange}
                                            placeholder="AEXX XXXX XXXX XXXX XXX"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setFormData(initialData)}
                            className="px-8 py-3.5 rounded-xl border border-border text-base font-bold text-text-muted hover:bg-muted hover:text-text-primary transition-all active:scale-95"
                            disabled={isSaving}
                        >
                            Cancel Changes
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-10 py-3.5 bg-brand text-brand-foreground rounded-xl text-base font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 flex items-center justify-center min-w-[200px]"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-brand-foreground/30 border-t-brand-foreground rounded-full animate-spin mr-3" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save Profile
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}