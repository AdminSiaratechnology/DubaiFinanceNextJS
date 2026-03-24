import React from 'react';
import { getDashboardData } from '@/lib/data';
import { StatCard } from '@/features/owner/dashboard/components/StatCard';
import { FinancialCard } from '@/features/owner/dashboard/components/FinancialCard';
import { DashboardTabs } from '@/features/owner/dashboard/components/DashboardTabs';
import { FunnelChart } from '@/features/owner/dashboard/components/FunnelChart';
import { dashboardApi } from '@/features/dashboard/components/api/agent.api';
import { funnelDashboardApi, FunnelDashboard, FunnelStep } from '@/features/owner/api/dashboard.api';

function mapFunnelData(data: FunnelDashboard): FunnelStep[] {
    return [
        { step: 1, label: "Leads Generated", value: data.leads_generated },
        { step: 2, label: "Consent Verified", value: data.consent_verified },
        { step: 3, label: "Docs Uploaded", value: data.docs_uploaded },
        { step: 4, label: "Submitted to Bank", value: data.submitted_to_bank },
        { step: 5, label: "Bank Approval", value: data.bank_approval },
        { step: 6, label: "Disbursal", value: data.disbursal },
    ];
}
export default async function DashboardPage() {
    const apiData = await dashboardApi() || {};
    const funnelData = await funnelDashboardApi() || {};
    const funnelSteps = mapFunnelData(funnelData);
    const metrics = [
        { title: 'Total Leads', value: apiData.total_leads?.toString() ?? '0', subtitle: 'All time', color: 'blue' as const },
        { title: 'Total Cases', value: apiData.total_cases?.toString() ?? '0', subtitle: 'Active', color: 'purple' as const },
        { title: 'Approved', value: apiData.approved_cases?.toString() ?? '0', subtitle: apiData?.approval_ratio + '%' + " " + 'Approval ratio', color: 'green' as const },
        { title: 'Rejected', value: apiData.rejected_cases?.toString() ?? '0', subtitle: apiData?.rejection_ratio + '%' + " " + 'Rejection ratio', color: 'red' as const },
        { title: 'Submitted', value: apiData.submitted_to_bank?.toString() ?? '0', subtitle: 'To banks', color: 'orange' as const },
        { title: 'Total Business', value: `AED ${apiData.total_business?.toLocaleString() ?? '0'}`, subtitle: 'Gross', color: 'blue' as const },
    ];
    return (
        <main className="space-y-8 animate-in fade-in duration-500">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {metrics.map((metric, index) => (
                    <StatCard
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        subtitle={metric.subtitle}
                        color={metric.color}
                    />
                ))}
            </section>

            {/* <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {financials.map((item, index) => (
                    <FinancialCard
                        key={index}
                        title={item.title}
                        amount={item.amount}
                        color={item.color}
                    />
                ))}
            </section> */}

            <DashboardTabs>
                <section className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    <FunnelChart steps={funnelSteps} />
                </section>
            </DashboardTabs>
        </main>
    );
}
