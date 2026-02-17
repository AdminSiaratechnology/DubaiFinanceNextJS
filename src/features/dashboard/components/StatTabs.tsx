'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StatCard } from './StatCard';

interface StatTab {
    id: string;
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'purple' | 'teal' | 'orange' | 'red' | 'dark';
}

interface StatTabsProps {
    tabs: StatTab[];
    activeTab: string;
    baseUrl: string;
    gridCols?: string;
}

/**
 * StatTabs - Client Component
 * Renders a grid of StatCards that act as navigation tabs.
 */
export function StatTabs({
    tabs,
    activeTab,
    baseUrl,
    gridCols = "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
}: StatTabsProps) {
    const router = useRouter();

    const handleTabChange = (id: string) => {
        router.push(`${baseUrl}?tab=${id}`, { scroll: false });
    };

    return (
        <section className={`grid gap-6 ${gridCols}`}>
            {tabs.map((tab) => (
                <StatCard
                    key={tab.id}
                    {...tab}
                    isActive={activeTab === tab.id}
                    onClick={() => handleTabChange(tab.id)}
                />
            ))}
        </section>
    );
}
