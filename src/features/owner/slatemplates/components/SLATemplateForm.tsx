'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

export interface SLATemplate {
    id?: string;
    name: string;
    telecallerActionTime: number;
    coordinatorVerificationTime: number;
    submissionTimeLimit: number;
    escalationAfter: number;
    autoRevert: boolean;
    status: 'active' | 'inactive';
}

interface SLATemplateFormProps {
    slaTemplate?: SLATemplate;
    onSave: (data: SLATemplate) => void;
    title: string;
    onCancel: () => void;
}

export function SLATemplateForm({
    slaTemplate,
    onSave,
    title,
    onCancel,
}: SLATemplateFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<SLATemplate>(
        slaTemplate || {
            name: '',
            telecallerActionTime: 0,
            coordinatorVerificationTime: 0,
            submissionTimeLimit: 0,
            escalationAfter: 0,
            autoRevert: false,
            status: 'active',
        }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'autoRevert') {
            setFormData((prev) => ({
                ...prev,
                autoRevert: value === 'true',
            }));
            return;
        }

        // Convert numeric fields properly
        const numericFields = [
            'telecallerActionTime',
            'coordinatorVerificationTime',
            'submissionTimeLimit',
            'escalationAfter',
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                        Configure SLA timing rules for telecaller, coordinator verification,
                        submission limits, and escalation automation.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-xl text-xs font-bold text-text-muted hover:text-foreground transition-all sm:w-auto w-full"
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
                    <div className="space-y-8">
                        {/* SLA Template Details */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-blue-soft text-blue">
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
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">
                                    SLA Template Configuration
                                </h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                                {/* Template Name */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Template Name
                                    </Label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Default Credit Card SLA"
                                        required
                                    />
                                </div>

                                {/* Telecaller Action Time */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Telecaller Action Time (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="telecallerActionTime"
                                        value={formData.telecallerActionTime}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                    />
                                </div>

                                {/* Coordinator Verification Time */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Coordinator Verification Time (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="coordinatorVerificationTime"
                                        value={formData.coordinatorVerificationTime}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                    />
                                </div>

                                {/* Submission Time Limit */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Submission Time Limit (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="submissionTimeLimit"
                                        value={formData.submissionTimeLimit}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                    />
                                </div>

                                {/* Escalation After */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Escalation After (Hours)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="escalationAfter"
                                        value={formData.escalationAfter}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                    />
                                </div>

                                {/* Auto Revert */}
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                                        Auto Revert Enabled
                                    </Label>
                                    <Select
                                        name="autoRevert"
                                        value={String(formData.autoRevert)}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'true', label: 'Yes (Enabled)' },
                                            { value: 'false', label: 'No (Disabled)' },
                                        ]}
                                    />
                                </div>

                                {/* Status */}
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

                {/* Actions */}
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
                        Save SLA Template
                    </button>
                </div>
            </form>
        </div>
    );
}
