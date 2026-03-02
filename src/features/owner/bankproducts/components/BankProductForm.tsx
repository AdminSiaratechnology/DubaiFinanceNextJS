'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BankProduct } from '@/lib/mock/bankProducts';
import { mockBanks } from '@/lib/mock/banks';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

interface BankProductFormProps {
    bankProduct?: BankProduct;
    onSave: (data: Partial<BankProduct>) => void;
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

const slaTemplates = [
    { value: 'Standard - 3 Days', label: 'Standard - 3 Days' },
    { value: 'Standard - 5 Days', label: 'Standard - 5 Days' },
    { value: 'Extended - 7 Days', label: 'Extended - 7 Days' },
    { value: 'Extended - 10 Days', label: 'Extended - 10 Days' },
    { value: 'Express - 24 Hours', label: 'Express - 24 Hours' },
];

export function BankProductForm({ bankProduct, onSave, title, onCancel }: BankProductFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<BankProduct>>(
        bankProduct || {
            bankId: '',
            bankName: '',
            productName: '',
            loanTypeId: 'personal',
            loanTypeName: 'Personal Loan',
            customerSegment: 'salaried',
            minLoanAmount: 0,
            maxLoanAmount: 0,
            minTenure: 12,
            maxTenure: 60,
            processingFeePercent: 0,
            status: 'active',
            priorityScore: 50,
            defaultSLATemplate: 'Standard - 5 Days',
            internalNotes: '',
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle bank selection
        if (name === 'bankId') {
            const selectedBank = mockBanks.find(b => b.id === value);
            setFormData(prev => ({
                ...prev,
                bankId: value,
                bankName: selectedBank?.bankName || ''
            }));
            return;
        }

        // Handle loan type selection
        if (name === 'loanTypeId') {
            const selectedLoanType = loanTypes.find(lt => lt.id === value);
            setFormData(prev => ({
                ...prev,
                loanTypeId: value,
                loanTypeName: selectedLoanType?.label || ''
            }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-light text-foreground">{title}</h1>
                    <p className="text-[10px] sm:text-xs text-text-muted italic mt-1">Configure bank product details and lending criteria.</p>
                </div>
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-xs font-bold text-text-muted hover:text-foreground transition-all sm:w-auto w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Bank Products
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-teal-soft text-teal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Product Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Bank</Label>
                                    <Select
                                        name="bankId"
                                        value={formData.bankId}
                                        onChange={handleChange}
                                        options={mockBanks.map(bank => ({ value: bank.id, label: bank.bankName }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Product Name</Label>
                                    <Input
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        placeholder="e.g. Personal Loan - Gold"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Loan Type</Label>
                                    <Select
                                        name="loanTypeId"
                                        value={formData.loanTypeId}
                                        onChange={handleChange}
                                        options={loanTypes.map(type => ({ value: type.id, label: type.label }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Customer Segment</Label>
                                    <Select
                                        name="customerSegment"
                                        value={formData.customerSegment}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'salaried', label: 'Salaried' },
                                            { value: 'self-employed', label: 'Self-employed' },
                                            { value: 'sme', label: 'SME' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Loan Amount & Tenure */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-green-soft text-green">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Loan Limits & Tenure</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Min Loan Amount (AED)</Label>
                                    <Input
                                        name="minLoanAmount"
                                        type="number"
                                        value={formData.minLoanAmount?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 10000"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Max Loan Amount (AED)</Label>
                                    <Input
                                        name="maxLoanAmount"
                                        type="number"
                                        value={formData.maxLoanAmount?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 500000"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Min Tenure (Months)</Label>
                                    <Input
                                        name="minTenure"
                                        type="number"
                                        value={formData.minTenure?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 12"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Max Tenure (Months)</Label>
                                    <Input
                                        name="maxTenure"
                                        type="number"
                                        value={formData.maxTenure?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 60"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Configuration & Settings */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-orange-soft text-orange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Configuration & Settings</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Processing Fee (%)</Label>
                                    <Input
                                        name="processingFeePercent"
                                        type="number"
                                        step="0.1"
                                        value={formData.processingFeePercent?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 1.5"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Priority Score (0-100)</Label>
                                    <Input
                                        name="priorityScore"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.priorityScore?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 85"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Default SLA Template</Label>
                                    <Select
                                        name="defaultSLATemplate"
                                        value={formData.defaultSLATemplate}
                                        onChange={handleChange}
                                        options={slaTemplates}
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
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Internal Notes</Label>
                                    <textarea
                                        name="internalNotes"
                                        value={formData.internalNotes}
                                        onChange={handleChange}
                                        placeholder="Add any internal notes about this product..."
                                        rows={4}
                                        className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-text-muted/50 resize-none"
                                    />
                                </div>
                            </div>
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
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}