'use client';

import React, { useEffect, useState } from 'react';
import { topProductsApi, TopProduct } from '@/features/owner/api/dashboard.api';

export function ProductsTab() {
    const [data, setData] = useState<TopProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        topProductsApi()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-card border border-foreground/30 rounded-2xl shadow-sm shadow-foreground/30 overflow-hidden animate-in fade-in duration-300">
            <div className="p-5 border-b border-border">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    Product-Wise Performance Analysis
                </h3>
                <p className="text-sm text-text-muted mt-1">Critical for resource allocation decisions</p>
            </div>

            <div className="overflow-x-auto no-scrollbar">
                {loading ? (
                    <div className="p-6 space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-10 bg-muted/40 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-text-muted text-sm font-medium gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 mb-2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                        No product data available
                    </div>
                ) : (
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="border-b border-border bg-muted/20">
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Product</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Leads</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Cases</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Approved</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Approval %</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Avg Ticket Size</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-4 px-5 text-sm font-semibold text-adaptive">{row.product_name}</td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.total_leads}</td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.total_cases}</td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.approved_cases}</td>
                                    <td className="py-4 px-5">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${row.approval_ratio >= 50 ? 'bg-green-soft text-green' : row.approval_ratio > 0 ? 'bg-orange-soft text-orange' : 'bg-muted text-text-muted'}`}>
                                            {(row.approval_ratio * 100).toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-sm font-medium text-adaptive">AED {Math.round(row.avg_ticket_size).toLocaleString()}</td>
                                    <td className="py-4 px-5 text-sm font-medium text-adaptive">AED {row.total_revenue.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
