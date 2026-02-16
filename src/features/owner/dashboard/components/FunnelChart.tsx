import React from 'react';
import type { FunnelStep } from '../../../../lib/data';

interface FunnelChartProps {
    steps: FunnelStep[];
}

export function FunnelChart({ steps }: FunnelChartProps) {
    return (
        <div className="section-card p-6 sm:p-8 bg-card">
            <div className="flex items-center gap-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                </svg>
                <h3 className="text-lg font-semibold text-foreground">Sales & Lead Funnel Analysis</h3>
            </div>
            <p className="text-sm text-text-secondary mb-8 ml-0 sm:ml-8">Conversion tracking from lead to disbursement</p>

            <div className="space-y-6 relative ml-2 sm:ml-4">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-border z-0"></div>

                {steps.map((step, index) => (
                    <div key={index} className="relative z-10 flex items-center gap-4 group cursor-default">
                        {/* Step Number Circle */}
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors flex-shrink-0 ${step.status === 'completed'
                            ? 'bg-brand border-brand text-brand-foreground shadow-sm'
                            : step.status === 'active'
                                ? 'bg-card border-brand text-brand shadow-sm'
                                : 'bg-muted border-border text-text-muted'
                            }`}>
                            <span className="text-xs font-bold">{step.step}</span>
                        </div>

                        {/* Progress Bar Segment */}
                        <div className="flex-1 min-w-[100px]">
                            <div className={`h-3 rounded-full overflow-hidden ${step.status === 'pending' ? 'bg-muted' : 'bg-brand/10'
                                }`}>
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${step.status === 'completed' ? 'w-full bg-brand' :
                                        step.status === 'active' ? 'w-1/2 bg-brand/60' : 'w-0'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Label */}
                        <span className={`text-sm font-medium min-w-[120px] pr-4 text-right sm:text-left ${step.status === 'pending' ? 'text-text-muted' : 'text-foreground'
                            }`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
