"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LeadCard } from "./LeadCard";
import { LeadDetails } from "./LeadDetails";
import { SearchBar } from "@/shared/SearchBar";
import { Lead } from "./api/agent.api";
import { getLeadById, getCaseByLeadId } from "./api/agent.api";
import { Pagination } from "@/components/ui/Pagination";
interface TelecallerMainGridProps {
  leads: Lead[];
  page: number;
  limit: number;
}

export function TelecallerMainGrid({ leads, page, limit }: TelecallerMainGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("leadId");

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const handleLeadSelect = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("leadId", String(id));

    router.push(`/dashboard/telecaller/main?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("leadId");

    const query = params.toString();

    router.push(
      query
        ? `/dashboard/telecaller/main?${query}`
        : `/dashboard/telecaller/main`,
      { scroll: false },
    );
    setSelectedLead(null);
    setSelectedCase(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedId) {
        setSelectedLead(null);
        setSelectedCase(null);
        return;
      }

      try {
        const lead = await getLeadById(Number(selectedId));
        setSelectedLead(lead);

        const caseData = await getCaseByLeadId(Number(selectedId));
        setSelectedCase(caseData);
      } catch (err) {
        console.error("Failed to fetch lead/case", err);
      }
    };

    fetchData();
  }, [selectedId]);

  const TAB_LABELS: Record<string, string> = {
    'new-leads': 'New Leads',
    'working': 'Working On',
    'submitted': 'Submitted',
    'docs-required': 'Docs Required',
    'sent_back_to_telecaller': 'Sent Back To You',
  };

  const activeTab = searchParams.get('tab') || 'new-leads';
  const tabLabel = TAB_LABELS[activeTab] ?? 'Leads';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Sidebar List */}
      <div className="lg:col-span-5 section-card bg-card border-border border shadow-soft rounded-[24px] overflow-hidden flex flex-col h-[600px] lg:h-[750px] transition-shadow duration-300">
        <div className="p-4 sm:p-5 border-b border-border bg-muted/5 space-y-3">
          <h2 className="text-[16px] font-bold uppercase tracking-widest text-adaptive px-1">{tabLabel}</h2>
          <SearchBar
            placeholder="Search by Case No, Name, Mobile..."
            syncWithUrl
            paramKey="q"
            preserveParams={['tab']}
            debounce={300}
            className="h-11 rounded-2xl! border-none shadow-none focus-within:ring-2 focus-within:ring-foreground/30 transition-all bg-muted/30"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 no-scrollbar scroll-smooth">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted text-sm font-semibold p-8 text-center bg-muted/10 rounded-2xl m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-4 opacity-30"
              >
                <path d="M21 15V6a2 2 0 0 0-2-2H7l-4 4v11a2 2 0 0 0 2 2h7" />
                <circle cx="18" cy="18" r="3" />
                <path d="m22 22-1.5-1.5" />
              </svg>
              No leads found
            </div>
          ) : (
            leads.map((lead, index) => (
              <div key={lead.id} className="transition-all duration-300 hover:translate-x-1">
                <LeadCard
                    id={String(lead.id)}
                    name={lead.customer_name || "Unknown"}
                    mobile={lead.mobile_number}
                    email={lead.email}
                    number={index + 1}
                    isActive={Number(selectedId) === lead.id}
                    onClick={() => handleLeadSelect(lead.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {(leads.length === limit || page > 1) && (
          <div className="px-4 py-4 border-t border-border bg-muted/20">
            <Pagination 
              page={page} 
              total={leads.length >= limit ? (page * limit) + 1 : (page - 1) * limit + leads.length} 
              limit={limit} 
            />
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="lg:col-span-7 h-[600px] lg:h-[750px]">
        {selectedId && selectedLead ? (
          <LeadDetails
            lead={selectedLead}
            caseData={selectedCase}
            onClose={handleClose}
            readOnly={searchParams.get('tab') === 'submitted'}
          />
        ) : (
          <div className="section-card bg-card border-border border shadow-soft rounded-[24px] h-full flex flex-col items-center justify-center p-12 text-center text-text-muted">
            <div className="max-w-[280px] space-y-6 animate-in fade-in zoom-in duration-700">
              <div className="w-20 h-20 rounded-[28px] bg-muted/40 flex items-center justify-center mx-auto shadow-sm ring-1 ring-border opacity-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M15 18a3 3 0 1 0-6 0" />
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">Lead Intelligence</h3>
                <p className="text-sm font-medium leading-relaxed opacity-60">Select a lead from the sidebar to visualize case history, required documentation, and current status.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
