import React from 'react';
import { telecallerStats, telecallerLeads } from '@/lib/mock/telecaller';
import { StatTabs } from '@/features/dashboard/components/StatTabs';
import { TelecallerMainGrid } from '@/features/dashboard/components/TelecallerMainGrid';
import { getLeads } from '@/features/dashboard/components/api/agent.api';
const telecallerStatsTabs = [
    {
        id: 'new-leads',
        title: 'New Leads',
        value: telecallerStats.newLeads,
        color: 'blue' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="13" x="4" y="4" rx="2" /><path d="m22 7-7.1 3.78c-.54.29-1.26.29-1.8 0L6 7" /></svg>
    },
    {
        id: 'working',
        title: 'Working On',
        value: telecallerStats.workingOn,
        color: 'orange' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>
    },
    {
        id: 'submitted',
        title: 'Submitted',
        value: telecallerStats.submitted,
        color: 'green' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></svg>
    },
    {
        id: 'docs-required',
        title: 'Docs Required',
        value: telecallerStats.docsRequired,
        color: 'red' as const,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
    },
];

export default async function TelecallerDashboardPage({
    searchParams
}: {
    searchParams: Promise<{ tab?: string; leadId?: string; q?: string }>
}) {
    const params = await searchParams;
    const activeTab = params.tab || 'new-leads';
    let lead_type = "";
    if (params.tab === "new-leads") lead_type = "new";
    if (params.tab === "working") lead_type = "working";
    if (params.tab === "submitted") lead_type = "submitted";
    if (params.tab === "docs-required") lead_type = "docs_required";
    
    const searchQuery = params.q || "";
    const leads = await getLeads(0, 10, searchQuery, lead_type);
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Cards as Tabs */}
            <StatTabs
                tabs={telecallerStatsTabs}
                activeTab={activeTab}
                baseUrl="/dashboard/telecaller/main"
            />

            {/* Main Content Area: Leads List & Detail View */}
            <TelecallerMainGrid leads={leads} />
        </div>
    );
}
