'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';
import { FileUploader } from '@/shared/FileUploader';
import { getBankCategories } from '../../bankCategory/api/bankCategory.api';
import { getLoanTypes } from '../../loantypes/api/loanTypes.api';
import { createBank, updateBank, Bank } from '../api/bank.api';
import { toast } from 'sonner';

interface BankFormProps {
    bank?: Bank;
    title: string;
    bankId?: number;
}

export function BankForm({ bank, title, bankId }: BankFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<Bank> & { category_id?: number; loan_type_ids?: number[] }>(() => {
        if (bank) {
            return {
                ...bank,
                category_id: bank.category?.id,
                loan_type_ids: bank.loan_types?.map(lt => lt.id) || [],
            };
        }
        return {
            name: '',
            short_code: '',
            category_id: undefined,
            loan_type_ids: [],
            default_tat_days: 5,
            status: 'active',
            description: '',
        };
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (id: string, file: File | null) => {
        setLogoFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const form = new FormData();

            // 🔥 Map frontend → backend field names
            form.append("name", formData.name || "");
            form.append("short_code", formData.short_code || "");
            form.append("description", formData.description || "");
            form.append("status", formData.status || "active");
            form.append("default_tat_days", String(formData.default_tat_days || 0));

            // category from select (should be ID)
            if (formData.category_id) {
                form.append("category_id", String(formData.category_id));
            }

            // multiple loan types (matches your curl: loan_type_ids)
            if (formData.loan_type_ids?.length) {
                formData.loan_type_ids.forEach((id) => {
                    form.append("loan_type_ids", String(id));
                });
            }

            // 🔥 FILE (this is what your backend expects)
            if (logoFile) {
                form.append("image", logoFile);
            }

            const apiCall = bankId
                ? updateBank(bankId, form as any)
                : createBank(form as any);

            await toast.promise(apiCall, {
                success: bankId
                    ? 'Bank updated successfully'
                    : 'Bank created successfully',
                error: 'Failed to save bank',
            });

            router.push('/owner/bank');
        } catch (err: any) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };
    const onCancel = () => {
        router.push('/owner/bank');
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
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-blue-soft text-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Bank Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Bank Name</Label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Emirates NBD"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Short Code</Label>
                                    <Input
                                        name="short_code"
                                        value={formData.short_code}
                                        onChange={handleChange}
                                        placeholder="e.g. ENBD"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <ApiSearchableSelect
                                        label="Bank Category"
                                        fetchFn={getBankCategories}
                                        labelKey="name"
                                        valueKey="id"
                                        extraParams={{ status: 'active' }}
                                        value={formData.category_id}
                                        initialOptions={bank?.category ? [bank.category] : []}
                                        onChange={(val) => setFormData(prev => ({ ...prev, category_id: Number(val) }))}
                                        placeholder="Select bank category…"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Default TAT (Days)</Label>
                                    <Input
                                        name="default_tat_days"
                                        type="number"
                                        value={formData.default_tat_days?.toString() || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. 5"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <FileUploader
                                        id="logoFile"
                                        label="Bank Logo (Optional)"
                                        file={logoFile}
                                        onChange={handleFileUpload}
                                        placeholder="Choose a square PNG/JPG..."
                                        previewUrl={bank?.logo_url}
                                        maxSize={1024 * 1024 * 2}
                                        allowedTypes={['image/jpeg', 'image/png']}

                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                            <ApiSearchableSelect
                                label="Supported Loan Types"
                                fetchFn={getLoanTypes}
                                labelKey="name"
                                valueKey="id"
                                extraParams={{ status: 'active' }}
                                multiple
                                value={formData.loan_type_ids}
                                initialOptions={bank?.loan_types || []}
                                onChange={(vals) => setFormData(prev => ({ ...prev, loan_type_ids: (vals as any[]).map(Number) }))}
                                placeholder="Search loan types…"
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
                            <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">Description</Label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Add any description about this bank..."
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
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto px-10 py-3 bg-brand text-white rounded-xl font-bold text-sm transition-all shadow-lg order-1 sm:order-2 flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand/90 active:scale-[0.98]'}`}
                    >
                        {isSubmitting && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isSubmitting ? 'Saving...' : 'Save Bank'}
                    </button>
                </div>
            </form>
        </div>
    );
}
