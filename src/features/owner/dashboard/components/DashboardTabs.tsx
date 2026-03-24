'use client';

import React, { useState } from 'react';
import { ProductsTab } from './ProductsTab';
import { BanksTab } from './BanksTab';
import { AgentsTab } from './AgentsTab';
import { TeamTab } from './TeamTab';
import { AllCasesTab } from './AllCasesTab';
import { SlaRisksTab } from './SlaRisksTab';

const tabs = ['Sales Funnel', 'Products', 'Banks', 'Agents', 'Team', 'All Cases'];

export function DashboardTabs({ children }: { children?: React.ReactNode }) {
    const [active, setActive] = useState('Sales Funnel');

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-2 overflow-x-auto pb-2 no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${active === tab
                            ? 'bg-foreground text-background shadow-md backdrop-blur-sm'
                            : 'bg-card text-text-secondary hover:bg-muted border border-border hover:shadow-sm'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="min-h-[400px]">
                {active === 'Sales Funnel' && children}
                {active === 'Products' && <ProductsTab />}
                {active === 'Banks' && <BanksTab />}
                {active === 'Agents' && <AgentsTab />}
                {active === 'Team' && <TeamTab />}
                {active === 'All Cases' && <AllCasesTab />}
                {active === 'SLA & Risks' && <SlaRisksTab />}
            </div>
        </div>
    );
}
