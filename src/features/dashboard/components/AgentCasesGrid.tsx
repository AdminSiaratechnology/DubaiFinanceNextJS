'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CaseCard } from './CaseCard';
// We can reuse LeadDetails or CaseDetailsAnalyst or make another one
import { LeadDetails } from './LeadDetails';
import { SearchBar } from '@/shared/SearchBar';

interface AgentCasesGridProps {
    cases: any[];
}

export function AgentCasesGrid({ cases }: AgentCasesGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('caseId');

    const handleCaseSelect = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('caseId', id);
        router.push(`/dashboard/agent/main?${params.toString()}`, { scroll: false });
    };

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('caseId');
        router.push(`/dashboard/agent/main?${params.toString()}`, { scroll: false });
    };

    const selectedCase = cases.find(c => c.id === selectedId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* List */}
            <div className="space-y-6">
                <div className="bg-card/80 border border-border rounded-xl p-4 shadow-sm sticky top-0 z-20 backdrop-blur-md">
                    <SearchBar
                        placeholder="Search by Case No, Mobile, Email, or Name..."
                        className="pl-12 pr-4 py-3 bg-muted border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                        iconSize={20}
                    />
                </div>

                <div className="space-y-4">
                    {cases.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => handleCaseSelect(c.id)}
                            className={`cursor-pointer transition-all ${selectedId === c.id ? 'ring-2 ring-blue ring-offset-4 rounded-2xl' : ''}`}
                        >
                            <CaseCard
                                {...c}
                                isActive={selectedId === c.id}
                                isAnyCaseSelected={!!selectedId}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            <div className="sticky top-8 h-[calc(100vh-120px)]">
                {selectedCase ? (
                    <LeadDetails
                        lead={selectedCase as any}
                        onClose={handleClose}
                        // readOnly={true}
                    />
                ) : (
                    <div className="section-card bg-card border-border border shadow-sm rounded-2xl h-full flex flex-col items-center justify-center p-8 text-center text-text-muted">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 opacity-20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                        </div>
                        <h4 className="text-lg font-bold text-foreground">View Case Details</h4>
                        <p className="text-sm mt-2">Select a case from the list on the left to see the full documentary track and status.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
