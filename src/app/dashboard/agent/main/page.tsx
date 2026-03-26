'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { TabSwitcher } from '@/features/dashboard/components/TabSwitcher';
import { CaseCard } from '@/features/dashboard/components/CaseCard';
import { CommissionCalculator } from '@/features/dashboard/components/CommissionCalculator';
import { SubmitLead } from '@/features/dashboard/components/SubmitLead';
import { SubmitCase } from '@/features/dashboard/components/SubmitCase';
import { SearchBar } from '@/shared/SearchBar';
import { AgentLeadsCard } from '@/features/dashboard/components/AgentLeadsCard';
import { getLeads, getMyCases, Lead, Case } from '@/features/dashboard/components/api/agent.api';
import { Pagination } from '@/components/ui/Pagination';
import { AgentStats } from '@/features/dashboard/components/AgentStats';
import { useSearchParams } from 'next/navigation';

const agentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg> },
    { id: 'calculator', label: 'Commission Calculator', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="8" x2="16" y1="10" y2="10" /><line x1="10" x2="10" y1="14" y2="18" /><line x1="8" x2="12" y1="16" y2="16" /><line x1="14" x2="14" y1="14" y2="18" /><line x1="16" x2="16" y1="16" y2="16" /></svg> },
    { id: 'submit-lead', label: 'Submit Lead', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> },
    { id: 'submit-case', label: 'Submit Case', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg> }
];

function AgentDashboardContent() {
    const params = useSearchParams();
    const activeTab = params.get('tab') || 'dashboard';
    const viewType = params.get('view') || 'cases';
    const searchQuery = params.get('q') || '';
    const page = Number(params.get('page')) || 1;
    const limit = 5;

    const [leads, setLeads] = useState<Lead[]>([]);
    const [cases, setCases] = useState<Case[]>([]);
    const [totalCases, setTotalCases] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const skip = (page - 1) * limit;
                if (viewType === 'cases') {
                    const casesData = await getMyCases(page, limit, searchQuery);
                    setCases(casesData?.items || []);
                    setTotalCases(casesData?.total || 0);
                } else {
                    const leadsData = await getLeads(skip, limit, searchQuery);
                    setLeads(leadsData || []);
                }
            } catch (err) {
                console.error("Agent Dashboard Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [viewType, page, searchQuery]);

    const totalLeads = leads.length >= limit ? (page * limit) + 1 : (page - 1) * limit + leads.length;

    return (
        <main className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
            <div className="flex flex-col gap-6">
                <TabSwitcher
                    tabs={agentTabs}
                    activeTab={activeTab}
                    baseUrl="/dashboard/agent/main"
                />
            </div>

            {activeTab === 'dashboard' ? (
                <div className="space-y-8">
                    <AgentStats />

                    <section className="section-card bg-card border-border border shadow-soft rounded-[24px] overflow-hidden transition-all duration-300">
                        {/* Control Bar */}
                        <div className="px-6 py-5 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-muted/5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Activity Overview</h2>
                                <p className="text-[13px] font-medium text-muted-foreground">Manage and track your active pipeline</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {/* Segmented Control */}
                                <div className="flex bg-muted/50 p-1.5 rounded-2xl border border-border/50 backdrop-blur-sm self-start sm:self-auto">
                                    <Link
                                        href={`/dashboard/agent/main?tab=dashboard&view=cases${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                                        className={`
                                            px-6 py-2 text-[13px] font-bold rounded-xl transition-all duration-300 flex items-center gap-2
                                            ${viewType === 'cases'
                                                ? 'bg-card text-foreground shadow-soft ring-1 ring-black/5'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                            }
                                        `}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                                        My Cases
                                    </Link>
                                    <Link
                                        href={`/dashboard/agent/main?tab=dashboard&view=leads${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                                        className={`
                                            px-6 py-2 text-[13px] font-bold rounded-xl transition-all duration-300 flex items-center gap-2
                                            ${viewType === 'leads'
                                                ? 'bg-card text-foreground shadow-soft ring-1 ring-black/5'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                            }
                                        `}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                                        My Leads
                                    </Link>
                                </div>

                                <div className="w-full sm:w-72 lg:w-80">
                                    <SearchBar
                                        placeholder={`Search ${viewType === 'cases' ? 'Cases' : 'Leads'}...`}
                                        syncWithUrl
                                        paramKey="q"
                                        preserveParams={['tab', 'view']}
                                        debounce={300}
                                        className="h-11 rounded-2xl!"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* List Content */}
                        <div className="p-6 md:p-8 space-y-6 bg-transparent">
                            {loading ? (
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-44 bg-muted/30 border border-border/50 rounded-2xl animate-pulse" />
                                    ))}
                                </div>
                            ) : viewType === 'cases' ? (
                                <div className="space-y-5">
                                    {cases.length > 0 ? (
                                        cases.map((c) => (
                                            <div key={c.id} className="transition-all duration-300 hover:translate-y-[-2px]">
                                                <CaseCard
                                                    id={String(c.id)}
                                                    name={c.customer_name || 'N/A'}
                                                    mobile={c.mobile_number || 'N/A'}
                                                    email={c.email || 'N/A'}
                                                    emiratesId={c.emirates_id || 'N/A'}
                                                    employer={c.employer || c.company_name || 'N/A'}
                                                    salary={c.salary ? String(c.salary) : '0'}
                                                    product={c.product?.product_name || c.product_type || 'N/A'}
                                                    productId={c.product?.id}
                                                    bank={c.bank?.name || 'N/A'}
                                                    bankId={c.bank?.id}
                                                    documents={c.documents}
                                                    amount={String(c.requested_amount || c.amount || 0)}
                                                    date={new Date(c.created_at || c.date || "").toLocaleDateString()}
                                                    commission={String(c.agent_commission ?? '0')}
                                                    status={c.status}
                                                    step={3}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/10">
                                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 opacity-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                                            </div>
                                            <h3 className="text-sm font-bold text-foreground">No cases found</h3>
                                            <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">We couldn't find any cases matching your current filters.</p>
                                        </div>
                                    )}

                                    {totalCases > limit && (
                                        <div className="pt-4 mt-8 border-t border-border">
                                            <Pagination page={page} total={totalCases} limit={limit} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {leads.length > 0 ? (
                                        leads.map((lead) => (
                                            <div key={lead.id} className="transition-all duration-300 hover:translate-y-[-2px]">
                                                <AgentLeadsCard
                                                    id={lead.id}
                                                    customer_name={lead.customer_name}
                                                    mobile_number={lead.mobile_number}
                                                    email={lead.email}
                                                    requested_amount={lead.requested_amount}
                                                    product_name={lead.product?.product_name || 'N/A'}
                                                    product_id={lead.product?.id}
                                                    bank_name={lead.bank?.name || 'N/A'}
                                                    bank_id={lead.bank?.id}
                                                    created_at={lead.created_at}
                                                    status={lead.case?.status}
                                                    isReturned={lead.is_returned}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-16 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/10">
                                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 opacity-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                                            </div>
                                            <h3 className="text-sm font-bold text-foreground">No leads found</h3>
                                            <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Your lead pipeline is currently empty. Submit a new lead to get started.</p>
                                        </div>
                                    )}

                                    {(leads.length === limit || page > 1) && (
                                        <div className="pt-4 mt-8 border-t border-border">
                                            <Pagination page={page} total={totalLeads} limit={limit} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            ) : activeTab === 'calculator' ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <CommissionCalculator />
                </div>
            ) : activeTab === 'submit-lead' ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <SubmitLead />
                </div>
            ) : activeTab === 'submit-case' ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <SubmitCase />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center bg-card border border-border border-dashed rounded-[32px] p-12">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 opacity-40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    </div>
                    <h3 className="text-xl font-black text-foreground">{agentTabs.find(t => t.id === activeTab)?.label}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-sm">This section is currently under development. Please check back later for updates.</p>
                </div>
            )}
        </main>
    );
}

export default function AgentDashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-32">
                <div className="w-10 h-10 border-4 border-brand/30 border-t-brand rounded-full animate-spin" />
            </div>
        }>
            <AgentDashboardContent />
        </Suspense>
    );
}
