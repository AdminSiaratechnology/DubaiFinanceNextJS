import React from 'react';
import Link from 'next/link';
import { Coordinator } from '../api/analyst.api';
import { Telecaller } from '../api/telecaller.api';
import { Agent } from '../api/agent.api';
import { TeamActions } from './TeamActions';
import { TeamSearch } from './TeamSearch';
import { Pagination } from '@/components/ui/Pagination';

interface TeamTableProps {
    members: (Coordinator | Telecaller | Agent)[];
    role: 'analyst' | 'telecaller' | 'agent';
    page: number;
    total: number;
    limit: number;
}

export function TeamTable({ members, role, page, total, limit }: TeamTableProps) {
    return (
        <>
            <div className="space-y-6 bg-white p-4 sm:p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                    <TeamSearch role={role} />
                </div>
                <Link
                    href={`/owner/team/${role}s/new`}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-md active:scale-95 w-full sm:w-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Add New {role.charAt(0).toUpperCase() + role.slice(1)}
                </Link>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-0">
                        <thead>
                            <tr className="bg-foreground/10 border-b border-border">
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">S.No</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Full Name</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Contact</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest text-center">Experience</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Emirates ID</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest">Bank Details</th>
                                <th className="p-3 sm:p-4 text-[14px] font-bold text-black uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {members.length > 0 ? (
                                members.map((member, index) => (
                                    <tr key={member.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="p-3 sm:p-4">
                                            <p className="text-[14px] font-bold text-black">
                                                {((page || 1) - 1) * (limit || 10) + index + 1}
                                            </p>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div>
                                                <p className="text-sm sm:text-sm font-medium text-black leading-tight">{member.name}</p>
                                                <p className="text-[10px] text-text-muted mt-0.5">Joined: {member.created_at ? new Date(member.created_at).toLocaleDateString() : '-'}</p>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm sm:text-sm font-medium text-black">{member.email}</p>
                                                <p className="text-[10px] text-text-muted">{member.phone}</p>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-center">
                                            <span className="px-2 py-0.5 sm:py-1 bg-foreground/10 text-foreground rounded-md text-[9px] sm:text-[10px] font-bold border border-foreground/10">
                                                {member.experience} Years
                                            </span>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <p className="text-[11px] sm:text-xs font-medium text-text-secondary font-mono">{member.emirates_id}</p>
                                        </td>
                                        <td className="p-3 sm:p-4">
                                            <div className="space-y-0.5">
                                                <p className="text-sm sm:text-sm font-medium text-black">{member.bank_name || '-'}</p>
                                                <p className="text-[9px] text-text-muted font-mono">{member.iban || '-'}</p>
                                            </div>
                                        </td>
                                        <td className="p-3 sm:p-4 text-right">
                                            <TeamActions id={String(member.id)} userId={member.user_id} role={role} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-text-muted italic">
                                        No {role}s found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <Pagination page={page} total={total} limit={limit} />
        </>
    );
}
