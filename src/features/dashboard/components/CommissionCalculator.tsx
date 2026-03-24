'use client';

import React, { useState, useMemo } from 'react';

const products = [
    { id: 'personal-loan', name: 'Personal Loan', rate: 1.5, type: 'percent' },
    { id: 'credit-card', name: 'Credit Card', rate: 0.8, type: 'percent', label: 'Fixed AED 240' },
    { id: 'business-loan', name: 'Business Loan', rate: 2.0, type: 'percent' },
    { id: 'auto-loan', name: 'Auto Loan', rate: 1.2, type: 'percent' },
];

export function CommissionCalculator() {
    const [selectedProductId, setSelectedProductId] = useState(products[0].id);
    const [amount, setAmount] = useState<string>('');

    const selectedProduct = useMemo(() =>
        products.find(p => p.id === selectedProductId) || products[0]
        , [selectedProductId]);

    const commission = useMemo(() => {
        const numAmount = parseFloat(amount) || 0;
        if (selectedProduct.type === 'fixed') {
            return numAmount > 0 ? selectedProduct.rate : 0;
        }
        return (numAmount * selectedProduct.rate) / 100;
    }, [amount, selectedProduct]);

    const quickExamples = useMemo(() => {
        const samples = [50000, 100000, 250000];
        return samples.map(val => ({
            amount: val,
            commission: selectedProduct.type === 'fixed' ? selectedProduct.rate : (val * selectedProduct.rate) / 100
        }));
    }, [selectedProduct]);

    return (
        <div className="max-w-4xl mx-auto animate-in zoom-in duration-300">
            <div className="section-card bg-card border-foreground/30 border shadow-sm shadow-foreground/30 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-foreground/5 p-4 border-b border-border">
                    <h3 className="text-base font-bold text-foreground">Commission Calculator</h3>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left: Inputs */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest pl-1">Product Type</label>
                            <select
                                value={selectedProductId}
                                onChange={(e) => setSelectedProductId(e.target.value)}
                                className="w-full p-3 bg-muted border border-border rounded-xl text-sm focus:ring-2 focus:ring-foreground outline-none transition-all appearance-none cursor-pointer font-medium"
                            >
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} {p.type === 'percent' ? `(${p.rate}%)` : `(${p.label})`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest pl-1">Amount (AED)</label>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-3 bg-muted border border-border rounded-xl text-sm focus:ring-2 focus:ring-foreground outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Right: Results & Examples */}
                    <div className="space-y-8">
                        {/* Result Card */}
                        <div className="bg-foreground text-background p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-card/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2 relative z-10 text-background">Your Commission</span>
                            <div className="text-4xl font-black mb-1 relative z-10 text-background">
                                AED {commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <p className="text-[11px] font-bold opacity-70 relative z-10 text-background">
                                {selectedProduct.type === 'percent' ? `${selectedProduct.rate}% of AED ${parseFloat(amount) || 0}` : selectedProduct.label}
                            </p>
                        </div>

                        {/* Quick Examples */}
                        <div className="space-y-4">
                            <h4 className="text-[11px] font-bold text-text-muted uppercase tracking-widest pl-1">Quick Examples:</h4>
                            <div className="space-y-2">
                                {quickExamples.map((ex, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50">
                                        <span className="text-xs font-bold text-text-secondary">AED {ex.amount.toLocaleString()}</span>
                                        <span className="text-sm font-black text-foreground">AED {ex.commission.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
