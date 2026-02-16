'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CaseCard } from './CaseCard';
import { CaseDetailsAnalyst } from './CaseDetailsAnalyst';

interface AnalystMainGridProps {
    cases: any[];
}

export function AnalystMainGrid({ cases }: AnalystMainGridProps) {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-8 items-start">
            {/* Left: Cases List */}
            <div className={`xl:col-span-2 section-card bg-card border-border border shadow-sm rounded-2xl overflow-hidden flex flex-col h-[800px] transition-all duration-500 ${selectedId ? 'opacity-100' : 'xl:col-span-5'}`}>
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Active Case Queue</h3>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        <input
                            type="text"
                            placeholder="Filter queue..."
                            className="pl-8 pr-4 py-1.5 bg-muted border-none rounded-lg text-xs focus:ring-1 focus:ring-brand outline-none w-48 font-medium"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {cases.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => handleCaseSelect(c.id)}
                            className={`cursor-pointer transition-all ${selectedId === c.id ? 'ring-2 ring-brand ring-offset-2 scale-[0.98]' : 'hover:scale-[0.99]'}`}
                        >
                            <CaseCard {...c} />
                        </div>
                    ))}
                    {cases.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-text-muted italic py-20">
                            <p>No cases in this queue</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Detailed View / Placeholder */}
            {selectedId && (
                <div className="xl:col-span-3 h-[800px] animate-in slide-in-from-right duration-500">
                    {selectedCase ? (
                        <CaseDetailsAnalyst
                            caseData={selectedCase}
                            onClose={handleClose}
                        />
                    ) : (
                        <div className="section-card bg-card border-border border shadow-sm rounded-2xl h-full flex items-center justify-center text-text-muted italic">
                            <p>Case not found</p>
                        </div>
                    )}
                </div>
            )}

            {!selectedId && (
                <div className="hidden xl:flex xl:col-span-3 h-[800px] flex-col items-center justify-center p-8 text-center text-text-muted border-2 border-dashed border-border rounded-2xl opacity-50">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                    </div>
                    <h4 className="text-xl font-bold text-foreground">Select a case to begin review</h4>
                    <p className="max-w-xs mt-2 text-sm leading-relaxed">Choose a client from the queue on the left to analyze their documents and submit to the bank.</p>
                </div>
            )}
        </div>
    );
}
