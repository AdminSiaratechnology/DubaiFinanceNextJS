'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { SLA, createSLA, updateSLA } from '../api/sla.api';
import { toast } from 'sonner';

interface SLATemplateFormProps {
    slaTemplate?: SLA;
    title: string;
    slaId?: number;
}

export function SLATemplateForm({
    slaTemplate,
    title,
    slaId,
}: SLATemplateFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<SLA>(
        slaTemplate || {
            template_name: '',
            telecaller_action_time: 0,
            coordinator_verification_time: 0,
            submission_time_limit: 0,
            escalation_after: 0,
            auto_revert_enabled: false,
            status: 'active',
        }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'auto_revert_enabled') {
            setFormData((prev) => ({
                ...prev,
                auto_revert_enabled: value === 'true',
            }));
            return;
        }

        const numericFields = [
            'telecaller_action_time',
            'coordinator_verification_time',
            'submission_time_limit',
            'escalation_after',
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
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            if (slaId) {
                await updateSLA(slaId, formData);
                toast.success('SLA template updated successfully');
            } else {
                await createSLA(formData);
                toast.success('SLA template created successfully');
            }
            router.push('/owner/sla');
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to save SLA template'
            );
        } finally {
            setIsSubmitting(false);
        }
    };
    const onCancel = () => {
        router.push('/owner/sla');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-3xl font-medium text-foreground">
                        {title}
                    </h1>
                    <p className="text-[12px] sm:text-sm text-text-muted italic mt-1">
                        Configure SLA timing rules for telecaller, coordinator verification,
                        submission limits, and escalation automation.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-foreground hover:bg-muted rounded-xl text-xs font-bold text-foreground hover:text-foreground transition-all sm:w-auto w-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to SLA Templates
                </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 8v4l3 3" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </div>
                                <h4 className="text-[14px] uppercase font-bold tracking-widest text-foreground">
                                    SLA Template Configuration
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Template Name
                                    </Label>
                                    <Input
                                        name="template_name"
                                        value={formData.template_name}
                                        onChange={handleChange}
                                        placeholder="e.g. Default Credit Card SLA"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Telecaller Action Time (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="telecaller_action_time"
                                        value={formData.telecaller_action_time}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                        onFocus={(e) => e.target.value = ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Coordinator Verification Time (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="coordinator_verification_time"
                                        value={formData.coordinator_verification_time}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                        onFocus={(e) => e.target.value = ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Submission Time Limit (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="submission_time_limit"
                                        value={formData.submission_time_limit}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                        onFocus={(e) => e.target.value = ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Escalation After (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="escalation_after"
                                        value={formData.escalation_after}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                        onFocus={(e) => e.target.value = ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Auto Revert Enabled
                                    </Label>
                                    <Select
                                        name="auto_revert_enabled"
                                        value={String(formData.auto_revert_enabled)}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'true', label: 'Yes (Enabled)' },
                                            { value: 'false', label: 'No (Disabled)' },
                                        ]}
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

                        className="w-full sm:w-auto px-8 py-3 rounded-xl border border-foreground font-bold text-sm text-foreground bg-white hover:bg-muted transition-all order-2 sm:order-1"
                    >
                        Discard Changes
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-lg active:scale-[0.98] order-1 sm:order-2 flex items-center justify-center gap-2"
                    >
                        {isSubmitting && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isSubmitting ? 'Saving...' : 'Save Template'}
                    </button>
                </div>
            </form>
        </div>
    );
}
