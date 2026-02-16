'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

const productOptions = [
    { value: 'personal-loan', label: 'Personal Loan' },
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'auto-loan', label: 'Auto Loan' },
    { value: 'business-loan', label: 'Business Loan' },
];

export function SubmitLead() {
    const [formData, setFormData] = useState({
        customerName: '',
        mobileNumber: '',
        email: '',
        productType: 'personal-loan',
        amount: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('Lead Submission Data:', formData);

        setTimeout(() => {
            alert('Lead submitted successfully! Verification OTP sent.');
            setIsSubmitting(false);
            setFormData({
                customerName: '',
                mobileNumber: '',
                email: '',
                productType: 'personal-loan',
                amount: '',
            });
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card noPadding className="border-border">
                <div className="bg-green-soft dark:bg-green/10 p-4 sm:p-6 border-b border-green/10 dark:border-green/20">
                    <div className="flex gap-4">
                        <div className="text-green shrink-0 mt-1 sm:mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">Submit Lead (Basic Info)</h3>
                            <p className="text-[10px] sm:text-xs font-semibold text-text-muted opacity-80 leading-relaxed">
                                Submit basic customer details. Telecaller will collect documents later.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                        <div className="space-y-1">
                            <Label>Customer Name *</Label>
                            <Input
                                type="text"
                                name="customerName"
                                required
                                value={formData.customerName}
                                onChange={handleChange}
                                placeholder="Full name"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Mobile Number *</Label>
                            <Input
                                type="tel"
                                name="mobileNumber"
                                required
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="+971 50 123 4567"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Email Address *</Label>
                            <Input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="customer@email.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Product Type *</Label>
                            <Select
                                name="productType"
                                required
                                value={formData.productType}
                                onChange={handleChange}
                                options={productOptions}
                            />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <Label>Requested Amount (AED) *</Label>
                            <Input
                                type="number"
                                name="amount"
                                required
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Enter amount"
                                className="text-lg font-bold text-green"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 bg-green text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green/90 shadow-md shadow-green/20'}`}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                Send OTP for Verification
                            </>
                        )}
                    </button>
                </form>
            </Card>
        </div>
    );
}
