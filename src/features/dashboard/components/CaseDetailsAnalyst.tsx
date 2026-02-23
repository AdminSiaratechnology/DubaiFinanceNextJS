'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';

interface CaseDetailsAnalystProps {
    caseData: any;
    onClose: () => void;
}

export function CaseDetailsAnalyst({ caseData, onClose }: CaseDetailsAnalystProps) {
    const [notes, setNotes] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('bank');

    // Determine which view to show based on status
    const isPendingAcceptance = caseData.status === 'Pending Acceptance' ||
        caseData.status === 'Ready For Coordinator' ||
        caseData.status === 'Physical Docs Received';
    const readyToBank = caseData.status === 'Submitted to Bank';
    const underReview = caseData.status === 'Under Review';
    const approvedByBank = caseData.status === 'Approved';
    const rejectedByBank = caseData.status === 'Rejected';

    const handleStatusUpdate = () => {
        console.log('Updating status to:', selectedStatus, 'with notes:', notes);
        // Implement API call here
    };

    const summaryItems = [
        { icon: '📞', text: caseData.mobile },
        { icon: '✉️', text: caseData.email || `${caseData.name.toLowerCase().replace(' ', '.')}@email.com` },
        { icon: '🆔', text: caseData.emiratesId || '784-1234-5678901-1' },
        { icon: '🏢', text: caseData.employer || 'Etisalat UAE' },
        { icon: '💰', text: `AED ${caseData.salary || '18,500'}/month` },
        { icon: '📄', text: caseData.product },
        { icon: '📉', text: `Amount: AED ${caseData.amount}` },
        { icon: '📅', text: caseData.date },
    ];

    return (
        <Card noPadding className="h-full flex flex-col bg-background/50 dark:bg-background border-none shadow-none">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">

                {/* 1. Customer Summary Card */}
                <div className="bg-blue-soft/30 dark:bg-blue/5 border border-blue/10 dark:border-blue/20 rounded-xl p-6 space-y-4 shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-4">{caseData.name}</h3>

                    <div className="space-y-3">
                        {summaryItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-blue dark:text-blue-400">
                                <span className="text-sm opacity-80">{item.icon}</span>
                                <span className="text-base font-bold truncate">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Action Card (Conditional) */}
                {isPendingAcceptance ? (
                    <div className="rounded-xl border border-blue/20 dark:border-blue/30 overflow-hidden bg-card shadow-sm">
                        <div className="bg-blue p-5 text-white">
                            <h4 className="text-base font-black uppercase tracking-widest">Step 1: Accept Case</h4>
                            <p className="text-[10px] font-bold opacity-80 mt-1 uppercase">Review and accept this case</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="p-5 rounded-md bg-blue-soft/40 dark:bg-blue/10 border-2 border-dashed border-blue/20 dark:border-blue/30">
                                <div className="flex gap-4">
                                    <div className="shrink-0 text-blue mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12" y1="16" y2="16" /></svg>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-black text-blue uppercase tracking-wider">Physical Documents Received</p>
                                        <p className="text-[11px] font-bold text-blue/80 leading-relaxed uppercase">Confirm that you have received all physical documents from the telecaller before accepting this case.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-green text-white rounded-md font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-green/90 shadow-lg shadow-green/10 active:scale-[0.98] transition-all">
                                <span>✅</span>
                                Accept Case & Start Review
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl border border-purple/20 dark:border-purple/30 overflow-hidden bg-card shadow-sm">
                        <div className="bg-purple p-5 text-white">
                            <h4 className="text-base font-black uppercase tracking-widest">Case Management</h4>
                            <p className="text-[10px] font-medium opacity-90 mt-1 uppercase">Review documents and update status</p>
                        </div>

                        <div className="p-6 space-y-8">
                            <div className="space-y-4">
                                <div className="p-3 bg-muted/30 dark:bg-white/5 border border-border rounded-md flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-blue-soft dark:bg-blue/20 border border-blue/10 dark:border-blue/30 flex items-center justify-center text-blue">
                                            📄
                                        </div>
                                        <h5 className="text-xs font-black uppercase tracking-widest text-foreground">Submitted Documents</h5>
                                    </div>
                                </div>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto px-1 no-scrollbar">
                                    {[
                                        'Emirates ID (Front)', 'Emirates ID (Back)', 'Passport Copy',
                                        'Residence Visa', 'Salary Certificate', 'Bank Statement (3M)', 'Bank Statement (6M)', 'Trade License', 'Liability Letter', 'NOC From Employer', 'Security Cheque',
                                        'Utility Bill', 'Tenancy Contract'
                                    ].map(doc => (
                                        <div key={doc} className="flex items-center justify-between p-3 rounded-md border border-border bg-card dark:bg-card/40 hover:border-brand/30 transition-all duration-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-green/10 dark:bg-green/20 text-green flex items-center justify-center text-[8px]">
                                                    ✓
                                                </div>
                                                <span className="text-[11px] font-bold text-foreground">{doc}</span>
                                            </div>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-muted dark:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-text-muted dark:text-text-muted/80 hover:bg-brand/10 hover:text-brand transition-colors">
                                                👁️ View
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 pt-4 border-t border-border">
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-blue-light dark:text-blue-400">Update Case Status</Label>
                                        <Select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            options={[
                                                { value: 'under-review', label: 'Under Review' },
                                                { value: 'bank', label: 'Submit to Bank' },
                                                { value: 'missing-docs', label: 'Request Missing Docs' },
                                            ]}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Analysis Notes</Label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Add your review notes..."
                                            className="w-full h-32 p-4 bg-muted dark:bg-slate-900/50 border border-border rounded-md text-xs font-medium focus:ring-2 focus:ring-purple outline-none transition-all resize-none no-scrollbar"
                                        />
                                    </div>
                                </div>
                                {(underReview || approvedByBank || rejectedByBank) && (
                                    <div className="space-y-3 pt-6 border-t border-border">
                                        <button
                                            onClick={handleStatusUpdate}
                                            className="w-full py-4 bg-purple/80 text-white rounded-md font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-purple/90 shadow-lg shadow-purple/10 active:scale-[0.98] transition-all"
                                        >
                                            Submit Status Update
                                        </button>
                                    </div>
                                )}
                                {readyToBank && (
                                    <div className="space-y-3 pt-6 border-t border-border">
                                        <button
                                            onClick={handleStatusUpdate}
                                            className="w-full py-4 bg-purple text-white rounded-md font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-purple/90 shadow-lg shadow-purple/10 active:scale-[0.98] transition-all"
                                        >
                                            Submit Status Update
                                        </button>

                                        <button className="w-full py-4 bg-green text-white rounded-md font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-green/90 shadow-lg shadow-green/10 active:scale-[0.98] transition-all">
                                            Mark as Approved by Bank
                                        </button>

                                        <button className="w-full py-4 bg-red text-white rounded-md font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red/90 shadow-lg shadow-red/10 active:scale-[0.98] transition-all">
                                            Mark as Rejected by Bank
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-card dark:bg-white/5 border border-border text-foreground rounded-md font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-muted transition-all active:scale-[0.99]"
                >
                    Close
                </button>
            </div>
        </Card>
    );
}
