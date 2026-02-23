'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from '@/lib/mock/team';
import { currentUser as mockCurrentUser } from '@/lib/mock/currentUser';
import { Card } from '@/components/ui/Card';
import { Label, Input } from '@/components/ui/Form';

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
    <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">
            {label}
        </Label>
        {children}
    </div>
);

export function ProfileForm({ initialData = mockCurrentUser, onSave }: ProfileFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<TeamMember>>(initialData);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-end mb-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-white/50 border border-transparent hover:border-border"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Simple header with avatar and name */}
                <div className="flex items-center gap-4 pb-2">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-lg font-semibold text-brand">
                        {formData.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-foreground">
                            {formData.fullName || 'Your Profile'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {formData.role || 'Team Member'} • {formData.email}
                        </p>
                    </div>
                </div>

                {/* Personal Information */}
                <Card className="p-6">
                    <div className="space-y-5">
                        <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <Field label="Full Name">
                                <Input
                                    name="fullName"
                                    value={formData.fullName || ''}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Email Address">
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email || ''}
                                    disabled
                                    className="h-10 bg-muted/30"
                                />
                            </Field>

                            <Field label="Mobile Number">
                                <Input
                                    name="mobile"
                                    value={formData.mobile || ''}
                                    onChange={handleChange}
                                    placeholder="+971 XX XXX XXXX"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Emirates ID">
                                <Input
                                    name="emiratesId"
                                    value={formData.emiratesId || ''}
                                    onChange={handleChange}
                                    placeholder="784-XXXX-XXXXXXX-X"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Nationality">
                                <Input
                                    name="nationality"
                                    value={formData.nationality || ''}
                                    onChange={handleChange}
                                    placeholder="UAE"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Experience">
                                <Input
                                    name="experience"
                                    value={formData.experience || ''}
                                    onChange={handleChange}
                                    placeholder="5 Years"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Company">
                                <Input
                                    name="companyName"
                                    value={formData.companyName || ''}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Role">
                                <div className="h-10 flex items-center px-3 rounded-md border border-input bg-muted/30 text-sm">
                                    {formData.role || 'N/A'}
                                </div>
                            </Field>
                        </div>
                    </div>
                </Card>

                {/* Banking Details */}
                <Card className="p-6">
                    <div className="space-y-5">
                        <h2 className="text-base font-semibold text-foreground border-b border-border pb-3">
                            Banking Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <Field label="Account Holder">
                                <Input
                                    name="accountHolder"
                                    value={formData.accountHolder || ''}
                                    onChange={handleChange}
                                    placeholder="Full Name as per Bank"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Bank Name">
                                <Input
                                    name="bankName"
                                    value={formData.bankName || ''}
                                    onChange={handleChange}
                                    placeholder="Emirates NBD"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="Account Number">
                                <Input
                                    name="accountNumber"
                                    value={formData.accountNumber || ''}
                                    onChange={handleChange}
                                    placeholder="Bank Account Number"
                                    className="h-10"
                                />
                            </Field>

                            <Field label="IBAN">
                                <Input
                                    name="iban"
                                    value={formData.iban || ''}
                                    onChange={handleChange}
                                    placeholder="AEXX XXXX XXXX XXXX XXX"
                                    className="h-10"
                                />
                            </Field>
                        </div>
                    </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => setFormData(initialData)}
                        className="px-5 py-2 rounded-md border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-5 py-2 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-70 min-w-[100px] flex items-center justify-center"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Saving
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}