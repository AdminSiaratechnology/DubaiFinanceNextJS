'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';
import { getBanks } from '@/features/owner/bank/api/bank.api';
import { getBankProductByBankId } from '@/features/owner/bankproducts/api/bankproducts.api';
import {
    Commission,
    CommissionCreatePayload,
    createCommission,
    updateCommission,
} from '../api/commission.api';
import { toast } from 'sonner';

interface CommissionFormProps {
    commission?: Commission;
    commissionId?: number;
    title: string;
}

export function CommissionForm({ commission, commissionId, title }: CommissionFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<any>(
        commission
            ? {
                bank_id: commission.bank?.id,
                bankName: commission.bank?.name,
                product_id: commission.product?.id,
                productName: commission.product?.product_name,
                commission_type: commission.commission_type,
                commission_value: commission.commission_value,
                agent_share: commission.agent_share,
                telecaller_share: commission.telecaller_share,
                coordinator_share: commission.coordinator_share,
                effective_from_date: commission.effective_from_date,
                status: commission.status,
            }
            : {
                bank_id: undefined,
                bankName: '',
                product_id: undefined,
                productName: '',
                commission_type: 'percentage',
                commission_value: 0,
                agent_share: 0,
                telecaller_share: 0,
                coordinator_share: 0,
                effective_from_date: '',
                status: 'active',
            }
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericFields = [
            'commission_value',
            'agent_share',
            'telecaller_share',
            'coordinator_share',
        ];
        setFormData((prev: any) => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        const totalShare =
            Number(formData.agent_share) +
            Number(formData.telecaller_share) +
            Number(formData.coordinator_share);

        if (totalShare > 100) {
            toast.error('Total share (Agent + Telecaller + Coordinator) cannot exceed 100%');
            return;
        }

        const payload: CommissionCreatePayload = {
            commission_type: formData.commission_type,
            commission_value: Number(formData.commission_value),
            agent_share: Number(formData.agent_share),
            telecaller_share: Number(formData.telecaller_share),
            coordinator_share: Number(formData.coordinator_share),
            effective_from_date: formData.effective_from_date,
            status: formData.status,
            bank_id: Number(formData.bank_id),
            product_id: Number(formData.product_id),
        };

        setIsSubmitting(true);
        try {
            if (commissionId) {
                await updateCommission(commissionId, payload);
                toast.success('Commission rule updated successfully');
            } else {
                await createCommission(payload);
                toast.success('Commission rule created successfully');
            }
            router.push('/owner/commission');
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to save commission rule'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const onCancel = () => router.push('/owner/commission');

    // Fetch products filtered by selected bank
    const fetchProducts = async (params: any) => {
        if (!formData.bank_id) return { items: [], total: 0, page: 1, limit: 10 };
        return getBankProductByBankId(formData.bank_id);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-light text-foreground">{title}</h1>
                    <p className="text-[10px] sm:text-xs text-text-muted italic mt-1">
                        Configure bank-wise commission distribution and sharing rules for agents, telecallers, and coordinators.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-xs font-bold text-text-muted hover:text-foreground transition-all sm:w-auto w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Commission Rules
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        {/* Commission Rule Configuration */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-purple-soft text-purple">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Commission Rule Configuration</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                {/* Bank */}
                                <div className="space-y-2">
                                    {/* <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Bank</Label> */}
                                    <ApiSearchableSelect
                                        label='Bank'
                                        fetchFn={getBanks as any}
                                        valueKey="id"
                                        labelKey="name"
                                        value={formData.bank_id ? Number(formData.bank_id) : undefined}
                                        onChange={(val) =>
                                            setFormData((prev: any) => ({
                                                ...prev,
                                                bank_id: Number(val),
                                                product_id: undefined,
                                                productName: '',
                                            }))
                                        }
                                        initialOptions={
                                            formData.bank_id && formData.bankName
                                                ? [{ id: Number(formData.bank_id), name: formData.bankName } as any]
                                                : []
                                        }
                                        placeholder="Select a bank..."
                                        required
                                    />
                                </div>

                                {/* Product */}
                                <div className="space-y-2">
                                    {/* <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Product</Label> */}
                                    <ApiSearchableSelect
                                        label='Product'
                                        fetchFn={fetchProducts as any}
                                        valueKey="id"
                                        labelKey="product_name"
                                        value={formData.product_id ? Number(formData.product_id) : undefined}
                                        onChange={(val) =>
                                            setFormData((prev: any) => ({ ...prev, product_id: Number(val) }))
                                        }
                                        initialOptions={
                                            formData.product_id && formData.productName
                                                ? [{ id: Number(formData.product_id), product_name: formData.productName } as any]
                                                : []
                                        }
                                        placeholder={formData.bank_id ? 'Select a product...' : 'Select a bank first...'}
                                        required
                                    />
                                </div>

                                {/* Commission Type */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Commission Type</Label>
                                    <Select
                                        name="commission_type"
                                        value={formData.commission_type}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'flat', label: 'Flat Amount' },
                                            { value: 'percentage', label: 'Percentage (%)' },
                                        ]}
                                    />
                                </div>

                                {/* Commission Value */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Commission Value {formData.commission_type === 'flat' ? '(AED)' : '(%)'}
                                    </Label>
                                    <Input
                                        type="number"
                                        name="commission_value"
                                        value={formData.commission_value?.toString() || ''}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                        placeholder="e.g. 5"
                                        onFocus={(e) => (e.target.value = '')}
                                    />
                                </div>

                                {/* Effective From Date */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Effective From Date</Label>
                                    <Input
                                        type="date"
                                        name="effective_from_date"
                                        value={formData.effective_from_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Status */}
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

                        {/* Share Distribution */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-orange-soft text-orange">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Share Distribution</h4>
                                <span className="ml-auto text-[10px] text-text-muted font-semibold">
                                    Total: {Number(formData.agent_share) + Number(formData.telecaller_share) + Number(formData.coordinator_share)}%
                                    {(Number(formData.agent_share) + Number(formData.telecaller_share) + Number(formData.coordinator_share)) > 100
                                        ? <span className="text-red ml-1">⚠ Exceeds 100%</span>
                                        : null}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Agent Share (%)</Label>
                                    <Input
                                        type="number"
                                        name="agent_share"
                                        value={formData.agent_share?.toString() || ''}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        required
                                        placeholder="e.g. 3"
                                        onFocus={(e) => (e.target.value = '')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Telecaller Share (%)</Label>
                                    <Input
                                        type="number"
                                        name="telecaller_share"
                                        value={formData.telecaller_share?.toString() || ''}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        required
                                        placeholder="e.g. 1"
                                        onFocus={(e) => (e.target.value = '')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Coordinator Share (%)</Label>
                                    <Input
                                        type="number"
                                        name="coordinator_share"
                                        value={formData.coordinator_share?.toString() || ''}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        required
                                        placeholder="e.g. 1"
                                        onFocus={(e) => (e.target.value = '')}
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
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-3 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-lg active:scale-[0.98] order-1 sm:order-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting && (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        {isSubmitting ? 'Saving...' : 'Save Commission Rule'}
                    </button>
                </div>
            </form>
        </div>
    );
}
