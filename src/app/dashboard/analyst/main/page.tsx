'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { StatTabs } from '@/features/dashboard/components/StatTabs';
import { AnalystMainGrid } from '@/features/dashboard/components/AnalystMainGrid';
import { getCoordinatorCases, CoordinatorCase, coordinatorStats } from '@/features/dashboard/components/api/agent.api';

const statusMap: Record<string, string> = {
    new: 'submitted_to_coordinator',
    pending: 'pending_acceptance',
    accepted: 'under_review',
    bank: 'submitted_to_bank',
    approved: 'approved',
    rejected: 'rejected',
};

function AnalystDashboardContent() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'new';
    const page = Number(searchParams.get('page')) || 1;
    const limit = 5;

    const [cases, setCases] = useState<CoordinatorCase[]>([]);
    const [totalCases, setTotalCases] = useState(0);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    const fetchStats = useCallback(async () => {
        const stats = await coordinatorStats();
        setStats(stats);
    }, []);

    useEffect(() => {
        fetchStats();
    }, []);

    // Fetch cases for the active tab
    const fetchCases = useCallback(async () => {
        setLoading(true);
        try {
            const status = statusMap[activeTab];
            const res = await getCoordinatorCases(page, limit, undefined, status);
            setCases(res.items);
            setTotalCases(res.total);
        } catch (err) {
            console.error('Failed to fetch cases:', err);
            setCases([]);
            setTotalCases(0);
        } finally {
            setLoading(false);
        }
    }, [activeTab, page, limit]);

    useEffect(() => {
        fetchCases();
    }, [fetchCases]);

    // Map API cases to the shape CaseCard / AnalystMainGrid expects
    const mappedCases = cases.map((c) => {
        const formattedStatus = c.status.replaceAll('_', ' ');
        let step = 1;
        const s = c.status.toLowerCase();
        if (s === 'submitted_to_coordinator' || s === 'ready_for_coordinator' || s === 'physical_docs_received') step = 2;
        else if (s === 'under_review') step = 3;
        else if (s === 'submitted_to_bank') step = 4;
        else if (s === 'approved') step = 5;
        else if (s === 'rejected') step = 6;

        return {
            id: String(c.id),
            name: c.customer_name,
            mobile: c.mobile_number,
            email: c.email,
            emiratesId: c.emirates_id || '-',
            employer: c.company_name || '-',
            salary: `${c.salary?.toLocaleString() || 0} AED`,
            product: c.product?.product_name || '-',
            bank: c.bank?.name || undefined,
            amount: `${c.requested_amount?.toLocaleString() || 0} AED`,
            date: c.created_at ? new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-',
            status: formattedStatus,
            step,
            // pass original data for detail view
            documents: c.documents,
            notes: c.notes,
            passport_no: c.passport_no,
            telecaller_id: c.telecaller_id,
        };
    });
    const analystTabs = [
        { id: 'new', title: `New Cases`, value: stats?.newCases, color: 'blue' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg> },
        { id: 'pending', title: `Pending Acceptance`, value: stats?.pending, color: 'orange' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
        { id: 'accepted', title: `Accepted & Under Review`, value: stats?.accepted, color: 'purple' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="10" cy="14" r="2" /><path d="m14 18-2.5-2.5" /></svg> },
        { id: 'bank', title: `Submitted to Bank`, value: stats?.atBank, color: 'teal' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> },
        { id: 'approved', title: `Approved`, value: stats?.approved, color: 'green' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg> },
        { id: 'rejected', title: `Rejected`, value: stats?.rejected, color: 'red' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg> },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
                {stats ? (
                    <StatTabs
                        tabs={analystTabs}
                        activeTab={activeTab}
                        baseUrl="/dashboard/analyst/main"
                        gridCols="grid-cols-1 sm:grid-cols-3 xl:grid-cols-6"
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-28 bg-card border border-border rounded-2xl animate-pulse" />
                        ))}
                    </div>
                )}

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-40 bg-card border border-border rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <AnalystMainGrid
                        cases={mappedCases}
                        onStatusUpdate={() => { fetchCases(); }}
                        page={page}
                        totalCases={totalCases}
                        limit={limit}
                    />
                )}

                {/* How It Works Section */}
                <section className="section-card bg-card border-border border shadow-sm rounded-2xl p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-foreground uppercase tracking-widest">Analyst Workflow</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { step: 1, label: 'Accept Case', desc: 'Review and accept new cases', color: 'bg-blue-soft border-blue/10 text-blue' },
                            { step: 2, label: 'Check Documents', desc: 'Verify all physical documents', color: 'bg-purple-soft border-purple/10 text-purple' },
                            { step: 3, label: 'Analyze Credit', desc: 'Review credit worthiness', color: 'bg-blue-soft border-blue/10 text-blue' },
                            { step: 4, label: 'Submit to Bank', desc: 'Send to preferred bank', color: 'bg-teal-soft border-teal/10 text-teal' },
                            { step: 5, label: 'Update Status', desc: 'Finalize based on bank response', color: 'bg-green-soft border-green/10 text-green' },
                        ].map((s) => (
                            <div key={s.step} className={`p-4 rounded-xl border transition-all hover:shadow-md ${s.color} dark:bg-card/40 dark:border-border/50`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-4 bg-background/80 dark:bg-muted shadow-sm border border-inherit`}>
                                    {s.step}
                                </div>
                                <h4 className="text-sm font-bold whitespace-nowrap">{s.label}</h4>
                                <p className="text-[10px] opacity-80 mt-1 font-medium leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
        </div>
    );
}

export default function AnalystDashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-32">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-brand/30 border-t-brand rounded-full animate-spin" />
                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest">Loading...</p>
                </div>
            </div>
        }>
            <AnalystDashboardContent />
        </Suspense>
    );
}
