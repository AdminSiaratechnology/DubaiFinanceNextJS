'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { FileUploader } from '@/shared/FileUploader';

interface LeadDetailsProps {
    lead: {
        id: string;
        name: string;
        mobile: string;
        email?: string;
        status: string;
        employer?: string;
        salary?: number | string;
        amount?: number | string;
        product?: string;
        emiratesId?: string;
    };
    onClose: () => void;
}

const requiredDocs = [
    { id: 'eid-front', label: 'Emirates ID (Front) *' },
    { id: 'eid-back', label: 'Emirates ID (Back) *' },
    { id: 'passport', label: 'Passport Copy *' },
    { id: 'visa', label: 'Residence Visa *' },
    { id: 'salary-cert', label: 'Salary Certificate *' },
    { id: 'bank-statement-3', label: 'Bank Statements (Last 3 Months) *' },
    { id: 'bank-statement-6', label: 'Bank Statements (Last 6 Months) *' },
    { id: 'trade-license', label: 'Trade License *' },
    { id: 'liability-letter', label: 'Liability Letter' },
    { id: 'noc', label: 'NOC From Employer' },
    { id: 'security-cheque', label: 'Security Cheque' },
    { id: 'utility-bill', label: 'Utility Bill' },
    { id: 'tenancy-contract', label: 'Tenancy Contract' },
    { id: 'proof-of-address', label: 'Proof of Address' },
    { id: 'last-3-months-payslip', label: 'Last 3 Months Payslip' },
    { id: 'last-6-months-payslip', label: 'Last 6 Months Payslip' },
    { id: 'company-id', label: 'Company ID Card' },
    { id: 'labor-contract', label: 'Labor Contract' },
    { id: 'employment-letter', label: "Employment Letter" },
    { id: 'bank-account-statement', label: 'Bank Account Statement (Personal)' },
    { id: 'credit-report', label: 'Credit Report' },
    { id: 'existing-loan-statements', label: 'Existing Loan Statements' },
    { id: 'property-documents', label: 'Property Documents (if applicable)' },
    { id: 'vehicle-registration', label: 'Vehicle Registration (for Auto Loan)' },
    { id: 'business-plan', label: 'Business Plan (for Business Loan)' },
    { id: 'financial-statements', label: 'Financial Statements (Last 2 Years)' },
    { id: 'tax-returns', label: 'Tax Returns' },
    { id: 'moa', label: '(MOA) Memorandum of Association' },
];

export function LeadDetails({ lead, onClose }: LeadDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...lead });
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (id: string, file: File | null) => {
        setFiles(prev => {
            if (file) {
                return { ...prev, [id]: file };
            } else {
                const next = { ...prev };
                delete next[id];
                return next;
            }
        });
    };

    const handleSave = () => {
        console.log('Saving lead data:', formData);
        setIsEditing(false);
        // In a real app, you'd call an API here
    };

    return (
        <Card noPadding className="h-full flex flex-col animate-in slide-in-from-right duration-300">
            {/* ... header remains same ... */}
            <div className="bg-green-soft/30 dark:bg-green/10 p-4 border-b border-border flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green"><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M15 18a3 3 0 1 0-6 0" /><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /></svg>
                    <h3 className="font-bold text-lg text-foreground">Case Details</h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-red-soft hover:text-red-500 rounded-lg transition-colors text-text-muted"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
                {/* Customer Information Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-foreground">Customer Information</h4>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:bg-muted transition-colors flex items-center gap-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-bold hover:bg-brand/90 transition-colors flex items-center gap-1"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:bg-muted transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Full Name</Label>
                            {isEditing ? (
                                <Input name="name" value={formData.name} onChange={handleInputChange} />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.name}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Mobile Number</Label>
                            {isEditing ? (
                                <Input name="mobile" value={formData.mobile} onChange={handleInputChange} />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.mobile}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Email Address</Label>
                            {isEditing ? (
                                <Input name="email" value={formData.email || ''} onChange={handleInputChange} />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.email || 'N/A'}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Emirates ID</Label>
                            {isEditing ? (
                                <Input name="emiratesId" value={formData.emiratesId || ''} onChange={handleInputChange} />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.emiratesId || '784-1XXX-XXXX-X'}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Employer</Label>
                            {isEditing ? (
                                <Input name="employer" value={formData.employer || ''} onChange={handleInputChange} />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.employer || 'Dubai Health Authority'}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Monthly Salary (AED)</Label>
                            {isEditing ? (
                                <Input name="salary" type="number" value={formData.salary || ''} onChange={handleInputChange} />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.salary || '17,000'}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Requested Amount (AED)</Label>
                            {isEditing ? (
                                <Input name="amount" type="number" value={formData.amount || ''} onChange={handleInputChange} />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.amount || '80,000'}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Product Type</Label>
                            {isEditing ? (
                                <Select
                                    name="product"
                                    value={formData.product || ''}
                                    onChange={handleInputChange}
                                    options={[
                                        { value: 'Personal Loan', label: 'Personal Loan' },
                                        { value: 'Business Loan', label: 'Business Loan' },
                                        { value: 'Credit Card', label: 'Credit Card' },
                                        { value: 'Auto Loan', label: 'Auto Loan' },
                                    ]}
                                />
                            ) : (
                                <p className="text-sm font-bold text-foreground h-10 flex items-center">{formData.product || 'Personal Loan'}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Upload Documents Section */}
                <section className="space-y-6">
                    <h4 className="text-base font-bold text-foreground">Upload Documents</h4>
                    <div className="grid grid-cols-1 gap-4">
                        {requiredDocs.map((doc) => (
                            <FileUploader
                                key={doc.id}
                                id={doc.id}
                                label={doc.label}
                                file={files[doc.id] || null}
                                onChange={handleFileChange}
                                color="blue"
                            />
                        ))}
                    </div>
                </section>

                {/* Update Status */}
                <section className="space-y-6">
                    <h4 className="text-base font-bold text-foreground">Update Status</h4>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label>Select New Status</Label>
                            <Select
                                value="pending"
                                onChange={() => { }}
                                options={[
                                    { value: 'pending', label: 'Documents Pending' },
                                    { value: 'collected', label: 'Documents Collected' },
                                    { value: 'follow-up', label: 'Follow Up Required' },
                                    { value: 'submitted', label: 'Submitted to Coordinator' }
                                ]}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Notes (Optional)</Label>
                            <textarea
                                className="w-full h-24 p-4 bg-muted border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand outline-none transition-all custom-scrollbar placeholder:text-text-muted/50"
                                placeholder="Add any notes or comments..."
                            />
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-card space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-brand text-white rounded-xl font-bold text-xs hover:bg-brand/90 transition-all shadow-md active:scale-[0.98]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-9 11-5-5" /><circle cx="12" cy="12" r="10" opacity="0" /></svg>
                        Update Status
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-green text-white rounded-xl font-bold text-xs hover:bg-green/90 transition-all shadow-md active:scale-[0.98]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                        Submit to Coordinator
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-bold text-xs hover:bg-muted transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        Call
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-bold text-xs hover:bg-muted transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                        Email
                    </button>
                </div>
            </div>
        </Card>
    );
}
