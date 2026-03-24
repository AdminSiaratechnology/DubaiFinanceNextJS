'use client'
import { useCallback, useEffect, useState } from 'react';
import { agentDashboardApi, AgentDashboard } from '@/features/owner/api/dashboard.api';

const LIMIT = 10;

export function AgentsTab() {
    const [data, setData] = useState<AgentDashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const fetchData = useCallback(async (p: number, q: string) => {
        setLoading(true);
        try {
            const res = await agentDashboardApi(p, LIMIT, q || undefined);
            console.log(res)
            // ✅ correct mapping
            setData(res.data);
            setTotal(res.total);
        } catch (error) {
            console.error("Failed to fetch agent dashboard:", error);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchData(1, "");
    }, [fetchData, page]);
    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className="bg-card border border-foreground/30 rounded-2xl shadow-sm shadow-foreground/30 overflow-hidden animate-in fade-in duration-300">

            {/* Header */}
            <div className="p-5 border-b border-border">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    Agent Performance Dashboard
                </h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[800px]">

                    <thead>
                        <tr className="border-b border-border bg-muted/20">
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Rank</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Agent</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Leads</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Cases</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Approved</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Approval %</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Revenue</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Commission</th>
                            <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Paid</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={9} className="text-center py-6">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-6">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            data.map((row, i) => (
                                <tr key={row.agent_id} className="border-b border-border hover:bg-muted/20">

                                    {/* Rank */}
                                    <td className="px-4 py-3">
                                        {i === 0 ? '🥇' : i === 1 ? '🥈' : `#${i + 1}`}
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {row.agent_name}
                                    </td>

                                    <td className="px-4 py-3">{row.total_leads}</td>
                                    <td className="px-4 py-3">{row.total_cases}</td>
                                    <td className="px-4 py-3">{row.approved_cases}</td>

                                    <td className="px-4 py-3">
                                        {row.approval_ratio.toFixed(1)}%
                                    </td>

                                    <td className="px-4 py-3">
                                        AED {row.total_revenue.toLocaleString()}
                                    </td>

                                    <td className="px-4 py-3 text-orange-500 font-bold">
                                        AED {row.total_commission.toLocaleString()}
                                    </td>

                                    <td className="px-4 py-3 text-green-500 font-bold">
                                        AED {row.paid_commission.toLocaleString()}
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-muted/10 flex-wrap gap-3">
                    <p className="text-xs text-text-muted font-medium">
                        Page {page} of {totalPages} &mdash; {total} cases
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition">
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button key={p} onClick={() => setPage(p)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${p === page ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-muted'}`}>
                                {p}
                            </button>
                        ))}
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition">
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}