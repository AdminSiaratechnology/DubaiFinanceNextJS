import React from 'react';
import type { FunnelStep } from '../../api/dashboard.api';

interface FunnelChartProps {
    steps: FunnelStep[];
}

export function FunnelChart({ steps }: FunnelChartProps) {

    const maxValue = steps[0]?.value || 1; // 🔥 base value

    return (
        <div className="section-card p-6 sm:p-8 bg-card">
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                    Sales & Lead Funnel Analysis
                </h3>
            </div>

            <p className="text-sm text-text-secondary mb-8">
                Conversion tracking from lead to disbursement
            </p>

            <div className="space-y-6 relative ml-2 sm:ml-4">
                {steps.map((step, index) => {
                    const percent = (step.value / maxValue) * 100;

                    return (
                        <div key={index} className="flex items-center gap-4">

                            {/* Step Circle */}
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-brand text-brand bg-card shrink-0">
                                <span className="text-xs font-bold">
                                    {step.step}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex-1 min-w-[100px]">
                                <div className="h-3 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full bg-brand transition-all duration-700"
                                        style={{ width: `${percent}%` }}  // 🔥 dynamic width
                                    />
                                </div>
                            </div>

                            {/* Label + Value */}
                            <div className="min-w-[140px] text-right sm:text-left">
                                <div className="text-sm font-medium text-foreground">
                                    {step.label}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {step.value} ({percent.toFixed(0)}%)
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}