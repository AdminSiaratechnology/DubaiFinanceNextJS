'use client'
import { useCallback, useEffect, useState } from 'react';
import { TelecallerDashboard, AnalystDashboard, telecallerDashboardApi, analystDashboardApi } from '@/features/owner/api/dashboard.api';
const telecallerData = [
    { name: 'Mohammed Hassan', assigned: 0, contacted: 87, conversion: 23 },
    { name: 'Aisha Khalid', assigned: 0, contacted: 87, conversion: 23 },
    { name: 'Ravi Patel', assigned: 0, contacted: 87, conversion: 23 },
    { name: 'Layla Ahmed', assigned: 0, contacted: 87, conversion: 23 },
    { name: 'Carlos Rodriguez', assigned: 0, contacted: 87, conversion: 23 },
    { name: 'Nadia Ibrahim', assigned: 0, contacted: 87, conversion: 23 },
];

const analystData = [
    { name: 'Fatima Al Ali', active: 4, analysis: '2.3 days', approval: 68, breaches: 2 },
    { name: 'Khalid Rahman', active: 4, analysis: '2.3 days', approval: 68, breaches: 2 },
    { name: 'Samira Malik', active: 4, analysis: '2.3 days', approval: 68, breaches: 2 },
    { name: 'Omar Yusuf', active: 4, analysis: '2.3 days', approval: 68, breaches: 2 },
    { name: 'Hala Mohammed', active: 4, analysis: '2.3 days', approval: 68, breaches: 2 },
    { name: 'Ali Rashid', active: 3, analysis: '2.3 days', approval: 68, breaches: 2 },
];

const LIMIT = 10;

export function TeamTab() {
    const [telecallerData, setTelecallerData] = useState<TelecallerDashboard[]>([]);
    const [analystData, setAnalystData] = useState<AnalystDashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const fetchTelecallerData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await telecallerDashboardApi(page, LIMIT);
            setTelecallerData(data.data);
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching telecaller data:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    const fetchAnalystData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await analystDashboardApi(page, LIMIT);
            setAnalystData(data.data);
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching analyst data:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchTelecallerData();
        fetchAnalystData();
    }, [fetchTelecallerData, fetchAnalystData, page]);
    
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Telecaller Performance */}
            <div className="bg-card border border-foreground/30 rounded-2xl shadow-sm shadow-foreground/30 overflow-hidden">
                <div className="p-5 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Sales Team / Telecaller Performance
                    </h3>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="border-b border-border bg-muted/20">
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Name</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Leads Assigned</th>
                                {/* <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Contacted %</th> */}
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Conversion Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {telecallerData.map((row, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-4 px-5 text-sm font-medium text-adaptive">{row.name}</td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.leads_assigned}</td>
                                    {/* <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-blue">{row.contacted}%</span>
                                    </td> */}
                                    <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-green">{row.conversion_rate}%</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Analyst Performance */}
            <div className="bg-card border border-foreground/30 rounded-2xl shadow-sm shadow-foreground/30 overflow-hidden">
                <div className="p-5 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                        Case Analyst Performance
                    </h3>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="border-b border-border bg-muted/20">
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Name</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Active Cases</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Avg Analysis Time</th>
                                <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Approval Ratio</th>
                                {/* <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">SLA Breaches</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {analystData.map((row, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                    <td className="py-4 px-5 text-sm font-medium text-adaptive">{row.name}</td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.active_cases}</td>
                                    <td className="py-4 px-5 text-sm text-adaptive">{row.avg_analysis_time_days}</td>
                                    <td className="py-4 px-5">
                                        <span className="text-sm font-bold text-green">{row.approval_ratio}%</span>
                                    </td>
                                    <td className="py-4 px-5">
                                        {/* <span className="text-sm font-bold text-red bg-red-soft px-3 py-1 rounded-full">{row.breaches}</span> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
