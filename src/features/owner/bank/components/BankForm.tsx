'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bank } from '@/lib/mock/banks';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { MultiSelectDropdown } from '@/shared/MultiSelectDropdown';

interface BankFormProps {
    bank?: Bank;
    onSave: (data: Partial<Bank>) => void;
    title: string;
    onCancel: () => void;
}

const loanTypes = [
    { id: 'personal', label: 'Personal Loan' },
    { id: 'business', label: 'Business Loan' },
    { id: 'auto', label: 'Auto Loan' },
    { id: 'mortgage', label: 'Mortgage' },
    { id: 'credit-card', label: 'Credit Card' },
    { id: 'sme', label: 'SME Loan' },
];

export function BankForm({ bank, onSave, title, onCancel }: BankFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<Bank>>(
        bank || {
            bankName: '',
            shortCode: '',
            logoUrl: undefined,
            category: 'retail',
            supportedLoanTypes: [],
            defaultTAT: 5,
            status: 'active',
            internalNotes: '',
        }
    );

    const [logoFile, setLogoFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setLogoFile(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-light text-foreground">{title}</h1>
                    <p className="text-[10px] sm:text-xs text-text-muted italic mt-1">Configure bank details and supported loan products.</p>
                </div>
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-xs font-bold text-text-muted hover:text-foreground transition-all sm:w-auto w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Banks
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-blue-soft text-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Bank Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Bank Name</Label>
                                    <Input
                                        name="bankName"
                                        value={formData.bankName}
                                        onChange={handleChange}
                                        placeholder="e.g. Emirates NBD"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Short Code</Label>
                                    <Input
                                        name="shortCode"
                                        value={formData.shortCode}
                                        onChange={handleChange}
                                        placeholder="e.g. ENBD"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Bank Category</Label>
                                    <Select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'retail', label: 'Retail Banking' },
                                            { value: 'sme', label: 'SME Banking' },
                                            { value: 'mortgage', label: 'Mortgage Specialist' },
                                        ]}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Default TAT (Days)</Label>
                                    <Input
                                        name="defaultTAT"
                                        type="number"
                                        value={formData.defaultTAT?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 5"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Bank Logo (Optional)</Label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 file:cursor-pointer"
                                        />
                                    </div>
                                    {logoFile && (
                                        <p className="text-xs text-text-muted mt-2 pl-1">Selected: {logoFile.name}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Supported Loan Types */}
                        <div className="space-y-2 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                            <MultiSelectDropdown
                                label="Supported Loan Types"
                                options={loanTypes}
                                selectedValues={formData.supportedLoanTypes || []}
                                onChange={(values) => setFormData(prev => ({ ...prev, supportedLoanTypes: values }))}
                                placeholder="Select loan types..."
                            />
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
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Internal Notes</Label>
                            <textarea
                                name="internalNotes"
                                value={formData.internalNotes}
                                onChange={handleChange}
                                placeholder="Add any internal notes about this bank..."
                                rows={4}
                                className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-text-muted/50 resize-none"
                            />
                        </div>

                    </div>
                </Card>

                <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl border border-border font-bold text-sm text-text-muted hover:bg-muted transition-all order-2 sm:order-1"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-10 py-3 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-lg active:scale-[0.98] order-1 sm:order-2"
                    >
                        Save Bank
                    </button>
                </div>
            </form>
        </div>
    );
}
