'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CaseCard } from './CaseCard';
import { CaseDetailsAnalyst } from './CaseDetailsAnalyst';

interface AnalystMainGridProps {
    cases: any[];
    onStatusUpdate?: () => void;
}

export function AnalystMainGrid({ cases, onStatusUpdate }: AnalystMainGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('caseId');

    const handleCaseSelect = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('caseId', id);
        router.push(`/dashboard/analyst/main?${params.toString()}`, { scroll: false });
    };

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('caseId');
        router.push(`/dashboard/analyst/main?${params.toString()}`, { scroll: false });
    };

    const selectedCase = cases.find(c => c.id === selectedId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-start min-h-[850px]">
            <div
                className={`${selectedId ? "lg:col-span-2" : "lg:col-span-3"
                    } bg-card dark:bg-card/80 border border-border rounded-3xl overflow-hidden flex flex-col h-[850px] shadow-sm transition-all duration-500`}
            >                <div className="p-6 border-b border-border bg-card/30 backdrop-blur-md flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Case Queue</h3>
                        <p className="text-[10px] text-text-muted font-bold mt-1 uppercase">{cases.length} Cases Available</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
                    {cases.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => handleCaseSelect(c.id)}
                            className="transition-all active:scale-[0.98]"
                        >
                            <CaseCard
                                {...c}
                                isActive={selectedId === c.id}
                                isAnyCaseSelected={!!selectedId}
                                showCommission={false}
                            />
                        </div>
                    ))}
                    {cases.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-text-muted italic py-32 opacity-50">
                            <div className="w-16 h-16 rounded-full bg-muted dark:bg-white/5 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            </div>
                            <p>No cases in this category</p>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={`${selectedId ? "lg:col-span-4" : "lg:col-span-3"
                    } h-[850px] transition-all duration-500 bg-card dark:bg-card/80 rounded-3xl border border-border`}
            >                {selectedId && selectedCase ? (
                <div className="h-full animate-in slide-in-from-right-4 duration-500">
                    <CaseDetailsAnalyst
                        caseData={selectedCase}
                        onClose={handleClose}
                        onStatusUpdate={onStatusUpdate}
                    />
                </div>
            ) : (
                <div className="bg-card/30 border-2 border-dashed border-border dark:border-border/50 rounded-3xl h-full flex flex-col items-center justify-center p-12 text-center transition-all">
                    <div className="w-24 h-24 rounded-3xl bg-brand/5 dark:bg-brand/10 flex items-center justify-center mb-8 border border-brand/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand opacity-60"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                    </div>
                    <h4 className="text-2xl font-black text-foreground uppercase tracking-widest">Select a Case</h4>
                    <p className="max-w-xs mt-3 text-sm font-medium text-text-muted leading-relaxed">
                        Pick a client from the queue to start the analysis process or update status.
                    </p>
                </div>
            )}
            </div>
        </div>
    );
}
