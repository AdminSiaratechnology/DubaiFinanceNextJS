'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

import { getBanks } from '@/features/owner/bank/api/bank.api';
import { getBankProductByBankId } from '@/features/owner/bankproducts/api/bankproducts.api';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';
import { submitLead, sendLeadOtp, updateLead } from './api/agent.api'
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export function SubmitLead() {
    const searchParams = useSearchParams();
    
    // Check for prefilled data from 'Edit' navigation
    const getInitialData = () => {
        const editDataStr = searchParams.get('editData');
        if (editDataStr) {
            try {
                const data = JSON.parse(decodeURIComponent(editDataStr));
                return {
                    id: data.id || null,
                    customer_name: data.customer_name || '',
                    mobile_number: data.mobile_number || '',
                    email: data.email || '',
                    bank_id: data.bank?.id || '',
                    bank_name: data.bank?.name || '',
                    product_id: data.product?.id || '',
                    product_name: data.product?.product_name || '',
                    requested_amount: data.requested_amount || 0,
                };
            } catch (e) {
                console.error("Failed to parse editData", e);
            }
        }
        return {
            id: null,
            customer_name: '',
            mobile_number: '',
            email: '',
            bank_id: '',
            bank_name: '',
            product_id: '',
            product_name: '',
            requested_amount: 0,
        };
    };

    const initialData = getInitialData();

    const [formData, setFormData] = useState({
        customer_name: initialData.customer_name,
        mobile_number: initialData.mobile_number,
        email: initialData.email,
        bank_id: initialData.bank_id as string | number,
        product_id: initialData.product_id as string | number,
        requested_amount: initialData.requested_amount,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    // Update form if search params change (though usually one-shot)
    useEffect(() => {
        const data = getInitialData();
        setFormData({
            customer_name: data.customer_name,
            mobile_number: data.mobile_number,
            email: data.email,
            bank_id: data.bank_id as string | number,
            product_id: data.product_id as string | number,
            requested_amount: data.requested_amount,
        });
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'requested_amount' ? Number(value) : value
        }));
    };

    const fetchProducts = async (params: any) => {
        if (!formData.bank_id) return { items: [], total: 0, page: 1, limit: 10 };
        return getBankProductByBankId(Number(formData.bank_id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (initialData.id) {
                // Direct update for returned leads
                await updateLead(initialData.id, formData);
                toast.success('Lead updated successfully!');
                // Redirect back to dashboard to refresh
                window.location.href = '/dashboard/agent/main?tab=dashboard&view=leads';
            } else {
                // New lead submission with OTP
                await sendLeadOtp(formData.email);
                setIsOtpSent(true);
                toast.success('Verification OTP sent to your email.');
            }
        } catch (error) {
            toast.error(initialData.id ? 'Failed to update lead.' : 'Failed to send OTP. Please try again.');
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
            await submitLead(formData, otp);
            toast.success('Lead verified and submitted successfully!');
            setIsOtpSent(false);
            setFormData({
                customer_name: '',
                mobile_number: '',
                email: '',
                bank_id: '',
                product_id: '',
                requested_amount: 0,
            });
            setOtp('');
        } catch (error) {
            toast.error('Invalid OTP or submission failed. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card noPadding className="border-border">
                <div className="p-4 sm:p-8 border-b border-border">
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-foreground/10 text-foreground shrink-0 mt-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl sm:text-3xl font-medium text-foreground leading-tight">
                                {isOtpSent ? 'Verify Lead OTP' : initialData.id ? 'Update Lead Details' : 'Submit Lead (Basic Info)'}
                            </h3>
                            <p className="text-[12px] sm:text-sm text-text-muted italic leading-relaxed">
                                {isOtpSent
                                    ? `Enter the OTP sent to customer: ${formData.mobile_number}`
                                    : initialData.id 
                                        ? 'Update the customer basic details and resubmit.'
                                        : 'Submit basic customer details. Telecaller will collect documents later.'}
                            </p>
                        </div>
                    </div>
                </div>

                {!isOtpSent ? (
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="space-y-1">
                                <Label>Customer Name *</Label>
                                <Input
                                    type="text"
                                    name="customer_name"
                                    required
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                    placeholder="Full name"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Mobile Number *</Label>
                                <Input
                                    type="tel"
                                    name="mobile_number"
                                    required
                                    value={formData.mobile_number}
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
                                    disabled={!!initialData.id}
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Select Bank *</Label>
                                <ApiSearchableSelect
                                    fetchFn={getBanks as any}
                                    value={formData.bank_id}
                                    onChange={(val) => setFormData(prev => ({ ...prev, bank_id: val as number, product_id: '' }))}
                                    placeholder="Search bank..."
                                    initialOptions={initialData.bank_id ? [{ id: Number(initialData.bank_id), name: initialData.bank_name }] : []}
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
                                    initialOptions={initialData.product_id ? [{ id: Number(initialData.product_id), product_name: initialData.product_name }] : []}
                                />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <Label>Requested Amount (AED) *</Label>
                                <Input
                                    type="number"
                                    name="requested_amount"
                                    required
                                    value={formData.requested_amount || ''}
                                    onChange={handleChange}
                                    placeholder="Enter amount"
                                    className="text-lg font-bold text-green"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-foreground/90 shadow-md'}`}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                    {initialData.id ? 'Update and Resubmit Lead' : 'Send OTP for Verification'}
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="p-8 space-y-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="max-w-sm mx-auto space-y-6">
                            <div className="space-y-2 text-center mb-8">
                                <Label className="text-sm">Verification Code</Label>
                                <Input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 4-6 digit OTP"
                                    className="text-center text-2xl font-black tracking-[0.5em] h-16 border-2 focus:border-foreground focus:ring-1 focus:ring-foreground"
                                    maxLength={6}
                                    autoFocus
                                />
                                <p className="text-[10px] text-text-muted mt-2 italic">A code was sent to help us verify this lead submission.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !otp}
                                    className={`w-full py-5 bg-foreground text-background rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:shadow-lg active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-foreground/90 shadow-md'}`}
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                            Verify & Submit Lead
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsOtpSent(false)}
                                    className="text-xs font-bold text-text-muted hover:text-foreground transition-colors py-2"
                                >
                                    Edit Contact Details
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
}
