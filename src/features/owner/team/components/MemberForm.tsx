'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { Coordinator, CoordinatorCreate, createCoordinator, updateCoordinator } from '../api/analyst.api';
import { toast } from 'sonner';
import CountrySearchableSelect from '@/shared/CountrySearchableSelect';

interface MemberFormProps {
    member?: Coordinator;
    title: string;
    role: 'analyst' | 'telecaller';
    memberId?: number;
}

export function MemberForm({ member, title, role, memberId }: MemberFormProps) {
    const router = useRouter();

    const handleCancel = () => {
        router.push(`/owner/team/${role}s`);
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<CoordinatorCreate>({
        name: member?.name || '',
        email: member?.email || '',
        phone: member?.phone || '',
        emirates_id: member?.emirates_id || '',
        nationality: member?.nationality || '',
        experience: Number(member?.experience) || 0,
        account_holder_name: member?.account_holder_name || '',
        bank_name: member?.bank_name || '',
        account_number: member?.account_number || '',
        iban: member?.iban || '',
        status: member?.status || 'active',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'experience' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (memberId) {
                // Update
                const { password, ...payload } = formData;
                // Only send password if it's not empty
                const updatePayload = password ? formData : payload;
                await updateCoordinator(memberId, updatePayload);
                toast.success('Member updated successfully');
            } else {
                // Create
                if (!formData.password) {
                    toast.error('Password is required for new members');
                    setIsSubmitting(false);
                    return;
                }
                await createCoordinator(formData);
                toast.success('Member created successfully');
            }
            router.push(`/owner/team/${role}s`);
            router.refresh();
        } catch (error: any) {
            console.error('Save failed:', error);
            toast.error(error?.response?.data?.detail || 'Failed to save member');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-light text-foreground">{title}</h1>
                    <p className="text-[10px] sm:text-xs text-text-muted italic mt-1">Fill in the details below to manage your team member.</p>
                </div>
                <button
                    onClick={handleCancel}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-xs font-bold text-text-muted hover:text-foreground transition-all sm:w-auto w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to List
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-brand/10 text-brand">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Personal Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Full Name</Label>
                                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Email Address</Label>
                                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Phone Number</Label>
                                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="6394497861" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Emirates ID</Label>
                                    <Input name="emirates_id" value={formData.emirates_id} onChange={handleChange} placeholder="784-XXXX-XXXXXXX-X" required />
                                </div>
                                <CountrySearchableSelect
                                    label="Nationality"
                                    value={formData.nationality}
                                    onChange={(value) => setFormData({ ...formData, nationality: value })}
                                    placeholder="Select Nationality"
                                    required
                                />
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Experience (Years)</Label>
                                    <Input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="e.g. 5" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required={!memberId}>Password</Label>
                                    <Input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder={memberId ? "Leave blank to keep current" : "Enter password"}
                                        required={!memberId}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Status</Label>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'active', label: 'Active' },
                                            { value: 'inactive', label: 'Inactive' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Banking Details */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-green-soft text-green">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Banking Details</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Account Holder Name</Label>
                                    <Input name="account_holder_name" value={formData.account_holder_name} onChange={handleChange} placeholder="Full Name as per Bank" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Bank Name</Label>
                                    <Input name="bank_name" value={formData.bank_name} onChange={handleChange} placeholder="e.g. Emirates NBD" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Account Number</Label>
                                    <Input name="account_number" value={formData.account_number} onChange={handleChange} placeholder="Bank Account Number" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">IBAN</Label>
                                    <Input name="iban" value={formData.iban} onChange={handleChange} placeholder="AE-- ---- ---- ---- ---- ---" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl border border-border font-bold text-sm text-text-muted hover:bg-muted transition-all order-2 sm:order-1"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-3 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-lg active:scale-[0.98] order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Team Member'}
                    </button>
                </div>
            </form>
        </div>
    );
}
