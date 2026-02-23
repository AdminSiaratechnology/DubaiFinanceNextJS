'use client';

import React from 'react';

interface DashboardTabsProps {
    tabs: { id: string; label: string; icon?: React.ReactNode; count?: number }[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export function DashboardTabs({ tabs, activeTab, onTabChange }: DashboardTabsProps) {
    return (
        <div className="flex overflow-x-auto gap-8 mb-6 no-scrollbar sticky top-0 bg-white/80 z-30 p-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`pb-2 px-2 text-sm transition-all relative flex items-center gap-2.5 whitespace-nowrap group ${activeTab === tab.id
                        ? 'text-blue'
                        : 'text-black/90 hover:text-text-secondary'
                        }`}
                >
                    {tab.icon && (
                        <span className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {tab.icon}
                        </span>
                    )}
                    <span className="relative">
                        {tab.label}
                    </span>
                    {tab.count !== undefined && (
                        <span className={`
                            text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-all
                            ${activeTab === tab.id
                                ? 'bg-blue-soft text-blue shadow-sm shadow-blue/10'
                                : 'bg-muted text-text-muted group-hover:bg-muted/80'
                            }
                        `}>
                            {tab.count}
                        </span>
                    )}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-t-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
