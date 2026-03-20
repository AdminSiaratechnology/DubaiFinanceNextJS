'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

import { FileUploader } from '@/shared/FileUploader';

import { getBanks } from '@/features/owner/bank/api/bank.api';
import { getBankProductByBankId } from '@/features/owner/bankproducts/api/bankproducts.api';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';
import { sendCaseOtp, submitCompleteCase } from './api/agent.api';
import { toast } from 'sonner';

const requiredDocs = [
    { id: 'emirates_id_front', label: 'Emirates ID (Front) *' },
    { id: 'emirates_id_back', label: 'Emirates ID (Back) *' },
    { id: 'passport_copy', label: 'Passport Copy *' },
    { id: 'residence_visa', label: 'Residence Visa *' },
    { id: 'salary_certificate', label: 'Salary Certificate *' },
    { id: 'bank_statement_last_3_months', label: 'Bank Statements (Last 3 Months) *' },
    { id: 'bank_statement_last_6_months', label: 'Bank Statements (Last 6 Months) *' },
    { id: 'trade_license', label: 'Trade License *' },
    { id: 'liability_letter', label: 'Liability Letter' },
    { id: 'noc_from_employer', label: 'NOC From Employer' },
    { id: 'security_cheque', label: 'Security Cheque' },
    { id: 'utility_bill', label: 'Utility Bill' },
    { id: 'tenancy_contract', label: 'Tenancy Contract' },
    { id: 'proof_of_address', label: 'Proof of Address' },
    { id: 'last_3_month_payslips', label: 'Last 3 Months Payslip' },
    { id: 'last_6_month_payslips', label: 'Last 6 Months Payslip' },
    { id: 'company_id_card', label: 'Company ID Card' },
    { id: 'labor_contract', label: 'Labor Contract' },
    { id: 'employment_letter', label: "Employment Letter" },
    { id: 'bank_account_statement', label: 'Bank Account Statement (Personal)' },
    { id: 'credit_report', label: 'Credit Report' },
    { id: 'existing_loan_statement', label: 'Existing Loan Statements' },
    { id: 'property_document', label: 'Property Documents (if applicable)' },
    { id: 'vehicle_registration', label: 'Vehicle Registration (for Auto Loan)' },
    { id: 'business_plan', label: 'Business Plan (for Business Loan)' },
    { id: 'financial_statement', label: 'Financial Statements (Last 2 Years)' },
    { id: 'tax_return', label: 'Tax Returns' },
    { id: 'memorandum_of_association', label: '(MOA) Memorandum of Association' },
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
        status: 'submitted_to_coordinator',
        notes: '',
    });

    const [files, setFiles] = useState<{ [key: string]: File | null }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

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
        try {
            await sendCaseOtp(formData.email);
            setIsOtpSent(true);
            toast.success('Verification OTP sent to your email.');
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length < 4) {
            toast.error('Please enter a valid OTP');
            return;
        }

        setIsSubmitting(true);
        try {
            const multipart = new FormData();
            multipart.append('customer_name', formData.fullName);
            multipart.append('mobile_number', formData.mobileNumber);
            multipart.append('email', formData.email);
            multipart.append('employer_name', formData.employerName);
            multipart.append('monthly_salary', String(formData.monthlySalary));
            multipart.append('bank_id', String(formData.bank_id));
            multipart.append('product_id', String(formData.product_id));
            multipart.append('requested_amount', String(formData.amount));
            multipart.append('emirates_id', formData.emiratesId);
            multipart.append('otp', otp);
            multipart.append('status', formData.status)
            multipart.append('notes', formData.notes)
            // Append all files
            Object.entries(files).forEach(([id, file]) => {
                if (file) {
                    multipart.append(id, file);
                }
            });

            await submitCompleteCase(multipart);
            toast.success('Complete case submitted successfully!');
            setIsOtpSent(false);
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
                status: 'submitted_to_coordinator',
                notes: ''
            });
            setFiles({});
            setOtp('');
        } catch (error) {
            toast.error('Invalid OTP or submission failed.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <Card noPadding className="border-border">
                {/* Header */}
                <div className="p-4 sm:p-8 border-b border-border">
                    <div className="flex gap-4">
                        <div className="p-2 rounded-lg bg-foreground/10 text-foreground shrink-0 mt-1 sm:mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl sm:text-3xl font-medium text-foreground leading-tight">
                                {isOtpSent ? 'Verify Case Submission' : 'Submit Complete Case'}
                            </h3>
                            <p className="text-[12px] sm:text-sm text-text-muted italic leading-relaxed">
                                {isOtpSent
                                    ? `Enter the verification code sent to ${formData.email}`
                                    : 'Submit complete application with all required documents attached.'}
                            </p>
                        </div>
                    </div>
                </div>

                {!isOtpSent ? (
                    <form onSubmit={handleSubmit} className="p-8 space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground">Customer Information</h4>
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
                                <div className='space-y-1'>
                                    <Label>Notes</Label>
                                    <Input name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-border pb-3">
                                <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                </div>
                                <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground">Documents (Upload All)</h4>
                            </div>

                            <div className="space-y-3">
                                {requiredDocs.map((doc) => (
                                    <FileUploader
                                        key={doc.id}
                                        id={doc.id}
                                        label={doc.label}
                                        file={files[doc.id] || null}
                                        onChange={handleFileChange}
                                        color="foreground"
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 bg-foreground text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-foreground/90 hover:shadow-xl active:scale-[0.98]'}`}
                        >
                            {isSubmitting ? <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> Send OTP to Verify</>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="p-8 space-y-10 animate-in slide-in-from-right-4 duration-300">
                        <div className="max-w-sm mx-auto space-y-6 pt-10 pb-20 text-center">
                            <div className="space-y-4">
                                <Label className="text-xs uppercase tracking-widest font-bold opacity-60">Verification Code</Label>
                                <Input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    className="text-center text-3xl font-black h-20 tracking-[0.5em] border-2 focus:border-purple"
                                    maxLength={6}
                                    autoFocus
                                />
                                <p className="text-[10px] text-text-muted italic leading-relaxed">
                                    We've sent a code to help secure your submission. <br />
                                    Please enter it above to finalize the application.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !otp}
                                    className={`w-full py-5 bg-foreground text-background rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'opacity-70' : 'hover:bg-foreground/90 hover:shadow-2xl active:scale-[0.98]'}`}
                                >
                                    {isSubmitting ? <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> Confirm & Submit Case</>}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsOtpSent(false)}
                                    className="text-[10px] font-bold text-text-muted hover:text-foreground uppercase tracking-wider"
                                >
                                    Back to Application
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
}
