'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LeadCard } from './LeadCard';
import { LeadDetails } from './LeadDetails';

interface TelecallerMainGridProps {
    leads: any[];
}

export function TelecallerMainGrid({ leads }: TelecallerMainGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('leadId');

    const handleLeadSelect = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('leadId', id);
        router.push(`/dashboard/telecaller/main?${params.toString()}`, { scroll: false });
    };

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('leadId');
        router.push(`/dashboard/telecaller/main?${params.toString()}`, { scroll: false });
    };

    const selectedLead = leads.find(l => l.id === selectedId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Lead List */}
            <div className="section-card bg-card border-border border shadow-sm rounded-2xl overflow-hidden flex flex-col h-[700px]">
                <div className="p-4 border-b border-border">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        <input
                            type="text"
                            placeholder="Search by Case No, Name, Mobile..."
                            className="w-full pl-10 pr-4 py-2 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-brand outline-none transition-all font-medium"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {leads.map((lead) => (
                        <LeadCard
                            key={lead.id}
                            {...lead}
                            isActive={selectedId === lead.id}
                            onClick={() => handleLeadSelect(lead.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Right: Detailed View / Placeholder */}
            <div className="h-[700px]">
                {selectedLead ? (
                    <LeadDetails
                        lead={selectedLead}
                        onClose={handleClose}
                    />
                ) : (
                    <div className="section-card bg-card border-border border shadow-sm rounded-2xl h-full flex items-center justify-center p-8 text-center text-text-muted italic">
                        <div className="max-w-xs space-y-4">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto opacity-20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M15 18a3 3 0 1 0-6 0" /><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /></svg>
                            </div>
                            <p>Select a case from the list to view details</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
