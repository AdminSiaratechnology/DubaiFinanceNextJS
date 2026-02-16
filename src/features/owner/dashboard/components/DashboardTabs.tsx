'use client';

import React, { useState } from 'react';

const tabs = ['Sales Funnel', 'Products', 'Banks', 'Agents', 'Team', 'All Cases', 'SLA & Risks'];

export function DashboardTabs() {
    const [active, setActive] = useState('Sales Funnel');

    return (
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${active === tab
                        ? 'bg-foreground text-background shadow-md'
                        : 'bg-card text-text-secondary hover:bg-muted border border-border'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
