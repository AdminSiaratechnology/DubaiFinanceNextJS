import React from 'react';
import Link from 'next/link';
import { BankProduct } from '@/lib/mock/bankProducts';
import { BankProductActions } from './BankProductActions';
import { BankProductSearch } from './BankProductSearch';

interface BankProductTableProps {
    bankProducts: BankProduct[];
}

const segmentLabels = {
    salaried: 'Salaried',
    'self-employed': 'Self-employed',
    sme: 'SME'
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'AED',
        maximumFractionDigits: 0
    }).format(amount);
};

export function BankProductTable({ bankProducts }: BankProductTableProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                    <BankProductSearch />
                </div>
                <Link
                    href="/owner/bankproducts/new"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add New Product
                </Link>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1100px] lg:min-w-0">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Product Details</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Bank</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Segment</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Loan Range</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center">Priority</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Status</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {bankProducts.length > 0 ? (
                                bankProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-teal-soft text-teal flex items-center justify-center font-bold text-xs border border-teal/20">
                                                    {product.loanTypeName.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">{product.productName}</p>
                                                    <p className="text-[9px] sm:text-[10px] text-text-muted mt-0.5">{product.loanTypeName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <p className="text-xs font-bold text-foreground">{product.bankName}</p>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${product.customerSegment === 'salaried'
                                                    ? 'bg-blue-soft text-blue border-blue/10'
                                                    : product.customerSegment === 'self-employed'
                                                        ? 'bg-purple-soft text-purple border-purple/10'
                                                        : 'bg-orange-soft text-orange border-orange/10'
                                                }`}>
                                                {segmentLabels[product.customerSegment]}
                                            </span>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-bold text-foreground">
                                                    {formatCurrency(product.minLoanAmount)} - {formatCurrency(product.maxLoanAmount)}
                                                </p>
                                                <p className="text-[9px] text-text-muted">
                                                    {product.minTenure}-{product.maxTenure} months
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-sm font-bold text-foreground">{product.priorityScore}</span>
                                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${product.priorityScore >= 90 ? 'bg-green' :
                                                                product.priorityScore >= 75 ? 'bg-teal' :
                                                                    product.priorityScore >= 50 ? 'bg-orange' : 'bg-red'
                                                            }`}
                                                        style={{ width: `${product.priorityScore}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${product.status === 'active' ? 'bg-green' : 'bg-red'}`} />
                                                <span className={`text-xs font-bold ${product.status === 'active' ? 'text-green' : 'text-red'}`}>
                                                    {product.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-right">
                                            <BankProductActions id={product.id} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-text-muted italic">
                                        No bank products found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
