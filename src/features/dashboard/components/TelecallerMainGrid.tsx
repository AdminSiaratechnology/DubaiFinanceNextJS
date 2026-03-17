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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="section-card bg-card border-border border shadow-sm rounded-2xl overflow-hidden flex flex-col h-[700px]">
        <div className="p-4 border-b border-border">
          <SearchBar
            placeholder="Search by Case No, Name, Mobile..."
            syncWithUrl
            paramKey="q"
            preserveParams={['tab']}
            debounce={300}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2 opacity-50"
              >
                <path d="M21 15V6a2 2 0 0 0-2-2H7l-4 4v11a2 2 0 0 0 2 2h7" />
                <circle cx="18" cy="18" r="3" />
                <path d="m22 22-1.5-1.5" />
              </svg>
              No leads found
            </div>
          ) : (
            leads.map((lead, index) => (
              <LeadCard
                key={lead.id}
                id={String(lead.id)}
                name={lead.customer_name || "Unknown"}
                mobile={lead.mobile_number}
                email={lead.email}
                number={index + 1}
                isActive={Number(selectedId) === lead.id}
                onClick={() => handleLeadSelect(lead.id)}
              />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {(leads.length === limit || page > 1) && (
          <div className="p-4 border-t border-border bg-muted/30">
            <Pagination 
              page={page} 
              total={leads.length >= limit ? (page * limit) + 1 : (page - 1) * limit + leads.length} 
              limit={limit} 
            />
          </div>
        )}
      </div>

      <div className="h-[700px]">
        {selectedId && selectedLead ? (
          <LeadDetails
            lead={selectedLead}
            caseData={selectedCase}
            onClose={handleClose}
          />
        ) : (
          <div className="section-card bg-card border-border border shadow-sm rounded-2xl h-full flex items-center justify-center p-8 text-center text-text-muted italic">
            <div className="max-w-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M15 18a3 3 0 1 0-6 0" />
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                </svg>
              </div>

              <p>Select a lead from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
