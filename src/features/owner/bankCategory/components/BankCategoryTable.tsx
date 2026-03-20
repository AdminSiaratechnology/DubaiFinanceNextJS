import React from 'react';
import Link from 'next/link';
import { BankCategory } from '@/features/owner/bankCategory/api/bankCategory.api';
import { BankCategoryActions } from './BankCategoryActions';
import { BankCategorySearch } from './BankCategorySearch';
import { Pagination } from '@/components/ui/Pagination';

interface BankCategoryTableProps {
    bankCategories: BankCategory[];
    page: number;
    total: number;
    limit: number;
}

export function BankCategoryTable({
    bankCategories,
    page,
    total,
    limit,
}: BankCategoryTableProps) {
    return (
        <>
            <div className="space-y-6 bg-white p-4 sm:p-6 rounded-2xl">
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div className="w-full sm:w-auto">
                        <BankCategorySearch showFilter />
                    </div>
                    <Link
                        href="/owner/bankCategory/new"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        Add New Category
                    </Link>
                </div>

                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-0">
                            <thead>
                                <tr className="bg-foreground/10 border-b border-border">
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">S.No</th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">
                                        Bank Category Name
                                    </th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">
                                        Description
                                    </th>
                                    <th className="p-3 sm:p-4 text-right text-[14px] font-bold text-black uppercase tracking-widest">
                                        Status
                                    </th>
                                    <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {bankCategories.length > 0 ? (
                                    bankCategories.map((bankCategory, index) => (
                                        <tr key={bankCategory.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="p-3 sm:p-4">
                                                <p className="text-[14px] font-bold text-black">
                                                    {((page || 1) - 1) * (limit || 10) + index + 1}
                                                </p>
                                            </td>
                                            <td className="p-3 sm:p-4">
                                                <div className="flex items-center gap-3">
                                                    {/* <div className="w-8 h-8 rounded-lg bg-foreground/10 text-foreground flex items-center justify-center font-bold text-xs border border-green/20">
                                                        {bankCategory.name.substring(0, 2).toUpperCase()}
                                                    </div> */}
                                                    <div>
                                                        <p className="text-sm sm:text-sm font-medium text-black leading-tight">
                                                            {bankCategory.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-3 sm:p-4">
                                                <p className="text-sm sm:text-sm text-black line-clamp-2 max-w-md">
                                                    {bankCategory.description}
                                                </p>
                                            </td>

                                            <td className="p-3 sm:p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${bankCategory.status === 'active' ? 'bg-green' : 'bg-red'
                                                            }`}
                                                    />
                                                    <span
                                                        className={`text-sm font-bold ${bankCategory.status === 'active'
                                                            ? 'text-green'
                                                            : 'text-red'
                                                            }`}
                                                    >
                                                        {bankCategory.status === 'active' ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-3 sm:p-4 text-right">
                                                <BankCategoryActions id={bankCategory.id} />
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

                {/* Reusable Pagination */}
            </div>
                <Pagination page={page} total={total} limit={limit} />
        </>
    );
}       