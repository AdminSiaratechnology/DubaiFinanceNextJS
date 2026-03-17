import Link from 'next/link';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { TabSwitcher } from '@/features/dashboard/components/TabSwitcher';
import { CaseCard } from '@/features/dashboard/components/CaseCard';
import { CommissionCalculator } from '@/features/dashboard/components/CommissionCalculator';
import { SubmitLead } from '@/features/dashboard/components/SubmitLead';
import { SubmitCase } from '@/features/dashboard/components/SubmitCase';
import { SearchBar } from '@/shared/SearchBar';
import { AgentLeadsCard } from '@/features/dashboard/components/AgentLeadsCard';
import { getLeads, getMyCases, agentStats } from '@/features/dashboard/components/api/agent.api';
import { Pagination } from '@/components/ui/Pagination';
const agentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg> },
    { id: 'calculator', label: 'Commission Calculator', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="8" x2="16" y1="10" y2="10" /><line x1="10" x2="10" y1="14" y2="18" /><line x1="8" x2="12" y1="16" y2="16" /><line x1="14" x2="14" y1="14" y2="18" /><line x1="16" x2="16" y1="16" y2="16" /></svg> },
    { id: 'submit-lead', label: 'Submit Lead', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> },
    { id: 'submit-case', label: 'Submit Case', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg> }
];


export default async function AgentDashboardPage({
    searchParams
}: {
    searchParams: Promise<{ tab?: string; caseId?: string; q?: string; view?: string; page?: string }>
}) {
    const params = await searchParams;
    const activeTab = params.tab || 'dashboard';
    const viewType = params.view || 'cases'; // 'cases' or 'leads'
    const searchQuery = params.q || '';
    const page = Number(params.page) || 1;
    const limit = 5;

    // fetch leads
    const skip = (page - 1) * limit;
    const leads = await getLeads(skip, limit, searchQuery);

    const stats = await agentStats();
    // fetch cases
    const casesData = await getMyCases(page, limit, searchQuery);
    const cases = casesData?.items || [];
    const totalCases = casesData?.total || 0;
    const totalLeads = leads.length >= limit ? (page * limit) + 1 : (page - 1) * limit + leads.length; // Approximate total if API doesn't provide it
    return (
        <main className="space-y-8 animate-in fade-in duration-500 pb-10">
            <TabSwitcher
                tabs={agentTabs}
                activeTab={activeTab}
                baseUrl="/dashboard/agent/main"
            />

            {activeTab === 'dashboard' ? (
                <>
                    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Cases"
                            value={stats.total}
                            color="blue"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>}
                        />
                        <StatCard
                            title="Approved"
                            value={stats.approved}
                            color="green"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></svg>}
                        />
                        <StatCard
                            title="Expected (AED)"
                            value={stats.expected_commission}
                            color="purple"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>}
                        />
                        <StatCard
                            title="Earned (AED)"
                            value={stats.total_commission}
                            color="teal"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>}
                        />
                    </section>

                    <section className="section-card bg-card border-border border shadow-sm rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
                            <div className="flex bg-muted p-1 rounded-xl">
                                <Link 
                                    href={`/dashboard/agent/main?tab=dashboard&view=cases${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${viewType === 'cases' ? 'bg-card text-blue shadow-sm' : 'text-text-muted hover:text-foreground'}`}
                                >
                                    My Cases
                                </Link>
                                <Link 
                                    href={`/dashboard/agent/main?tab=dashboard&view=leads${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${viewType === 'leads' ? 'bg-card text-blue shadow-sm' : 'text-text-muted hover:text-foreground'}`}
                                >
                                    My Leads
                                </Link>
                            </div>

                            <div className="w-full md:w-auto min-w-[300px]">
                                <SearchBar
                                    placeholder={`Search ${viewType === 'cases' ? 'Cases' : 'Leads'}...`}
                                    syncWithUrl
                                    paramKey="q"
                                    preserveParams={['tab', 'view']}
                                    debounce={300}
                                />
                            </div>
                        </div>

                        <div className="p-6 space-y-6 bg-card/50">
                            {viewType === 'cases' ? (
                                <>
                                    {cases.length > 0 ? (
                                        cases.map((c) => (
                                            <CaseCard
                                                key={c.id}
                                                id={String(c.id)}
                                                name={c.customer_name || 'N/A'}
                                                mobile={c.mobile_number || 'N/A'}
                                                email={c.email || 'N/A'}
                                                emiratesId={c.emirates_id || 'N/A'}
                                                employer={c.employer || c.company_name || 'N/A'}
                                                salary={c.salary ? String(c.salary) : '0'}
                                                product={c.product?.product_name || c.product_type || 'N/A'}
                                                bank={c.bank?.name || 'N/A'}
                                                amount={String(c.requested_amount || c.amount || 0)}
                                                date={new Date(c.created_at || c.date).toLocaleDateString()}
                                                commission={"0 (Pending)"}
                                                status={c.status}
                                                step={3}
                                            />
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-2xl">
                                            <span className="text-sm font-semibold text-text-muted opacity-80">No cases found</span>
                                        </div>
                                    )}
                                    
                                    {totalCases > limit && (
                                        <Pagination page={page} total={totalCases} limit={limit} />
                                    )}
                                </>
                            ) : (
                                <>
                                    {leads.length > 0 ? (
                                        leads.map((lead) => (
                                            <AgentLeadsCard
                                                key={lead.id}
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
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border rounded-2xl">
                                            <span className="text-sm font-semibold text-text-muted opacity-80">No leads found</span>
                                        </div>
                                    )}

                                    {(leads.length === limit || page > 1) && (
                                        <Pagination page={page} total={totalLeads} limit={limit} />
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </>
            ) : activeTab === 'calculator' ? (
                <CommissionCalculator />
            ) : activeTab === 'submit-lead' ? (
                <SubmitLead />
            ) : activeTab === 'submit-case' ? (
                <SubmitCase />
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-text-muted italic bg-card border border-border rounded-2xl">
                    <p>{agentTabs.find(t => t.id === activeTab)?.label} section is coming soon...</p>
                </div>
            )}
        </main>
    );
}
