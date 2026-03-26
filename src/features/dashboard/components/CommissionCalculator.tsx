'use client';

import React, { useState, useCallback } from 'react';
import { ApiSearchableSelect } from '@/shared/ApiSearchableSelect';
import { getBankProducts } from '@/features/owner/bankproducts/api/bankproducts.api';
import { apiClient } from '@/lib/api/client';

const QUICK_AMOUNTS = [50000, 100000, 250000];

async function fetchAgentCommission(productId: number, amount: number): Promise<number> {
    const res = await apiClient.get(`/commission/agent/${productId}`, { params: { amount } });
    return typeof res.data === 'number' ? res.data : (res.data?.commission ?? 0);
}

// Adapter: getBankProducts returns { items, total, page, limit } — ApiSearchableSelect needs that shape
const fetchProductsFn = (params: any) =>
    getBankProducts({ page: params.page, limit: params.limit, search: params.search, status: 'active' });

export function CommissionCalculator() {
    const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
    const [amount, setAmount] = useState('');
    const [commission, setCommission] = useState<number | null>(null);
    const [quickResults, setQuickResults] = useState<{ amount: number; commission: number }[]>([]);
    const [calculating, setCalculating] = useState(false);
    const [calcError, setCalcError] = useState('');

    const calculate = useCallback(async () => {
        const num = parseFloat(amount);
        if (!selectedProductId || !num || num <= 0) {
            setCalcError('Please select a product and enter a valid amount.');
            return;
        }
        setCalcError('');
        setCalculating(true);
        try {
            const [mainResult, ...quickRes] = await Promise.all([
                fetchAgentCommission(selectedProductId as number, num),
                ...QUICK_AMOUNTS.map(a => fetchAgentCommission(selectedProductId as number, a)),
            ]);
            setCommission(mainResult);
            setQuickResults(QUICK_AMOUNTS.map((a, i) => ({ amount: a, commission: quickRes[i] })));
        } catch {
            setCalcError('Failed to calculate commission. Please try again.');
        } finally {
            setCalculating(false);
        }
    }, [selectedProductId, amount]);

    return (
        <div className="max-w-4xl mx-auto animate-in zoom-in duration-300">
            <div className="section-card bg-card border-foreground/30 border shadow-sm shadow-foreground/30 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-foreground/5 p-6 border-b border-border flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-foreground/10 text-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="16" height="20" x="4" y="2" rx="2" />
                            <line x1="8" x2="16" y1="6" y2="6" /><line x1="8" x2="16" y1="10" y2="10" />
                            <line x1="10" x2="10" y1="14" y2="18" /><line x1="8" x2="12" y1="16" y2="16" />
                            <line x1="14" x2="14" y1="14" y2="18" /><line x1="16" x2="16" y1="16" y2="16" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-foreground">Commission Calculator</h3>
                        <p className="text-xs text-text-muted">Select a bank product and enter loan amount to estimate commission</p>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest pl-1">
                                Bank Product
                            </label>
                            <ApiSearchableSelect
                                fetchFn={fetchProductsFn as any}
                                labelKey="product_name"
                                value={selectedProductId}
                                onChange={(val) => {
                                    setSelectedProductId(val as number);
                                    setCommission(null);
                                    setQuickResults([]);
                                }}
                                placeholder="Search bank products..."
                                extraParams={{ status: 'active' }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest pl-1">
                                Loan Amount (AED)
                            </label>
                            <input
                                type="number"
                                placeholder="Enter loan amount"
                                value={amount}
                                onChange={(e) => { setAmount(e.target.value); setCommission(null); }}
                                className="w-full p-3 bg-muted border border-border rounded-xl text-sm focus:ring-2 focus:ring-foreground outline-none transition-all font-medium"
                            />
                        </div>

                        {calcError && (
                            <p className="text-xs text-red font-bold bg-red/5 border border-red/20 rounded-xl px-4 py-2.5">
                                {calcError}
                            </p>
                        )}

                        <button
                            onClick={calculate}
                            disabled={calculating || !selectedProductId}
                            className="w-full py-3.5 bg-foreground text-background rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-foreground/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {calculating ? (
                                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                        <polyline points="16 7 22 7 22 13" />
                                    </svg>
                                    Calculate Commission
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className={`p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group transition-all duration-500 ${commission !== null ? 'bg-foreground' : 'bg-muted/50 border-2 border-dashed border-border'}`}>
                            {commission !== null ? (
                                <>
                                    <div className="absolute inset-0 bg-card/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2 relative z-10 text-background">
                                        Your Commission
                                    </span>
                                    <div className="text-4xl font-black mb-1 relative z-10 text-background animate-in zoom-in duration-300">
                                        AED {commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <p className="text-[11px] font-bold opacity-70 relative z-10 text-background">
                                        for AED {parseFloat(amount).toLocaleString()} loan
                                    </p>
                                </>
                            ) : (
                                <div className="py-4 flex flex-col items-center gap-3 opacity-40">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="16" height="20" x="4" y="2" rx="2" />
                                        <line x1="8" x2="16" y1="6" y2="6" /><line x1="8" x2="16" y1="10" y2="10" />
                                        <line x1="10" x2="10" y1="14" y2="18" /><line x1="8" x2="12" y1="16" y2="16" />
                                        <line x1="14" x2="14" y1="14" y2="18" /><line x1="16" x2="16" y1="16" y2="16" />
                                    </svg>
                                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                        Select product & calculate
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-widest pl-1 flex items-center gap-2">
                                Quick Examples
                                {quickResults.length === 0 && (
                                    <span className="opacity-40 normal-case tracking-normal font-medium text-[10px]">(calculate first)</span>
                                )}
                            </h4>
                            <div className="space-y-2">
                                {QUICK_AMOUNTS.map((amt, i) => {
                                    const result = quickResults[i];
                                    return (
                                        <div key={amt} className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50">
                                            <span className="text-xs font-bold text-text-secondary">AED {amt.toLocaleString()}</span>
                                            {result ? (
                                                <span className="text-sm font-black text-foreground">
                                                    AED {result.commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-text-muted opacity-40 font-bold">—</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
