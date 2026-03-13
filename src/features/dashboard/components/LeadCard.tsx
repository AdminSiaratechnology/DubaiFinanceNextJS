import React from 'react';

interface LeadCardProps {
    id: string;
    name: string;
    mobile: string;
    email?: string;
    isActive?: boolean;
    onClick: () => void;
    number: number;
}

export function LeadCard({ id, name, mobile, email, isActive, onClick, number }: LeadCardProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${isActive
                ? 'bg-blue-soft border-blue/20'
                : 'bg-card border-border hover:bg-muted/50'
                }`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isActive ? 'bg-blue text-white shadow-md' : 'bg-green-soft text-green'
                }`}>
                {number}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-foreground leading-tight truncate">{name}</h4>
                    {/* <span className="shrink-0 text-[10px] font-bold text-text-muted uppercase bg-muted px-1.5 py-0.5 rounded ml-2">New Lead</span> */}
                </div>
                {/* <p className="text-[10px] text-text-muted mt-0.5 font-medium tracking-wide uppercase">Case ID: {id}</p> */}
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <span className="text-[11px] font-semibold">{mobile}</span>
                    </div>
                    {email && (
                        <div className="flex items-center gap-1.5 text-text-secondary truncate">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            <span className="text-[11px] font-semibold truncate max-w-[100px]">{email}</span>
                        </div>
                    )}
                </div>
                {/* <div className="mt-2 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-soft text-blue border border-blue/10 uppercase tracking-wider">
                    {status}
                </div> */}
            </div>
        </button>
    );
}
