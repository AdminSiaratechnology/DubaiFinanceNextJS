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
    amount: string;
    date: string;
    commission: string;
    status: string;
    step: number; // 1-5
}

export function CaseCard({
    id, name, mobile, email, emiratesId, employer, salary, product, amount, date, commission, status, step
}: CaseCardProps) {
    const steps = ['Lead', 'Documents', 'Review', 'Bank', 'Approved'];

    return (
        <div className="section-card overflow-hidden bg-card border-border border shadow-sm hover:shadow-md transition-shadow">
            {/* Steps Progress */}
            <div className="p-6 pb-2">
                <div className="flex items-center justify-between relative px-2 mb-8">
                    {/* Progress Lines */}
                    <div className="absolute top-4 left-10 right-10 h-0.5 bg-border z-0" />

                    {steps.map((s, i) => {
                        const isCompleted = i + 1 < step;
                        const isActive = i + 1 === step;
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

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-lg font-bold text-foreground leading-none">{name}</h4>
                        <p className="text-xs text-text-secondary mt-1 tracking-wide uppercase font-medium">Case ID: {id}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-muted text-[10px] font-bold text-text-secondary uppercase tracking-widest border border-border">
                        {status}
                    </span>
                </div>
            </div>

            {/* Info Grid */}
            <div className="bg-muted/30 grid grid-cols-2 md:grid-cols-4 gap-y-4 p-6 border-t border-border">
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Mobile</label>
                    <p className="text-sm font-semibold text-foreground">{mobile}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Email</label>
                    <p className="text-sm font-semibold text-foreground truncate max-w-[150px]">{email}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Emirates ID</label>
                    <p className="text-sm font-semibold text-foreground">{emiratesId}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Employer</label>
                    <p className="text-sm font-semibold text-foreground">{employer}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Monthly Salary</label>
                    <p className="text-sm font-semibold text-foreground">{salary}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Product Type</label>
                    <p className="text-sm font-semibold text-foreground">{product}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Requested Amount</label>
                    <p className="text-sm font-semibold text-blue">{amount}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-0.5">Submitted On</label>
                    <p className="text-sm font-semibold text-foreground">{date}</p>
                </div>
            </div>

            {/* Expected Commission Banner */}
            <div className="p-4 bg-blue-soft border-t border-blue/10 flex justify-between items-center">
                <div className="flex items-center gap-2 text-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                    <span className="text-xs font-bold uppercase tracking-wider">Expected Commission</span>
                </div>
                <div className="text-blue font-bold tracking-tight">AED {commission}</div>
            </div>
        </div>
    );
}