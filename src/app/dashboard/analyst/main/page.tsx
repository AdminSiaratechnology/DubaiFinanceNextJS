import React from 'react';
import { analystStats, analystCases } from '@/lib/mock/analyst';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { StatTabs } from '@/features/dashboard/components/StatTabs';
import { AnalystMainGrid } from '@/features/dashboard/components/AnalystMainGrid';

const analystTabs = [
    { id: 'new', title: `New Cases`, value: analystStats.newCases, color: 'blue' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg> },
    { id: 'pending', title: `Pending Acceptance`, value: analystStats.pending, color: 'orange' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> },
    { id: 'accepted', title: `Accepted & Under Review`, value: analystStats.accepted, color: 'purple' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="10" cy="14" r="2" /><path d="m14 18-2.5-2.5" /></svg> },
    { id: 'bank', title: `Submitted to Bank`, value: analystStats.atBank, color: 'teal' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> },
    { id: 'approved', title: `Approved`, value: analystStats.approved, color: 'green' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg> },
    { id: 'rejected', title: `Rejected`, value: analystStats.rejected, color: 'red' as const, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg> },
];

export default async function AnalystDashboardPage({
    searchParams
}: {
    searchParams: Promise<{ tab?: string; caseId?: string }>
}) {
    const params = await searchParams;
    const activeTab = params.tab || 'new';

    const filteredCases = analystCases.filter(c => {
        if (activeTab === 'new') return c.status === 'New';
        if (activeTab === 'pending') return c.status === 'Pending Acceptance';
        if (activeTab === 'accepted') return c.status === 'Under Review';
        if (activeTab === 'bank') return c.status === 'Submitted to Bank';
        if (activeTab === 'approved') return c.status === 'Approved';
        if (activeTab === 'rejected') return c.status === 'Rejected';
        return true;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <StatTabs
                tabs={analystTabs}
                activeTab={activeTab}
                baseUrl="/dashboard/analyst/main"
                gridCols="grid-cols-1 sm:grid-cols-3 xl:grid-cols-6"
            />

            <AnalystMainGrid cases={filteredCases} />

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
