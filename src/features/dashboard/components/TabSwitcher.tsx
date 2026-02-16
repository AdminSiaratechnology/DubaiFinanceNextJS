'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardTabs } from './DashboardTabs';

interface TabSwitcherProps {
    tabs: { id: string; label: string; icon?: React.ReactNode; count?: number }[];
    activeTab: string;
    baseUrl: string;
}

export function TabSwitcher({ tabs, activeTab, baseUrl }: TabSwitcherProps) {
    const router = useRouter();

    const handleTabChange = (id: string) => {
        router.push(`${baseUrl}?tab=${id}`, { scroll: false });
    };

    return (
        <DashboardTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
        />
    );
}
