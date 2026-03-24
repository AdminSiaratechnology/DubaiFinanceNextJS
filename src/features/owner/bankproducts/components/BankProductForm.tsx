'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BankProduct, createBankProduct, updateBankProduct } from '../api/bankproducts.api';
import { Card } from '@/components/ui/Card';
import { FormActions } from '@/shared/FormActions';
import { Label, Input, Select } from '@/components/ui/Form';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';
import { getBanks } from '@/features/owner/bank/api/bank.api';
import { getLoanTypes } from '@/features/owner/loantypes/api/loanTypes.api';
import { getSLAs } from '@/features/owner/slatemplates/api/sla.api';
import { toast } from 'sonner';

interface BankProductFormProps {
    bankProduct?: BankProduct;
    title: string;
    bankProductId?: number;
}

export function BankProductForm({ bankProduct, title, bankProductId }: BankProductFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<any>(
        bankProduct ? {
            ...bankProduct,
            bank_id: bankProduct.bank?.id,
            bankName: bankProduct.bank?.name,
            loan_type_id: bankProduct.loan_type?.id,
            loanTypeName: bankProduct.loan_type?.name,
            sla_template_id: bankProduct.sla_template?.id,
            defaultSLATemplateName: bankProduct.sla_template?.template_name,
        } : {
            bank_id: undefined,
            bankName: '',
            product_name: '',
            loan_type_id: undefined,
            loanTypeName: '',
            customer_segment: 'Salaried',
            min_loan_amount: 0,
            max_loan_amount: 0,
            min_tenure: 12,
            max_tenure: 60,
            processing_fee: 0,
            status: 'active',
            priority_score: 50,
            sla_template_id: undefined,
            defaultSLATemplateName: '',
            internal_notes: '',
        }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            if (bankProductId) {
                await updateBankProduct(bankProductId, formData);
                toast.success('Bank Product updated successfully');
            } else {
                await createBankProduct(formData);
                toast.success('Bank Product created successfully');
            }
            router.push('/owner/bankproducts');
        } catch (error) {
            toast.error('Failed to save Bank Product');
        } finally {
            setIsSubmitting(false);
        }
    };
    const onCancel = () => {
        router.push('/owner/bankproducts');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-3xl font-medium text-foreground">{title}</h1>
                    <p className="text-[12px] sm:text-sm text-text-muted italic mt-1">Configure bank product details and lending criteria.</p>
                </div>
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-card border border-foreground hover:bg-muted rounded-xl text-xs font-bold text-foreground hover:text-foreground transition-all sm:w-auto w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Bank Products
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                </div>
                                <h4 className="text-[14px] uppercase font-bold tracking-widest text-foreground">Product Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    {/* <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Bank</Label> */}
                                    <ApiSearchableSelect
                                        label='Bank'
                                        fetchFn={getBanks as any}
                                        valueKey="id"
                                        labelKey="name"
                                        value={formData.bank_id ? Number(formData.bank_id) : undefined}
                                        onChange={(val) => setFormData((prev: any) => ({ ...prev, bank_id: Number(val) }))}
                                        initialOptions={formData.bank_id && formData.bankName ? [{ id: Number(formData.bank_id), name: formData.bankName } as any] : []}
                                        placeholder="Select a bank..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Product Name</Label>
                                    <Input
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        placeholder="e.g. Personal Loan - Gold"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    {/* <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Loan Type</Label> */}
                                    <ApiSearchableSelect
                                        label='Loan type'
                                        fetchFn={getLoanTypes as any}
                                        valueKey="id"
                                        labelKey="name"
                                        value={formData.loan_type_id ? Number(formData.loan_type_id) : undefined}
                                        onChange={(val) => setFormData((prev: any) => ({ ...prev, loan_type_id: Number(val) }))}
                                        initialOptions={formData.loan_type_id && formData.loanTypeName ? [{ id: Number(formData.loan_type_id), name: formData.loanTypeName } as any] : []}
                                        placeholder="Select a loan type..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Customer Segment</Label>
                                    <Select
                                        name="customer_segment"
                                        value={formData.customer_segment}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'Salaried', label: 'Salaried' },
                                            { value: 'Self-employed', label: 'Self-employed' },
                                            { value: 'SME', label: 'SME' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Loan Amount & Tenure */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                </div>
                                <h4 className="text-[14px] uppercase font-bold tracking-widest text-foreground">Loan Limits & Tenure</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Min Loan Amount (AED)</Label>
                                    <Input
                                        name="min_loan_amount"
                                        type="number"
                                        value={formData.min_loan_amount?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 10000"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Max Loan Amount (AED)</Label>
                                    <Input
                                        name="max_loan_amount"
                                        type="number"
                                        value={formData.max_loan_amount?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 500000"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Min Tenure (Months)</Label>
                                    <Input
                                        name="min_tenure"
                                        type="number"
                                        value={formData.min_tenure?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 12"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Max Tenure (Months)</Label>
                                    <Input
                                        name="max_tenure"
                                        type="number"
                                        value={formData.max_tenure?.toString() || ''}
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
                                <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                                <h4 className="text-[14px] uppercase font-bold tracking-widest text-foreground">Configuration & Settings</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Processing Fee</Label>
                                    <Input
                                        name="processing_fee"
                                        type="number"
                                        step="0.1"
                                        value={formData.processing_fee?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 1.5"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Priority Score (0-100)</Label>
                                    <Input
                                        name="priority_score"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.priority_score?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 85"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <ApiSearchableSelect
                                        label='Default SLA Template'
                                        fetchFn={getSLAs as any}
                                        valueKey="id"
                                        labelKey="template_name"
                                        value={formData.sla_template_id ? Number(formData.sla_template_id) : undefined}
                                        onChange={(val) => setFormData((prev: any) => ({ ...prev, sla_template_id: Number(val) }))}
                                        initialOptions={formData.sla_template_id && formData.defaultSLATemplateName ? [{ id: Number(formData.sla_template_id), template_name: formData.defaultSLATemplateName } as any] : []}
                                        placeholder="Select an SLA template..."
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
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Internal Notes</Label>
                                    <textarea
                                        name="internal_notes"
                                        value={formData.internal_notes}
                                        onChange={handleChange}
                                        placeholder="Add any internal notes about this product..."
                                        rows={4}
                                        className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-foreground/20 outline-none transition-all placeholder:text-text-muted/50 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <FormActions onCancel={onCancel} isSubmitting={isSubmitting} submitText="Save Product" />
            </form>
        </div>
    );
}