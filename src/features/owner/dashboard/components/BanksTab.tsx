'use client'
import { useCallback, useEffect, useState } from 'react';
import { BankDashboard, bankDashboardApi } from '@/features/owner/api/dashboard.api';

const mockData = [
    { name: 'Emirates NBD', submitted: 2, approval: 50.0, pending: 1, tat: '6 days', revenue: 570, risk: 'green' },
    { name: 'ADCB', submitted: 3, approval: 33.3, pending: 2, tat: '6 days', revenue: 2475, risk: 'red' },
    { name: 'FAB', submitted: 2, approval: 50.0, pending: 1, tat: '6 days', revenue: 12000, risk: 'green' },
    { name: 'DIB', submitted: 1, approval: 0.0, pending: 0, tat: '6 days', revenue: 0, risk: 'red' },
    { name: 'Mashreq', submitted: 2, approval: 50.0, pending: 1, tat: '6 days', revenue: 1770, risk: 'green' },
    { name: 'RAK Bank', submitted: 1, approval: 0.0, pending: 0, tat: '6 days', revenue: 0, risk: 'red' },
];

export function BanksTab() {
    const [data, setData] = useState<BankDashboard[]>([]);
        const [loading, setLoading] = useState(true);
        const [total, setTotal] = useState(0);
        const [page, setPage] = useState(1);

        const fetchBankDashboard = useCallback(async () => {
            setLoading(true);
            try {
                const res = await bankDashboardApi(page, 10);
                setData(res.data);
                setTotal(res.total);
            } catch (error) {
                console.error("Failed to fetch bank dashboard:", error);
            } finally {
                setLoading(false);
            }
        }, [page]);
        useEffect(() => {
            fetchBankDashboard();
        }, [fetchBankDashboard]);
        const totalPages = Math.ceil(total / 10);
    return (
        <div className="bg-card border border-foreground/30 rounded-2xl shadow-sm shadow-foreground/30 overflow-hidden animate-in fade-in duration-300 flex flex-col gap-4">
            <div>
                <div className="p-5 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        Bank / Financier Performance (Critical for UAE)
                    </h3>
                    <p className="text-sm text-text-muted mt-1">Who delivers, who delays, who rejects</p>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left min-w-[950px]">
                        <thead>
                            <tr className="border-b border-border bg-muted/20">
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Bank Name</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Cases Submitted</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Approval %</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Pending</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Avg TAT</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Revenue</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold text-center">Risk Flag</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {data.map((row, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-4 px-5 text-sm font-medium text-adaptive">{row.bank_name}</td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.total_cases}</td>
                                    <td className="py-4 px-5">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${row.approval_ratio >= 50 ? 'bg-orange-soft text-orange' : 'bg-red-soft text-red'}`}>
                                            {row.approval_ratio.toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.pending_cases}</td>
                                    <td className="py-4 px-5 text-sm font-medium text-adaptive">{row.avg_tat_days}</td>
                                    <td className="py-4 px-5 text-sm font-medium text-adaptive">AED {row.total_revenue.toLocaleString()}</td>
                                    <td className="py-4 px-5 flex justify-center">
                                        <div className={`w-4 h-4 rounded-full shadow-inner ${row.risk_flag === 'green' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="p-4 mx-5 mb-5 rounded-xl border border-orange/20 bg-orange/5 flex items-start gap-4">
                <div className="text-orange font-bold text-sm bg-orange/10 px-3 py-1.5 rounded-lg shrink-0">
                    Owner Insight:
                </div>
                <p className="text-sm font-medium text-orange/90 mt-1">
                    Banks with approval rates below 50% should be reviewed. Consider reallocating cases to high-performing banks.
                </p>
            </div>
        </div>
    );
}
