'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

import { FileUploader } from '@/shared/FileUploader';

import { getBanks } from '@/features/owner/bank/api/bank.api';
import { getBankProductByBankId } from '@/features/owner/bankproducts/api/bankproducts.api';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';

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

export function SubmitCase() {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        emiratesId: '',
        employerName: '',
        monthlySalary: '',
        bank_id: '' as string | number,
        bankName: '',
        product_id: '' as string | number,
        productName: '',
        amount: '',
    });

    const [files, setFiles] = useState<{ [key: string]: File | null }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fetchProducts = async (params: any) => {
        if (!formData.bank_id) return { items: [], total: 0, page: 1, limit: 10 };
        return getBankProductByBankId(Number(formData.bank_id));
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
                bank_id: '',
                bankName: '',
                product_id: '',
                productName: '',
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
                                <Label>Select Bank *</Label>
                                <ApiSearchableSelect
                                    fetchFn={getBanks as any}
                                    value={formData.bank_id}
                                    onChange={(val) => setFormData(prev => ({ ...prev, bank_id: val as number, product_id: '' }))}
                                    placeholder="Search bank..."
                                    initialOptions={formData.bank_id && formData.bankName ? [{ id: Number(formData.bank_id), name: formData.bankName }] : []}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Select Product *</Label>
                                <ApiSearchableSelect
                                    fetchFn={fetchProducts}
                                    labelKey="product_name"
                                    value={formData.product_id}
                                    onChange={(val) => setFormData(prev => ({ ...prev, product_id: val as number | '' }))}
                                    placeholder="Search product..."
                                    disabled={!formData.bank_id}
                                    extraParams={{ bank_id: formData.bank_id }}
                                    initialOptions={formData.product_id && formData.productName ? [{ id: Number(formData.product_id), product_name: formData.productName }] : []}
                                />
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
                                <FileUploader
                                    key={doc.id}
                                    id={doc.id}
                                    label={doc.label}
                                    file={files[doc.id] || null}
                                    onChange={handleFileChange}
                                    color="purple"
                                />
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
