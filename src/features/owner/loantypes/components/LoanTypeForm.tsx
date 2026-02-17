'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoanType } from '@/lib/mock/loanTypes';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

interface LoanTypeFormProps {
    loanType?: LoanType;
    onSave: (data: Partial<LoanType>) => void;
    title: string;
    onCancel: () => void;
}

export function LoanTypeForm({ loanType, onSave, title, onCancel }: LoanTypeFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<LoanType>>(
        loanType || {
            name: '',
            description: '',
            status: 'active',
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                    <p className="text-[10px] sm:text-xs text-text-muted italic mt-1">Configure loan type details and availability.</p>
                </div>
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-xs font-bold text-text-muted hover:text-foreground transition-all sm:w-auto w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Loan Types
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        {/* Loan Type Information */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-purple-soft text-purple">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 6h13" />
                                        <path d="M8 12h13" />
                                        <path d="M8 18h13" />
                                        <path d="M3 6h.01" />
                                        <path d="M3 12h.01" />
                                        <path d="M3 18h.01" />
                                    </svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Loan Type Details</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Loan Type Name</Label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Personal Loan"
                                        required
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
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Description</Label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe this loan type, its purpose, and typical use cases..."
                                        rows={4}
                                        required
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
                        Save Loan Type
                    </button>
                </div>
            </form>
        </div>
    );
}
