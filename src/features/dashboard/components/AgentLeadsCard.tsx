"use client";
import React from "react";

interface LeadCardProps {
  id: number;
  customer_name: string;
  mobile_number: string;
  email: string;
  requested_amount: number;
  product_name: string;
  bank_name: string;
  bank_id?: number;
  product_id?: number;
  created_at: string;
  status?: string | null;
  isReturned?: boolean;
}

export function AgentLeadsCard({
  id,
  customer_name,
  mobile_number,
  email,
  requested_amount,
  product_name,
  product_id,
  bank_name,
  bank_id,
  created_at,
  status,
  isReturned,
}: LeadCardProps) {
  const steps = ['Lead', 'Documents', 'Review', 'Bank', 'Approved'];

  let currentStep = 1;
  const normalizedStatus = status?.toLowerCase() || '';

  if (['documents_required', 'documents_collected', 'follow_up'].includes(normalizedStatus)) {
    currentStep = 2;
  } else if (normalizedStatus === 'under_review') {
    currentStep = 3;
  } else if (normalizedStatus === 'submitted_to_bank') {
    currentStep = 4;
  } else if (normalizedStatus === 'approved') {
    currentStep = 5;
  } else if (normalizedStatus === 'submitted_to_coordinator') {
    currentStep = 3;
  }

  const formattedStatus = status ? status.replaceAll("_", " ") : null;
  const handleEdit = () => {
    const leadData = {
      id,
      customer_name,
      mobile_number,
      email,
      requested_amount,
      bank: { id: bank_id || 0, name: bank_name },
      product: { id: product_id || 0, product_name: product_name }
    };

    // If we have actual IDs in props, use them. 
    // Usually these cards should receive the full lead object or more detailed props.
    
    const encodedData = encodeURIComponent(JSON.stringify(leadData));
    window.location.href = `/dashboard/agent/main?tab=submit-lead&editData=${encodedData}`;
  }
  return (
    <div className="section-card overflow-hidden bg-card border-border border shadow-sm hover:shadow-md transition-shadow">

      {/* Steps Progress */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between relative px-2 mb-8">
          {/* Progress Lines */}
          <div className="absolute top-4 left-10 right-10 h-0.5 bg-border z-0" />

          {steps.map((s, i) => {
            const isCompleted = i + 1 < currentStep;
            const isActive = i + 1 === currentStep;
            return (
              <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${isCompleted ? 'bg-blue border-blue text-white shadow-sm' :
                  isActive ? 'bg-card dark:bg-card/40 border-blue text-blue shadow-sm' :
                    'bg-muted dark:bg-muted/40 border-border text-text-muted'
                  }`}>
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : i + 1}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? 'text-blue' : 'text-text-muted'}`}>{s}</span>
              </div>
            );
          })}
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-lg font-bold text-foreground leading-none">
              {customer_name || "No Name"}
            </h4>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="px-3 py-1 rounded-lg bg-muted text-[10px] font-bold text-text-secondary uppercase tracking-widest border border-border">
              Lead
            </span>
            {isReturned && (
              <button
                className="mt-1 flex items-center gap-1 px-3 py-1 rounded-lg bg-purple/10 text-purple text-[10px] font-bold uppercase tracking-widest border border-purple/20 hover:bg-purple/20 transition"
                onClick={handleEdit}
              >
                {/* Edit Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>

                Edit
              </button>
            )}
            {formattedStatus && (
              <span className="px-3 py-1 rounded-lg bg-blue/10 text-[10px] font-bold text-blue uppercase tracking-widest border border-blue/20">
                {formattedStatus}
              </span>
            )}

            {/* ✅ Show Edit Button if returned */}

          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-muted/30 grid grid-cols-2 md:grid-cols-4 gap-y-4 p-6 border-t border-border">

        <div>
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">
            Mobile
          </label>
          <p className="text-sm font-semibold text-foreground">
            {mobile_number}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">
            Email
          </label>
          <p className="text-sm font-semibold text-foreground truncate max-w-[150px]">
            {email}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">
            Product
          </label>
          <p className="text-sm font-semibold text-foreground">
            {product_name}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">
            Bank
          </label>
          <p className="text-sm font-semibold text-foreground">
            {bank_name}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">
            Requested Amount
          </label>
          <p className="text-sm font-semibold text-blue">
            AED {requested_amount}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">
            Created On
          </label>
          <p className="text-sm font-semibold text-foreground">
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
}