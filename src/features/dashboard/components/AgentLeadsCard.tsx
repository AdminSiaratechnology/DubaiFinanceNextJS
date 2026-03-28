"use client";

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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${isCompleted ? 'bg-foreground border-foreground text-background shadow-sm' :
                  isActive ? 'bg-card dark:bg-card/40 border-foreground text-foreground shadow-sm' :
                    'bg-muted dark:bg-muted/40 border-border text-text-muted'
                  }`}>
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : i + 1}
                </div>
                <span className={`text-[12px] font-bold uppercase tracking-tight ${isActive ? 'text-foreground' : 'text-text-muted'}`}>{s}</span>
              </div>
            );
          })}
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-foreground leading-tight">
              {customer_name || "No Name"}
            </h4>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="px-3 py-1 rounded-lg bg-muted text-[11px] font-bold text-text-secondary uppercase tracking-widest border border-border">
              Lead
            </span>
            {isReturned && (
              <span className="mt-1 flex items-center gap-1 px-3 py-1 rounded-lg bg-purple/10 text-purple text-[11px] font-bold uppercase tracking-widest border border-purple/20">
                Returned to you
              </span>
            )}
            {formattedStatus && (
              <span className="px-3 py-1 rounded-lg bg-foreground/10 text-[11px] font-bold text-foreground uppercase tracking-widest border border-foreground/20">
                {formattedStatus}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-muted/30 grid grid-cols-2 md:grid-cols-4 gap-y-4 p-6 border-t border-border">

        <div>
          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
            Mobile
          </label>
          <p className="text-[15px] font-semibold text-foreground">
            {mobile_number}
          </p>
        </div>

        <div>
          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
            Email
          </label>
          <p className="text-[15px] font-semibold text-foreground truncate max-w-[150px]">
            {email}
          </p>
        </div>

        <div>
          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
            Product
          </label>
          <p className="text-[15px] font-semibold text-foreground">
            {product_name}
          </p>
        </div>

        <div>
          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
            Bank
          </label>
          <p className="text-[15px] font-semibold text-foreground">
            {bank_name}
          </p>
        </div>

        <div>
          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
            Requested Amount
          </label>
          <p className="text-[15px] font-semibold text-foreground">
            AED {requested_amount}
          </p>
        </div>

        <div>
          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1">
            Created On
          </label>
          <p className="text-[15px] font-semibold text-foreground">
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
}