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
        <>
            <div className="space-y-6 bg-card p-4 sm:p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div className="w-full sm:w-auto">
                        <BankSearch showFilter />
                    </div>
                    <Link
                        href="/owner/bank/new"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        Add New Bank
                    </Link>
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[900px] lg:min-w-0">
                            <thead>
                                <tr className="bg-foreground/10 border-b border-border">
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">S.No</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">Bank Name</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">Category</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest">Loan Types</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest text-center">TAT</th>
                                    <th className="p-3 sm:p-4 text-right text-[14px] font-bold text-adaptive uppercase tracking-widest">Status</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-adaptive uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {banks.length > 0 ? (
                                    banks.map((bank, index) => (
                                        <tr key={bank.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="p-3 sm:p-4">
                                                <p className="text-[14px] font-bold text-adaptive">
                                                    {((page || 1) - 1) * (limit || 10) + index + 1}
                                                </p>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div>
                                                    <p className="text-sm sm:text-sm font-medium text-adaptive leading-tight">{bank.name}</p>
                                                </div>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <p className="text-sm sm:text-sm font-medium text-adaptive">{bank.category?.name}</p>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {bank.loan_types?.slice(0, 2).map((lt) => (
                                                        <span
                                                            key={lt.id}
                                                            className="px-2 py-0.5 bg-foreground/10 text-foreground rounded text-sm font-bold border border-foreground/10"
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
                                                <span className="px-3 py-1 bg-foreground/10 text-foreground rounded-lg text-sm font-bold border border-foreground/10">
                                                    {bank.default_tat_days} days
                                                </span>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${bank.status === 'active' ? 'bg-green' : 'bg-red'}`} />
                                                    <span className={`text-sm font-bold ${bank.status === 'active' ? 'text-green' : 'text-red'}`}>
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
            </div>
            <Pagination page={page || 1} total={total || 0} limit={limit || 10} />
        </>
    );
}
