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
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5 relative group ${isActive
                ? 'bg-blue/5 border-blue/40 shadow-sm ring-1 ring-blue/10 translate-x-1'
                : 'bg-card border-border hover:border-blue/20 hover:bg-muted/30'
                }`}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 transition-all duration-300 ${isActive 
                ? 'bg-blue text-white shadow-blue/20' 
                : 'bg-muted text-text-muted group-hover:bg-blue-soft group-hover:text-blue'
                }`}>
                {number < 10 ? `0${number}` : number}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground leading-tight truncate group-hover:text-blue transition-colors">{name}</h4>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </div>
                        <span className="text-[11px] font-bold opacity-80">{mobile}</span>
                    </div>
                    {email && (
                        <div className="flex items-center gap-1.5 text-text-secondary truncate">
                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <span className="text-[11px] font-bold opacity-80 truncate max-w-[120px]">{email}</span>
                        </div>
                    )}
                </div>
            </div>

            {isActive && (
                <div className="absolute right-4 w-1.5 h-10 bg-blue rounded-full" />
            )}
        </button>
    );
}
