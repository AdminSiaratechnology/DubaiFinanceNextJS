'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

const productOptions = [
    { value: 'personal-loan', label: 'Personal Loan' },
    { value: 'business-loan', label: 'Business Loan' },
    { value: 'auto-loan', label: 'Auto Loan' },
    { value: 'credit-card', label: 'Credit Card' },
];

const requiredDocs = [
    { id: 'eid-front', label: 'Emirates ID (Front) *' },
    { id: 'eid-back', label: 'Emirates ID (Back) *' },
    { id: 'passport', label: 'Passport Copy *' },
    { id: 'visa', label: 'Residence Visa *' },
    { id: 'salary-cert', label: 'Salary Certificate *' },
    { id: 'bank-statement-3', label: 'Bank Statements (3M) *' },
    { id: 'bank-statement-6', label: 'Bank Statements (6M) *' },
];

export function SubmitCase() {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        emiratesId: '',
        employerName: '',
        monthlySalary: '',
        productType: 'personal-loan',
        amount: '',
    });

    const [files, setFiles] = useState<{ [key: string]: File | null }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [id]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('Case Submission Data:', { formData, files });

        setTimeout(() => {
            alert('Complete case submitted successfully!');
            setIsSubmitting(false);
            setFormData({
                fullName: '',
                mobileNumber: '',
                email: '',
                emiratesId: '',
                employerName: '',
                monthlySalary: '',
                productType: 'personal-loan',
                amount: '',
            });
            setFiles({});
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <Card noPadding className="border-border">
                {/* Header */}
                <div className="bg-purple-soft dark:bg-purple/10 p-4 sm:p-6 border-b border-purple/10 dark:border-purple/20">
                    <div className="flex gap-4">
                        <div className="text-purple shrink-0 mt-1 sm:mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">Submit Complete Case</h3>
                            <p className="text-[10px] sm:text-xs font-semibold text-text-muted opacity-80 leading-relaxed">
                                Submit complete application with all required documents attached.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-purple rounded-full" />
                            <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">Customer Information</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="space-y-1">
                                <Label>Full Name *</Label>
                                <Input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Customer name" />
                            </div>

                            <div className="space-y-1">
                                <Label>Mobile Number *</Label>
                                <Input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} placeholder="+971 50 123 4567" />
                            </div>

                            <div className="space-y-1">
                                <Label>Email Address *</Label>
                                <Input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="customer@email.com" />
                            </div>

                            <div className="space-y-1">
                                <Label>Emirates ID *</Label>
                                <Input type="text" name="emiratesId" required value={formData.emiratesId} onChange={handleChange} placeholder="784-XXXX-XXXXXXX-X" />
                            </div>

                            <div className="space-y-1">
                                <Label>Employer Name *</Label>
                                <Input type="text" name="employerName" required value={formData.employerName} onChange={handleChange} placeholder="Company name" />
                            </div>

                            <div className="space-y-1">
                                <Label>Monthly Salary (AED) *</Label>
                                <Input type="number" name="monthlySalary" required value={formData.monthlySalary} onChange={handleChange} placeholder="Monthly income" />
                            </div>

                            <div className="space-y-1">
                                <Label>Product Type *</Label>
                                <Select name="productType" required value={formData.productType} onChange={handleChange} options={productOptions} />
                            </div>

                            <div className="space-y-1">
                                <Label>Requested Amount (AED) *</Label>
                                <Input type="number" name="amount" required value={formData.amount} onChange={handleChange} placeholder="Loan amount" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-purple rounded-full" />
                            <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">Documents (Upload All)</h4>
                        </div>

                        <div className="space-y-3">
                            {requiredDocs.map((doc) => (
                                <div key={doc.id} className="group transition-all">
                                    <Label>{doc.label}</Label>
                                    <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${files[doc.id] ? 'border-purple/30 bg-purple-soft/30' : 'border-border hover:border-purple/20'}`}>
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${files[doc.id] ? 'bg-purple text-white shadow-md' : 'bg-muted text-text-muted'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        {files[doc.id] ? <path d="M20 6 9 17l-5-5" /> : <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></>}
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className={`text-xs font-bold ${files[doc.id] ? 'text-purple' : 'text-foreground'}`}>{files[doc.id] ? files[doc.id]?.name : 'Choose File'}</p>
                                                    <p className="text-[10px] text-text-muted font-medium">{files[doc.id] ? `${(files[doc.id]!.size / 1024).toFixed(1)} KB` : 'No file chosen'}</p>
                                                </div>
                                            </div>
                                            <input type="file" id={doc.id} className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(doc.id, e)} />
                                            {files[doc.id] && (
                                                <button type="button" onClick={(e) => { e.preventDefault(); setFiles(prev => { const n = { ...prev }; delete n[doc.id]; return n; }); }} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-text-muted z-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 bg-brand text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand/90 hover:shadow-xl active:scale-[0.98]'}`}
                    >
                        {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> Submit Case</>}
                    </button>
                </form>
            </Card>
        </div>
    );
}
