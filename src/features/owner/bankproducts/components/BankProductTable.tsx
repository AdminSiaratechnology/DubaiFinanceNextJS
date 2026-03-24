import React from 'react';
import Link from 'next/link';
import { BankProduct } from '../api/bankproducts.api';
import { BankProductActions } from './BankProductActions';
import { BankProductSearch } from './BankProductSearch';
import { Pagination } from '@/components/ui/Pagination';
interface BankProductTableProps {
    bankProducts: BankProduct[];
    page: number;
    total: number;
    limit: number;
}

const segmentLabels: Record<string, string> = {
    Salaried: 'Salaried',
    'Self-employed': 'Self-employed',
    SME: 'SME',
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

export function BankProductTable({ bankProducts, page, total, limit }: BankProductTableProps) {
    return (
        <>
            <div className="space-y-6 bg-card p-4 sm:p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div className="w-full sm:w-auto">
                        <BankProductSearch showFilter={true} />
                    </div>
                    <Link
                        href="/owner/bankproducts/new"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        Add New Product
                    </Link>
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1100px] lg:min-w-0">
                            <thead>
                                <tr className="bg-foreground/10 border-b border-border">
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">S.No</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">Product Details</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">Bank</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">Segment</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">Loan Range</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest text-center">Priority</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest text-right">Status</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {bankProducts.length > 0 ? (
                                    bankProducts.map((product, index) => (
                                        <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="p-3 sm:p-4">
                                                <p className="text-[14px] font-bold text-adaptive">
                                                    {((page || 1) - 1) * (limit || 10) + index + 1}
                                                </p>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div>
                                                    <p className="text-sm sm:text-sm font-medium text-adaptive leading-tight">{product.product_name}</p>
                                                    <p className="text-[9px] sm:text-[10px] text-text-muted mt-0.5">{product.loan_type?.name}</p>
                                                </div>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <p className="text-sm sm:text-sm font-medium text-adaptive">{product.bank?.name}</p>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-sm font-bold border ${product.customer_segment?.toLowerCase() === 'salaried'
                                                    ? 'bg-foreground/10 text-foreground border-foreground/10'
                                                    : product.customer_segment?.toLowerCase() === 'self-employed'
                                                        ? 'bg-foreground/10 text-foreground border-foreground/10'
                                                        : 'bg-foreground/10 text-foreground border-foreground/10'
                                                    }`}>
                                                    {segmentLabels[product.customer_segment] || product.customer_segment}
                                                </span>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div className="space-y-0.5">
                                                    <p className="text-sm sm:text-sm font-medium text-adaptive">
                                                        {formatCurrency(product.min_loan_amount)} - {formatCurrency(product.max_loan_amount)}
                                                    </p>
                                                    <p className="text-[10px] text-text-muted">
                                                        {product.min_tenure}-{product.max_tenure} months
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-3 sm:p-4 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-sm font-bold text-foreground">{product.priority_score}</span>
                                                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${product.priority_score >= 90 ? 'bg-green' :
                                                                product.priority_score >= 75 ? 'bg-foreground' :
                                                                    product.priority_score >= 50 ? 'bg-foreground' : 'bg-red'
                                                                }`}
                                                            style={{ width: `${product.priority_score}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${product.status === 'active' ? 'bg-green' : 'bg-red'}`} />
                                                    <span className={`text-sm font-bold ${product.status === 'active' ? 'text-green' : 'text-red'}`}>
                                                        {product.status === 'active' ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-3 sm:p-4 text-right">
                                                <BankProductActions id={Number(product.id)} />
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
            <Pagination page={page} total={total} limit={limit} />
        </>
    );
}
