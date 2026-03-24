'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBankCategory, BankCategory, updateBankCategory, CreateBankCategoryPayload } from '@/features/owner/bankCategory/api/bankCategory.api';
import { Card } from '@/components/ui/Card';
import { FormActions } from '@/shared/FormActions';
import { Label, Input, Select } from '@/components/ui/Form';
import { toast } from 'sonner';
interface BankCategoryFormProps {
    bankCategory?: BankCategory;
    bankCategoryId?: number;
    title: string;
}

export function BankCategoryForm({
    bankCategory,
    bankCategoryId,
    title,
}: BankCategoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<CreateBankCategoryPayload>({
        name: bankCategory?.name || '',
        description: bankCategory?.description || '',
        status: (bankCategory?.status as 'active' | 'inactive') || 'active',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSave = async (data: CreateBankCategoryPayload) => {
        const apiCall = bankCategoryId
            ? updateBankCategory(bankCategoryId, data)
            : createBankCategory(data);

        await toast.promise(apiCall, {
            success: bankCategoryId
                ? 'Bank category updated successfully'
                : 'Bank category created successfully',
            error: 'Failed to save bank category',
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onSave(formData);
            router.push('/owner/bankCategory');
        } catch (err: any) {
            setError(err?.message || 'Failed to save bank category');
        } finally {
            setLoading(false);
        }
    };
    const onCancel = () => {
        router.push('/owner/bankCategory');
    };
    return (
        <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-3xl font-medium text-foreground">
                        {title}
                    </h1>
                    <p className="text-[12px] sm:text-sm text-text-muted italic mt-1">
                        Configure Category details.
                    </p>
                </div>

                <button
                    onClick={onCancel}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-card border border-foreground hover:bg-muted rounded-xl text-xs font-bold text-foreground hover:text-foreground transition-all sm:w-auto w-full"
                >
                    Back to Bank Categories
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {error && (
                                <div className="text-red text-sm font-semibold bg-red/10 border border-red/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>
                                        Bank Category Name
                                    </Label>
                                    <Input
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. Personal Loan"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Status
                                    </Label>
                                    <Select
                                        name="status"
                                        value={formData.status || 'active'}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'active', label: 'Active' },
                                            { value: 'inactive', label: 'Inactive' },
                                        ]}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Description
                                    </Label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        placeholder="Describe this loan type, its purpose, and typical use cases..."
                                        rows={4}
                                        className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-foreground/20 outline-none transition-all placeholder:text-text-muted/50 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <FormActions onCancel={onCancel} isSubmitting={loading} submitText="Save Category" />
            </form>
        </div>
    );
}