import React from 'react';
import { agentStats, agentCases } from '@/lib/mock/agent';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { TabSwitcher } from '@/features/dashboard/components/TabSwitcher';
import { CaseCard } from '@/features/dashboard/components/CaseCard';
import { CommissionCalculator } from '@/features/dashboard/components/CommissionCalculator';
import { SubmitLead } from '@/features/dashboard/components/SubmitLead';
import { SubmitCase } from '@/features/dashboard/components/SubmitCase';
import { SearchBar } from '@/shared/SearchBar';

const agentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg> },
    { id: 'calculator', label: 'Commission Calculator', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="8" x2="16" y1="10" y2="10" /><line x1="10" x2="10" y1="14" y2="18" /><line x1="8" x2="12" y1="16" y2="16" /><line x1="14" x2="14" y1="14" y2="18" /><line x1="16" x2="16" y1="16" y2="16" /></svg> },
    { id: 'submit-lead', label: 'Submit Lead', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> },
    { id: 'submit-case', label: 'Submit Case', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg> },
    { id: 'my-cases', label: 'My Cases', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg> },
];

export default async function AgentDashboardPage({
    searchParams
}: {
    searchParams: Promise<{ tab?: string; caseId?: string }>
}) {
    const params = await searchParams;
    const activeTab = params.tab || 'dashboard';

    return (
        <main className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Nav Tabs - Interactivity contained here */}
            <TabSwitcher
                tabs={agentTabs}
                activeTab={activeTab}
                baseUrl="/dashboard/agent/main"
            />

            {activeTab === 'dashboard' ? (
                <>
                    {/* StatCards: Server Rendered */}
                    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Cases"
                            value={agentStats.totalCases}
                            color="blue"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>}
                        />
                        <StatCard
                            title="Approved"
                            value={agentStats.approved}
                            color="green"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></svg>}
                        />
                        <StatCard
                            title="Expected (AED)"
                            value={agentStats.expectedAED}
                            color="purple"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>}
                        />
                        <StatCard
                            title="Earned (AED)"
                            value={agentStats.earnedAED}
                            color="teal"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>}
                        />
                    </section>

                    {/* CaseCards: Server Rendered */}
                    <section className="section-card bg-card border-border border shadow-sm rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h3 className="text-lg font-bold text-foreground">Recent Cases</h3>
                            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                        </div>
                        <div className="p-6 space-y-8">
                            {agentCases.map((c) => (
                                <CaseCard key={c.id} {...c} />
                            ))}
                        </div>
                    </section>
                </>
            ) : activeTab === 'calculator' ? (
                <CommissionCalculator />
            ) : activeTab === 'submit-lead' ? (
                <SubmitLead />
            ) : activeTab === 'submit-case' ? (
                <SubmitCase />
            ) : activeTab === 'my-cases' ? (
                <>
                    <div className="px-6 pt-4">
                        <SearchBar
                            placeholder="Search by Case No, Name, Mobile..."
                            syncWithUrl
                            paramKey="q"
                            preserveParams={['tab']} // VERY IMPORTANT for your tab system
                            debounce={300}
                        />
                    </div>
                    <div className="px-6 space-y-6">
                        {agentCases.map((c) => (
                            <CaseCard key={c.id} {...c} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-text-muted italic bg-card border border-border rounded-2xl">
                    <p>{agentTabs.find(t => t.id === activeTab)?.label} section is coming soon...</p>
                </div>
            )}
        </main>
    );
}
