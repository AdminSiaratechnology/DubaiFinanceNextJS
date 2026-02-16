import React from 'react';
import { getDashboardData } from '@/lib/data';
import { StatCard } from '@/features/owner/dashboard/components/StatCard';
import { FinancialCard } from '@/features/owner/dashboard/components/FinancialCard';
import { DashboardTabs } from '@/features/owner/dashboard/components/DashboardTabs';
import { FunnelChart } from '@/features/owner/dashboard/components/FunnelChart';

export default async function DashboardPage() {
    const data = await getDashboardData();

    return (
        <main className="space-y-8 animate-in fade-in duration-500">
            <section className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                </svg>
                <h2 className="text-2xl font-light text-foreground">Executive Snapshot (Real-Time)</h2>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {data.metrics.map((metric, index) => (
                    <StatCard
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        subtitle={metric.subtitle}
                        color={metric.color}
                    />
                ))}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {data.financials.map((item, index) => (
                    <FinancialCard
                        key={index}
                        title={item.title}
                        amount={item.amount}
                        color={item.color}
                    />
                ))}
            </section>

            <DashboardTabs />

            <section className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <FunnelChart steps={data.funnel} />
            </section>
        </main>
    );
}
