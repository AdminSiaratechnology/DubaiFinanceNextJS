'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { TelecallerMainGrid } from '@/features/dashboard/components/TelecallerMainGrid';
import { getLeads, Lead } from '@/features/dashboard/components/api/agent.api';
import { TelecallerStats } from '@/features/dashboard/components/TelecallerStats';
import { useSearchParams } from 'next/navigation';

function TelecallerDashboardContent() {
    const params = useSearchParams();
    const activeTab = params.get('tab') || 'new-leads';
    const page = Number(params.get('page')) || 1;
    const limit = 5;
    const searchQuery = params.get('q') || "";

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true);
            try {
                let lead_type = "";
                if (activeTab === "new-leads") lead_type = "new";
                else if (activeTab === "working") lead_type = "working";
                else if (activeTab === "submitted") lead_type = "submitted";
                else if (activeTab === "docs-required") lead_type = "docs_required";
                else if (activeTab === "sent_back_to_telecaller") lead_type = "sent_back_to_telecaller";

                const skip = (page - 1) * limit;
                const data = await getLeads(skip, limit, searchQuery, lead_type);
                setLeads(data);
            } catch (err) {
                console.error("Failed to fetch leads", err);
                setLeads([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, [activeTab, page, searchQuery]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <header>
                <TelecallerStats />
            </header>
            
            <main className="transition-all duration-500">
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                        <div className="lg:col-span-5 section-card bg-card border-border border shadow-soft rounded-[24px] h-[600px] lg:h-[750px] animate-pulse" />
                        <div className="hidden lg:block lg:col-span-7 section-card bg-card border-border border shadow-soft rounded-[24px] h-[750px] animate-pulse" />
                    </div>
                ) : (
                    <TelecallerMainGrid leads={leads} page={page} limit={limit} />
                )}
            </main>
        </div>
    );
}

export default function TelecallerDashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-32">
                <div className="w-10 h-10 border-4 border-brand/30 border-t-brand rounded-full animate-spin" />
            </div>
        }>
            <TelecallerDashboardContent />
        </Suspense>
    );
}
