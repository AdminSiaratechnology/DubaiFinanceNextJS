import React, { Suspense } from 'react';
import Link from 'next/link';
import { Commission } from '../api/commission.api';
import { CommissionSearch } from './CommissionSearch';
import { CommissionActions } from './CommissionActions';
import { Pagination } from '@/components/ui/Pagination';

interface CommissionTableProps {
    rules: Commission[];
    page: number;
    total: number;
    limit: number;
}

export function CommissionTable({ rules, page, total, limit }: CommissionTableProps) {
    return (
        <>
            <div className="space-y-6 bg-white p-4 sm:p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                    <Suspense fallback={<div className="h-10 w-80 bg-muted/30 rounded-xl animate-pulse" />}>
                        <CommissionSearch />
                    </Suspense>
                </div>

                <Link
                    href="/owner/commission/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="M12 5v14" />
                    </svg>
                    Add Commission Rule
                </Link>
            </div>

            {/* Table Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1100px] lg:min-w-0">
                        <thead>
                            <tr className="bg-foreground/10 border-b border-border">
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">S.No</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Bank</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Product</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Commission</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Shares (%)</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Effective From</th>
                                <th className="p-3 sm:p-4 text-right text-[14px] font-bold text-black uppercase tracking-widest">Status</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {rules.length > 0 ? (
                                rules.map((rule,index) => (
                                    <tr key={rule.id} className="hover:bg-muted/30 transition-colors group">
                                        {/* ID */}
                                        <td className="p-3 sm:p-4">
                                            <p className="text-[14px] font-bold text-black">
                                                {((page || 1) - 1) * (limit || 10) + index + 1}
                                            </p>
                                        </td>

                                        {/* Bank */}
                                        <td className="p-3 sm:p-4">
                                            <div>
                                                <p className="text-sm sm:text-sm font-medium text-black">{rule.bank?.name ?? '-'}</p>
                                            </div>
                                        </td>

                                        {/* Product */}
                                        <td className="p-3 sm:p-4">
                                            <p className="text-sm sm:text-sm font-medium text-black">
                                                {rule.product?.product_name ?? '-'}
                                            </p>
                                        </td>

                                        {/* Commission */}
                                        <td className="p-3 sm:p-4">
                                            <div className="flex flex-col">
                                                <span className="text-[14px] font-bold text-black">
                                                    {rule.commission_type === 'flat'
                                                        ? `AED ${rule.commission_value}`
                                                        : `${rule.commission_value}%`}
                                                </span>
                                                <span className="text-[11px] text-text-muted">
                                                    {rule.commission_type === 'flat' ? 'Flat Commission' : 'Percentage Commission'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Shares */}
                                        <td className="p-3 sm:p-4">
                                            <div className="flex flex-col text-[12px] font-semibold text-black gap-0.5">
                                                <span>Agent: {rule.agent_share}%</span>
                                                <span>Telecaller: {rule.telecaller_share}%</span>
                                                <span>Coordinator: {rule.coordinator_share}%</span>
                                            </div>
                                        </td>

                                        {/* Effective Date */}
                                        <td className="p-3 sm:p-4">
                                            <span className="text-sm sm:text-sm font-medium text-black">
                                                {rule.effective_from_date || '-'}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="p-3 sm:p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className={`w-2 h-2 rounded-full ${rule.status === 'active' ? 'bg-green' : 'bg-red'}`} />
                                                <span className={`text-lg font-bold ${rule.status === 'active' ? 'text-green' : 'text-red'}`}>
                                                    {rule.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3 sm:p-4 text-right">
                                            <CommissionActions id={rule.id} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="p-12 text-center text-text-muted italic">
                                        No commission rules found.
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
