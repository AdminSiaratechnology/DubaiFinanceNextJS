'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

interface CaseDetailsAnalystProps {
    caseData: any;
    onClose: () => void;
}

export function CaseDetailsAnalyst({ caseData, onClose }: CaseDetailsAnalystProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...caseData });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // API call...
    };

    return (
        <Card noPadding className="h-full flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-brand/10 p-4 border-b border-border flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="10" cy="14" r="2" /><path d="m14 18-2.5-2.5" /></svg>
                    <h3 className="font-bold text-lg text-foreground">Review Case</h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-red-soft hover:text-red-500 rounded-lg transition-colors text-text-muted"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Status Banner */}
                <div className="p-4 rounded-xl bg-muted border border-border flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Current Status</p>
                        <p className="text-sm font-bold text-foreground">{caseData.status}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-red-soft text-red text-xs font-bold rounded-lg border border-red/10 hover:bg-red/10 transition-colors">
                            Reject
                        </button>
                        <button className="px-4 py-2 bg-green-soft text-green text-xs font-bold rounded-lg border border-green/10 hover:bg-green/10 transition-colors">
                            Accept Case
                        </button>
                    </div>
                </div>

                {/* Customer Info */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-foreground">Customer Info</h4>
                        {isEditing ? (
                            <button onClick={handleSave} className="text-xs font-bold text-brand hover:underline">Save</button>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-text-muted hover:text-foreground hover:underline">Edit Info</button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {[
                            { label: 'Name', key: 'name' },
                            { label: 'Mobile', key: 'mobile' },
                            { label: 'Email', key: 'email' },
                            { label: 'Emirates ID', key: 'emiratesId' },
                            { label: 'Employer', key: 'employer' },
                            { label: 'Salary', key: 'salary' },
                        ].map(field => (
                            <div key={field.key}>
                                <Label className="text-[10px] uppercase opacity-70 mb-1">{field.label}</Label>
                                {isEditing ? (
                                    <Input name={field.key} value={formData[field.key]} onChange={handleInputChange} />
                                ) : (
                                    <p className="text-sm font-semibold">{formData[field.key]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Loan Specs */}
                <section className="space-y-4">
                    <h4 className="text-base font-bold text-foreground">Loan Specifications</h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <Label className="text-[10px] uppercase opacity-70 mb-1">Product</Label>
                            <p className="text-sm font-semibold text-brand">{caseData.product}</p>
                        </div>
                        <div>
                            <Label className="text-[10px] uppercase opacity-70 mb-1">Amount</Label>
                            <p className="text-sm font-semibold text-brand">{caseData.amount}</p>
                        </div>
                    </div>
                </section>

                {/* Documents Table */}
                <section className="space-y-4">
                    <h4 className="text-base font-bold text-foreground">Verified Documents</h4>
                    <div className="space-y-2">
                        {['Emirates ID', 'Salary Certificate', 'Bank Statements (3 Months)', 'Utility Bill'].map(doc => (
                            <div key={doc} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    <span className="text-xs font-medium">{doc}</span>
                                </div>
                                <button className="text-[10px] font-bold text-brand uppercase hover:underline">View File</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-card">
                <button className="w-full py-4 bg-brand text-white rounded-xl font-bold text-sm shadow-lg shadow-brand/20 active:scale-[0.98] transition-all">
                    Submit to Bank
                </button>
            </div>
        </Card>
    );
}
