'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { mockBanks } from '@/lib/mock/banks';
import { mockBankProducts } from '@/lib/mock/bankProducts';

export interface CommissionForm {
    id?: string;
    bankId: string;
    productId: string;
    commissionType: 'flat' | 'percentage';
    commissionValue: number;
    agentShare: number;
    telecallerShare: number;
    coordinatorShare: number;
    effectiveFrom: string;
    status: 'active' | 'inactive';
    bankName?: string | undefined;
    productName?: string | undefined;
}

interface CommissionFormProps {
    commissionForm?: CommissionForm;
    onSave: (data: CommissionForm) => void;
    title: string;
    onCancel: () => void;
}

export function CommissionForm({
    commissionForm,
    onSave,
    title,
    onCancel,
}: CommissionFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<CommissionForm>(
        commissionForm || {
            bankId: '',
            productId: '',
            commissionType: 'percentage',
            commissionValue: 0,
            agentShare: 0,
            telecallerShare: 0,
            coordinatorShare: 0,
            effectiveFrom: '',
            status: 'active',
        }
    );

    // Filter products based on selected bank (enterprise UX)
    const filteredProducts = useMemo(() => {
        if (!formData.bankId) return [];
        return mockBankProducts.filter(
            (p) => p.bankId === formData.bankId
        );
    }, [formData.bankId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const numericFields = [
            'commissionValue',
            'agentShare',
            'telecallerShare',
            'coordinatorShare',
        ];

        if (numericFields.includes(name)) {
            setFormData((prev) => ({
                ...prev,
                [name]: Number(value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                // Reset product if bank changes
                ...(name === 'bankId' ? { productId: '' } : {}),
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Optional validation: total share should not exceed 100
        const totalShare =
            formData.agentShare +
            formData.telecallerShare +
            formData.coordinatorShare;

        if (totalShare > 100) {
            alert('Total share percentage cannot exceed 100%');
            return;
        }

        onSave(formData);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-light text-foreground">
                        {title}
                    </h1>
                    <p className="text-[10px] sm:text-xs text-text-muted italic mt-1">
                        Configure bank-wise commission distribution and sharing rules
                        for agents, telecallers, and coordinators.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-xs font-bold text-text-muted hover:text-foreground transition-all sm:w-auto w-full"
                >
                    Back to Commission Rules
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-purple-soft text-purple">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">
                                    Commission Rule Configuration
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Bank
                                    </Label>
                                    <Select
                                        name="bankId"
                                        value={formData.bankId}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select Bank' },
                                            ...mockBanks.map((b) => ({
                                                value: b.id,
                                                label: b.bankName,
                                            })),
                                        ]}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Product
                                    </Label>
                                    <Select
                                        name="productId"
                                        value={formData.productId}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select Product' },
                                            ...filteredProducts.map((p) => ({
                                                value: p.id,
                                                label: p.productName,
                                            })),
                                        ]}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Commission Type
                                    </Label>
                                    <Select
                                        name="commissionType"
                                        value={formData.commissionType}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'flat', label: 'Flat Amount' },
                                            { value: 'percentage', label: 'Percentage (%)' },
                                        ]}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Commission Value
                                    </Label>
                                    <Input
                                        type="number"
                                        name="commissionValue"
                                        value={formData.commissionValue}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                        onFocus={(e) => e.target.value = ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Agent Share (%)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="agentShare"
                                        value={formData.agentShare}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        required
                                        onFocus={(e) => e.target.value = ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Telecaller Share (%)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="telecallerShare"
                                        value={formData.telecallerShare}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        required
                                        onFocus={(e) => e.target.value = ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Coordinator Share (%)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="coordinatorShare"
                                        value={formData.coordinatorShare}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        onFocus={(e) => e.target.value = ''}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Effective From Date
                                    </Label>
                                    <Input
                                        type="date"
                                        name="effectiveFrom"
                                        value={formData.effectiveFrom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Status
                                    </Label>
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
                    </div>
                </Card>

                <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full sm:w-auto px-8 py-3 rounded-xl border border-border font-bold text-sm text-text-muted hover:bg-muted transition-all"
                    >
                        Discard Changes
                    </button>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-10 py-3 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-lg active:scale-[0.98]"
                    >
                        Save Commission Rule
                    </button>
                </div>
            </form>
        </div>
    );
}
