import React from 'react';
import Link from 'next/link';
import { Bank } from '../api/bank.api';
import { BankActions } from './BankActions';
import { BankSearch } from './BankSearch';
import { Pagination } from '@/components/ui/Pagination';
interface BankTableProps {
    banks: Bank[];
    page?: number;
    total?: number;
    limit?: number;
}

export function BankTable({ banks, page, total, limit }: BankTableProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                    <BankSearch showFilter />
                </div>
                <Link
                    href="/owner/bank/new"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add New Bank
                </Link>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[900px] lg:min-w-0">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">S.No</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Bank Name</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Category</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Loan Types</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-center">TAT</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Status</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {banks.length > 0 ? (
                                banks.map((bank, index) => (
                                    <tr key={bank.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="p-3 sm:p-4">
                                            <p className="text-xs font-bold text-foreground">
                                                {((page || 1) - 1) * (limit || 10) + index + 1}
                                            </p>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold text-xs border border-brand/20">
                                                    {bank.logo_url ? <img src={bank.logo_url} alt={bank.name} className="w-full h-full object-cover" /> : bank.short_code}
                                                </div>
                                                <div>
                                                    <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">{bank.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <p>{bank.category?.name}</p>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {bank.loan_types?.slice(0, 2).map((lt) => (
                                                    <span
                                                        key={lt.id}
                                                        className="px-2 py-0.5 bg-orange-soft text-orange rounded text-[9px] font-bold border border-orange/10"
                                                    >
                                                        {lt.name}
                                                    </span>
                                                ))}
                                                {(bank.loan_types?.length || 0) > 2 && (
                                                    <span className="px-2 py-0.5 bg-muted text-text-muted rounded text-[9px] font-bold">
                                                        +{(bank.loan_types?.length || 0) - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-center">
                                            <span className="px-3 py-1 bg-teal-soft text-teal rounded-lg text-[10px] font-bold border border-teal/10">
                                                {bank.default_tat_days} days
                                            </span>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${bank.status === 'active' ? 'bg-green' : 'bg-red'}`} />
                                                <span className={`text-xs font-bold ${bank.status === 'active' ? 'text-green' : 'text-red'}`}>
                                                    {bank.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-right">
                                            <BankActions id={String(bank.id)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-text-muted italic">
                                        No banks found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination page={page || 1} total={total || 0} limit={limit || 10} />
        </div>
    );
}
