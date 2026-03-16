import React from 'react';

interface CaseCardProps {
    id: string;
    name: string;
    mobile: string;
    email: string;
    emiratesId: string;
    employer: string;
    salary: string;
    product: string;
    bank?: string;
    amount: string;
    date: string;
    commission: string;
    status: string;
    step: number; // 1-5
    isActive?: boolean;
    isAnyCaseSelected?: boolean;
    showCommission?: boolean;
}

export function CaseCard({
    id, name, mobile, email, emiratesId, employer, salary, product, bank, amount, date, commission, status, step, isActive, isAnyCaseSelected, showCommission = true
}: CaseCardProps) {
    const steps = ['Lead', 'Documents', 'Review', 'Bank', 'Approved'];

    let currentStep = step || 1;
    const normalizedStatus = status?.toLowerCase() || '';

    if (['documents_pending', 'documents_required', 'documents_collected', 'follow_up'].includes(normalizedStatus)) {
        currentStep = 2;
    } else if (normalizedStatus === 'submitted_to_coordinator') {
        currentStep = 3;
    }

    const formattedStatus = status ? status.replaceAll("_", " ") : "Unknown";

    // Compact mode when a case is selected in the UI
    const isCompact = isAnyCaseSelected || isActive;

    return (
        <div className={`section-card overflow-hidden transition-all duration-300 cursor-pointer border shadow-sm ${isActive
            ? 'bg-blue/5 border-blue/50 ring-1 ring-blue/20 shadow-blue/5 dark:bg-blue/10 scale-[1.02] z-10'
            : 'bg-card border-border hover:shadow-md hover:border-blue/30'
            }`}>

            {/* Steps Progress - Hidden/Simplified in Compact Mode */}
            {!isCompact ? (
                <div className="p-6 pb-2">
                    <div className="flex items-center justify-between relative px-2 mb-8">
                        <div className="absolute top-4 left-10 right-10 h-0.5 bg-border z-0" />
                        {steps.map((s, i) => {
                            const isCompleted = i + 1 < currentStep;
                            const isStepActive = i + 1 === currentStep;
                            return (
                                <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${isCompleted ? 'bg-blue border-blue text-white shadow-sm' :
                                        isStepActive ? 'bg-card dark:bg-card/40 border-blue text-blue shadow-sm' :
                                            'bg-muted dark:bg-muted/40 border-border text-text-muted'
                                        }`}>
                                        {isCompleted ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        ) : i + 1}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-tight ${isStepActive ? 'text-blue' : 'text-text-muted'}`}>{s}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="px-4 pt-4 pb-0 flex items-center gap-2 overflow-hidden">
                    <div className="flex gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${i < currentStep ? 'bg-blue' : i === currentStep ? 'bg-blue border border-blue' : 'bg-border'}`}
                            />
                        ))}
                    </div>
                    <span className="text-[9px] font-black uppercase text-text-muted tracking-widest">Step {currentStep}/5</span>
                </div>
            )}

            <div className={`${isCompact ? 'p-4' : 'p-6 pt-0'}`}>
                <div className={`flex justify-between items-start ${isCompact ? 'gap-2' : 'mb-4'}`}>
                    <div className="min-w-0">
                        <h4 className={`${isCompact ? 'text-sm' : 'text-lg'} font-bold text-foreground leading-snug truncate`}>{name}</h4>
                        {isCompact && <p className="text-[10px] text-blue font-bold tracking-tight mt-0.5">{amount}</p>}
                    </div>
                    <span className={`${isCompact ? 'px-2 py-0.5 text-[8px]' : 'px-3 py-1 text-[10px]'} shrink-0 rounded-lg bg-blue/10 font-bold text-blue uppercase tracking-widest border border-blue/20`}>
                        {formattedStatus}
                    </span>
                </div>

                <div className={`bg-muted/30 grid ${isCompact ? 'grid-cols-1 gap-y-3' : 'grid-cols-2 md:grid-cols-4 gap-y-4'} p-6 border-y border-border -mx-6 my-4`}>
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Mobile</label>
                        <p className={`text-xs font-semibold text-foreground`}>{mobile}</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Email</label>
                        <p className={`text-xs font-semibold text-foreground truncate max-w-[150px]`}>{email}</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Emirates ID</label>
                        <p className={`text-xs font-semibold text-foreground`}>{emiratesId}</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Employer</label>
                        <p className={`text-xs font-semibold text-foreground`}>{employer}</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Monthly Salary</label>
                        <p className={`text-xs font-semibold text-foreground`}>{salary}</p>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Product Type</label>
                        <p className={`text-xs font-semibold text-foreground`}>{product}</p>
                    </div>
                    {bank && (
                        <div>
                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Bank</label>
                            <p className={`text-xs font-semibold text-foreground`}>{bank}</p>
                        </div>
                    )}
                    <div>
                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Requested Amount</label>
                        <p className={`text-xs font-semibold text-blue`}>{amount}</p>
                    </div>
                </div>
            </div>

            {/* Expected Commission Banner */}
            {showCommission && (
                <div className="p-4 bg-blue-soft border-t border-blue/10 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                        <span className="text-xs font-bold uppercase tracking-wider">Expected Commission</span>
                    </div>
                    <div className="text-blue font-bold tracking-tight">AED {commission}</div>
                </div>
            )}
        </div>
    );
}
