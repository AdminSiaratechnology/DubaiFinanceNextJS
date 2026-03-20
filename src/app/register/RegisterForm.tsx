'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';
import { getBanks } from '@/features/owner/bank/api/bank.api';
import { getBankProductByBankId } from '@/features/owner/bankproducts/api/bankproducts.api';
import { getCommissionByBankAndProduct, Commission } from '@/features/owner/commission/api/commission.api';
import { createAgent, AgentCreatePayload } from '@/features/owner/team/api/agent.api';
import { toast } from 'sonner';
import { Label, Input } from '@/components/ui/Form';
import { Card } from '@/components/ui/Card';
import CountrySearchableSelect from '@/shared/CountrySearchableSelect';

interface SectionCardProps {
    number: string;
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

function SectionCard({ number, title, icon, children }: SectionCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm overflow-visible">
            <div className="flex items-center gap-3 border-b border-border pb-3 mb-6">
                <div className="flex items-center justify-center p-2 rounded-lg bg-foreground/10 text-foreground">
                    {icon || (
                        <span className="text-[10px] font-black tracking-tighter font-mono">
                            {number}
                        </span>
                    )}
                </div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground">{title}</h4>
            </div>

            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}


interface FormData {
    fullName: string;
    email: string;
    mobile: string;
    emiratesId: string;
    nationality: string;
    companyName: string;
    experience: string;
    accountHolder: string;
    bankName: string;
    iban: string;
    password: string;
    agreedKYC: boolean;
    agreedTerms: boolean;
}

export function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [assignedCommissions, setAssignedCommissions] = useState<Commission[]>([]);

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        mobile: '',
        emiratesId: '',
        nationality: '',
        companyName: '',
        experience: '',
        accountHolder: '',
        bankName: '',
        iban: '',
        password: '',
        agreedKYC: false,
        agreedTerms: false,
    });

    const handleAddCommission = async () => {
        if (!selectedBankId || !selectedProductId) {
            toast.error('Please select both bank and product');
            return;
        }

        try {
            const commission = await getCommissionByBankAndProduct(selectedBankId, selectedProductId);
            if (!commission) {
                toast.error('No commission configuration found');
                return;
            }

            if (assignedCommissions.some(c => c.id === commission.id)) {
                toast.error('This commission is already assigned');
                return;
            }

            setAssignedCommissions(prev => [...prev, commission]);
            setSelectedProductId(null);
            toast.success('Commission added');
        } catch (error) {
            toast.error('Failed to fetch commission');
        }
    };

    const removeCommission = (id: number) => {
        setAssignedCommissions(prev => prev.filter(c => c.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.agreedTerms || !formData.agreedKYC) {
            toast.error('Please agree to all terms and conditions');
            return;
        }

        if (!formData.fullName || !formData.email || !formData.mobile || !formData.password) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        try {
            const agentPayload: AgentCreatePayload = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.mobile,
                emirates_id: formData.emiratesId,
                nationality: formData.nationality,
                business_name: formData.companyName,
                year_of_experience: Number(formData.experience) || 0,
                account_holder_name: formData.accountHolder,
                bank_name: formData.bankName,
                account_number: '', // Optional/Legacy if handled by IBAN
                iban: formData.iban,
                status: 'active',
                password: formData.password,
                commission_ids: assignedCommissions.map(c => c.id)
            };

            await createAgent(agentPayload);
            toast.success('Registration successful! Please login.');
            router.push('/login');
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.detail?.[0]?.msg || err?.response?.data?.detail || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
        setFormData((prev) => ({ ...prev, [key]: value }));

    const fetchProducts = async (params: any) => {
        if (!selectedBankId) return { items: [], total: 0, page: 1, limit: 10 };
        return getBankProductByBankId(selectedBankId);
    };
    return (
        <Card noPadding className="relative bg-background border border-border rounded-xl shadow-card overflow-visible">
            <form onSubmit={handleSubmit}>
                <div className="px-7 py-7 border-b border-border bg-foreground/5 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
                                Agent Registration
                            </h2>
                            <p className="text-[12px] sm:text-sm text-text-muted italic mt-1">
                                Complete your profile to unlock commissions & payouts
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-8 space-y-8">
                    <SectionCard
                        number="01"
                        title="Personal Information"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Full Name (as per Emirates ID)</Label>
                                <Input
                                    required
                                    placeholder="Enter your legal name"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('fullName', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>Email Address</Label>
                                <Input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('email', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label required>Mobile Number</Label>
                                <Input
                                    type="tel"
                                    required
                                    placeholder="+971 XX XXX XXXX"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('mobile', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label required>Emirates ID</Label>
                                <Input
                                    required
                                    placeholder="784-XXXX-XXXXXXX-X"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('emiratesId', e.target.value)}
                                />
                            </div>

                            <CountrySearchableSelect
                                label='Nationality'
                                value={formData.nationality}
                                required
                                placeholder="Country of citizenship"
                                onChange={(val) => update('nationality', val)}
                            />

                            <div className="space-y-2">
                                <Label required>Password</Label>
                                <Input
                                    type="password"
                                    required
                                    placeholder="Create a secure password"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('password', e.target.value)}
                                />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        number="02"
                        title="Professional Background"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label>Company / Business Name</Label>
                                <Input
                                    placeholder="Optional"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('companyName', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Years of Experience</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 5"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('experience', e.target.value)}
                                    min={0}
                                />
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        number="03"
                        title="Banking Information"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2 space-y-2">
                                <Label required>Account Holder Name</Label>
                                <Input
                                    required
                                    placeholder="As per bank records"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('accountHolder', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label required>Bank Name</Label>
                                <Input
                                    required
                                    placeholder="e.g. Emirates NBD"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('bankName', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label required>IBAN</Label>
                                <Input
                                    required
                                    placeholder="AE00 XXXX XXXX XXXX XXX"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('iban', e.target.value)}
                                />
                            </div>
                        </div>
                    </SectionCard>

                    <div className="relative overflow-visible rounded-2xl border border-border bg-foreground/5 p-6">
                        <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground">
                                Commission Structure
                            </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-6">
                            <div className="space-y-2">
                                <Label>Pick Bank</Label>
                                <ApiSearchableSelect
                                    fetchFn={getBanks as any}
                                    value={selectedBankId || ''}
                                    onChange={(val) => {
                                        setSelectedBankId(Number(val));
                                        setSelectedProductId(null);
                                    }}
                                    placeholder="Search bank..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Pick Product</Label>
                                <ApiSearchableSelect
                                    fetchFn={fetchProducts}
                                    labelKey="product_name"
                                    value={selectedProductId || ''}
                                    onChange={(val) => setSelectedProductId(Number(val))}
                                    placeholder="Search product..."
                                    disabled={!selectedBankId}
                                    extraParams={{ bank_id: selectedBankId }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddCommission}
                                disabled={!selectedProductId}
                                className="md:col-span-2 w-full h-11 bg-foreground text-background rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add to My Portfolio
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {assignedCommissions.map(comm => (
                                <div
                                    key={comm.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-card/70 border border-border relative group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold text-text-primary">
                                            {comm.bank.name}
                                        </span>
                                        <span className="text-[10px] text-text-muted">
                                            {comm.product.product_name}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                         <div className="flex flex-wrap gap-1.5 justify-end">
                                            <div className="flex flex-col items-center bg-foreground/5 border border-border px-2.5 py-1 rounded-lg">
                                                <span className="text-[8px] font-black uppercase tracking-tighter text-text-muted">Agent</span>
                                                <span className="text-[11px] font-bold text-foreground leading-none mt-0.5">{comm.agent_share}%</span>
                                            </div>
                                            <div className="flex flex-col items-center bg-foreground/5 border border-border px-2.5 py-1 rounded-lg">
                                                <span className="text-[8px] font-black uppercase tracking-tighter text-text-muted">Caller</span>
                                                <span className="text-[11px] font-bold text-foreground leading-none mt-0.5">{comm.telecaller_share}%</span>
                                            </div>
                                            <div className="flex flex-col items-center bg-foreground/5 border border-border px-2.5 py-1 rounded-lg">
                                                <span className="text-[8px] font-black uppercase tracking-tighter text-text-muted">Analyst</span>
                                                <span className="text-[11px] font-bold text-foreground leading-none mt-0.5">{comm.coordinator_share}%</span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeCommission(comm.id)}
                                            className="p-1.5 text-text-muted hover:text-red hover:bg-red/5 rounded-full transition-all group-hover:opacity-100"
                                            title="Remove from portfolio"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {assignedCommissions.length === 0 && (
                                <div className="md:col-span-2 text-center py-4 border border-dashed border-border rounded-xl text-text-muted text-xs italic">
                                    Search and add products to see your commission rates
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {([
                            {
                                key: 'agreedKYC',
                                text: 'I confirm that I will complete KYC verification and provide required documentation',
                            },
                            {
                                key: 'agreedTerms',
                                text: 'I accept the Agent Agreement and Code of Conduct',
                            },
                        ] as { key: keyof FormData; text: string }[]).map((item) => (
                            <label
                                key={item.key}
                                className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer group ${formData[item.key] ? 'bg-blue-soft/30 border-blue/20' : 'bg-card/50 border-border hover:border-blue/20'}`}
                            >
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type="checkbox"
                                        checked={formData[item.key] as boolean}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-border bg-background transition-all checked:bg-foreground checked:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(item.key as keyof FormData, e.target.checked)}
                                    />
                                    <svg
                                        className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span className={`text-sm leading-relaxed transition-colors ${formData[item.key] ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
                                    {item.text}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="sticky bottom-0 px-6 md:px-8 py-5 bg-card/80 backdrop-blur-xl border-t border-border flex items-center justify-between z-10">
                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="text-sm font-medium text-text-secondary hover:text-text-primary transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-10 py-3.5 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-widest shadow-xl hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Complete Registration'
                        )}
                    </button>
                </div>
            </form>
        </Card>
    );
}
