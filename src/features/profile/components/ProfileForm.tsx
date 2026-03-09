'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TeamMember } from '@/lib/mock/team';
import { Card } from '@/components/ui/Card';
import { Label, Input } from '@/components/ui/Form';
import CountrySearchableSelect from '@/shared/CountrySearchableSelect';
import { toast } from 'sonner';
import { updateAgent } from '@/features/owner/team/api/agent.api';
import { updateCoordinator } from '@/features/owner/team/api/analyst.api';
import { updateTelecaller } from '@/features/owner/team/api/telecaller.api';
interface ProfileFormProps {
    initialData?: TeamMember;
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

export function ProfileForm({ initialData }: ProfileFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<any>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);
    const isAdmin = formData?.role === 'admin';
    const isTelecaller = formData?.role === 'telecaller';
    const isCoordinator = formData?.role === 'coordinator' || formData?.role === 'analyst';

    const profileKey = isAdmin
        ? 'admin_profile'
        : isTelecaller
            ? 'telecaller_profile'
            : (isCoordinator)
                ? 'coordinator_profile'
                : 'agent_profile';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (profileKey && (
            name === 'name' ||
            name === 'phone' ||
            name === 'address' ||
            name === 'emirates_id' ||
            name === 'nationality' ||
            name === 'experience' ||
            name === 'bank_name' ||
            name === 'iban' ||
            name === 'account_number' ||
            name === 'account_holder_name' ||
            name === 'business_name'
        )) {
            setFormData((prev: any) => ({
                ...prev,
                [profileKey]: {
                    ...prev[profileKey],
                    [name]: name === 'experience' ? Number(value) : value
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
            const commonData = {
                email: formData.email,
                status: formData.status || 'active'
            };

            if (isAdmin) {
                // await updateAdmin(formData.admin_profile);
            } else if (isTelecaller) {
                const payload = { ...formData.telecaller_profile, ...commonData };
                await updateTelecaller(formData.telecaller_profile.user_id, payload);
            } else if (isCoordinator) {
                const payload = { ...formData.coordinator_profile, ...commonData };
                await updateCoordinator(formData.coordinator_profile.user_id, payload);
            } else {
                console.log(formData.agent_profile)
                await updateAgent(formData.agent_profile.id, formData.agent_profile);
            }
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
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
                        Last updated: {formData?.updated_at ? new Date(formData.updated_at).toLocaleDateString() : 'N/A'}
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
                                                name="name"
                                                value={formData[profileKey || '']?.name || ''}
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
                                                name="phone"
                                                value={formData[profileKey || '']?.phone || ''}
                                                onChange={handleChange}
                                                placeholder="+971 XX XXX XXXX"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <Field label="Emirates ID">
                                            <Input
                                                name="emirates_id"
                                                value={formData[profileKey || '']?.emirates_id || ''}
                                                onChange={handleChange}
                                                placeholder="784-XXXX-XXXXXXX-X"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        <CountrySearchableSelect
                                            label="Nationality"
                                            value={formData[profileKey || '']?.nationality || null}
                                            onChange={(value) => setFormData((prev: any) => ({
                                                ...prev,
                                                [profileKey || '']: { ...prev[profileKey || ''], nationality: value }
                                            }))}
                                            placeholder="Select your nationality"
                                            className="w-full"
                                        />

                                        <Field label="Experience (Years)">
                                            <Input
                                                name="experience"
                                                type="number"
                                                value={formData[profileKey || '']?.experience || ''}
                                                onChange={handleChange}
                                                placeholder="e.g. 5"
                                                className="h-12 text-base bg-muted/20 border-border"
                                            />
                                        </Field>

                                        {profileKey === 'agent_profile' && (
                                            <Field label="Business Name">
                                                <Input
                                                    name="business_name"
                                                    value={formData[profileKey || '']?.business_name || ''}
                                                    onChange={handleChange}
                                                    placeholder="Enter business name"
                                                    className="h-12 text-base bg-muted/20 border-border"
                                                />
                                            </Field>
                                        )}
                                        {/* <Field label="Role">
                                            <div className="h-12 flex items-center px-4 rounded-xl border border-border bg-muted/40 text-text-secondary text-base font-semibold">
                                                {formData.role?.charAt(0).toUpperCase() + formData.role?.slice(1) || 'N/A'}
                                            </div>
                                        </Field> */}

                                        <Field label="Member Since">
                                            <div className="h-12 flex items-center px-4 rounded-xl border border-border bg-muted/40 text-text-muted text-sm font-medium">
                                                {formData.created_at ? new Date(formData.created_at).toLocaleDateString() : 'N/A'}
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
                                            name="account_holder_name"
                                            value={formData[profileKey || '']?.account_holder_name || ''}
                                            onChange={handleChange}
                                            placeholder="Full name as per bank records"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>

                                    <Field label="Bank Name">
                                        <Input
                                            name="bank_name"
                                            value={formData[profileKey || '']?.bank_name || ''}
                                            onChange={handleChange}
                                            placeholder="e.g., Emirates NBD"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>

                                    <Field label="Account Number">
                                        <Input
                                            name="account_number"
                                            value={formData[profileKey || '']?.account_number || ''}
                                            onChange={handleChange}
                                            placeholder="Bank account number"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>

                                    <Field label="IBAN">
                                        <Input
                                            name="iban"
                                            value={formData[profileKey || '']?.iban || ''}
                                            onChange={handleChange}
                                            placeholder="AEXX XXXX XXXX XXXX XXX"
                                            className="h-12 text-base bg-muted/20 border-border"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </Card>
                    )}

                    {profileKey === "agent_profile" && (
                        <Card className="p-8 bg-card border border-border shadow-soft hover:shadow-card transition-all duration-300">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 pb-5 border-b border-border/60">
                                    <div className="w-12 h-12 rounded-xl bg-teal/10 dark:bg-teal/20 flex items-center justify-center text-teal shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="19" x2="5" y1="5" y2="19" />
                                            <circle cx="6.5" cy="6.5" r="2.5" />
                                            <circle cx="17.5" cy="17.5" r="2.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-text-primary tracking-tight">
                                            Commissions
                                        </h2>
                                        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Product Rates & Agent Shares</p>
                                    </div>
                                </div>

                                {formData?.agent_profile?.commissions?.length ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {formData.agent_profile.commissions.map((commission: any) => (
                                            <div
                                                key={commission.id}
                                                className="stat-card stat-hover border-teal/10 relative overflow-hidden group/item"
                                            >
                                                <div className="absolute top-0 right-0 p-3">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${commission.status === "active" ? "bg-green-soft text-green" : "bg-red-soft text-red"}`}>
                                                        {commission.status}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-1 mb-4">
                                                    <p className="font-bold text-text-primary group-hover/item:text-teal transition-colors">
                                                        {commission.product?.product_name || 'N/A'}
                                                    </p>
                                                    <p className="text-xs text-text-muted flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-teal/40" />
                                                        {commission.bank?.name || 'N/A'}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                                                    <div className="bg-muted/30 p-2 rounded-lg">
                                                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight mb-0.5 whitespace-nowrap">Base Rate</p>
                                                        <p className="text-sm font-black text-text-primary">
                                                            {commission.commission_value}
                                                            {commission.commission_type === "percentage" ? "%" : ""}
                                                        </p>
                                                    </div>

                                                    <div className="bg-muted/30 p-2 rounded-lg border-l-2 border-brand/30">
                                                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight mb-0.5 whitespace-nowrap">Agent Share</p>
                                                        <p className="text-sm font-black text-brand">
                                                            {commission.agent_share}%
                                                        </p>
                                                    </div>

                                                    <div className="bg-muted/30 p-2 rounded-lg">
                                                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight mb-0.5 whitespace-nowrap">Coordinator</p>
                                                        <p className="text-sm font-bold text-text-secondary">
                                                            {commission.coordinator_share}%
                                                        </p>
                                                    </div>

                                                    <div className="bg-muted/30 p-2 rounded-lg">
                                                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-tight mb-0.5 whitespace-nowrap">Telecaller</p>
                                                        <p className="text-sm font-bold text-text-secondary">
                                                            {commission.telecaller_share}%
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-2xl border border-dashed border-border/60">
                                        <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted opacity-50">
                                                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <path d="M3 15h6" />
                                                <path d="M3 18h6" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-text-muted italic">No commissions available</p>
                                    </div>
                                )}
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