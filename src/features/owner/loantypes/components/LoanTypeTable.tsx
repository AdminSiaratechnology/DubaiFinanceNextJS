import React from 'react';
import Link from 'next/link';
import { LoanType } from '@/lib/mock/loanTypes';
import { LoanTypeActions } from './LoanTypeActions';
import { LoanTypeSearch } from './LoanTypeSearch';

interface LoanTypeTableProps {
    loanTypes: LoanType[];
}

export function LoanTypeTable({ loanTypes }: LoanTypeTableProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                    <LoanTypeSearch />
                </div>
                <Link
                    href="/owner/loanTypes/new"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add New Loan Type
                </Link>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-0">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Loan Type Name</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Description</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Status</th>
                                <th className="p-3 sm:p-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loanTypes.length > 0 ? (
                                loanTypes.map((loanType) => (
                                    <tr key={loanType.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-soft text-purple flex items-center justify-center font-bold text-xs border border-purple/20">
                                                    {loanType.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">{loanType.name}</p>
                                                    <p className="text-[9px] sm:text-[10px] text-text-muted mt-0.5">Added: {loanType.createdDate}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <p className="text-xs text-foreground line-clamp-2 max-w-md">
                                                {loanType.description}
                                            </p>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${loanType.status === 'active' ? 'bg-green' : 'bg-red'}`} />
                                                <span className={`text-xs font-bold ${loanType.status === 'active' ? 'text-green' : 'text-red'}`}>
                                                    {loanType.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-right">
                                            <LoanTypeActions id={loanType.id} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-text-muted italic">
                                        No loan types found matching your search.
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
