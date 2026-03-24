import React from 'react';

export function SlaRisksTab() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {/* SLA Breaches & Alerts */}
            <div className="bg-card border-y border-r border-border border-l-4 border-l-red rounded-2xl shadow-sm p-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-8 h-full bg-linear-to-r from-red-soft to-transparent opacity-50 pointer-events-none" />
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    SLA Breaches & Alerts
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-soft rounded-xl border border-red/10 group hover:bg-red/10 transition-colors">
                        <span className="font-semibold text-red">Leads Not Contacted (24h+)</span>
                        <span className="bg-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">0</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-soft rounded-xl border border-orange/10 group hover:bg-orange/10 transition-colors">
                        <span className="font-semibold text-orange">Cases Stuck (3+ days)</span>
                        <span className="bg-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">83</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-soft rounded-xl border border-blue/10 group hover:bg-blue/10 transition-colors">
                        <span className="font-semibold text-blue">Documents Pending</span>
                        <span className="bg-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">10</span>
                    </div>
                </div>
            </div>

            {/* Business Risk Indicators */}
            <div className="bg-card border-y border-r border-border border-l-4 border-l-orange rounded-2xl shadow-sm p-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-8 h-full bg-linear-to-r from-orange-soft to-transparent opacity-50 pointer-events-none" />
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Business Risk Indicators
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/50 group hover:bg-muted/80 transition-colors">
                        <span className="font-semibold text-text-secondary">Approval Rate Trend</span>
                        <span className="bg-green-soft text-green text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-green/20 shadow-sm">
                            0% 
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/50 group hover:bg-muted/80 transition-colors">
                        <span className="font-semibold text-text-secondary">Agent Quality Score</span>
                        <span className="bg-blue-soft text-blue text-xs font-bold px-3 py-1 rounded-lg border border-blue/20 shadow-sm">Good</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/50 group hover:bg-muted/80 transition-colors">
                        <span className="font-semibold text-text-secondary">Cash Flow Health</span>
                        <span className="bg-red-soft text-red text-xs font-bold px-3 py-1 rounded-lg border border-red/20 shadow-sm">Critical</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
