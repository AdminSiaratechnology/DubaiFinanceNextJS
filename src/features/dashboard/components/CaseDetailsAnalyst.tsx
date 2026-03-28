'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { updateCaseStatus } from './api/agent.api';

interface CaseDetailsAnalystProps {
    caseData: any;
    onClose: () => void;
    onStatusUpdate?: () => void;
}

// Map API document URL keys to human-friendly labels
const docKeyToLabel: Record<string, string> = {
    emirates_id_front_url: 'Emirates ID (Front)',
    emirates_id_back_url: 'Emirates ID (Back)',
    passport_copy_url: 'Passport Copy',
    residencevisa_url: 'Residence Visa',
    salary_certificate_url: 'Salary Certificate',
    bank_statement_last_3_months_url: 'Bank Statement (3M)',
    bank_statement_last_6_months_url: 'Bank Statement (6M)',
    trade_license_url: 'Trade License',
    liability_letter_url: 'Liability Letter',
    noc_from_employer_url: 'NOC From Employer',
    security_cheque_url: 'Security Cheque',
    utility_bill_url: 'Utility Bill',
    tenancy_contract_url: 'Tenancy Contract',
    proof_of_address_url: 'Proof of Address',
    last_3_month_payslips_url: 'Payslips (3M)',
    last_6_month_payslips_url: 'Payslips (6M)',
    company_id_card_url: 'Company ID Card',
    labor_contract_url: 'Labor Contract',
    employment_letter_url: 'Employment Letter',
    bank_account_statement_url: 'Bank Account Statement',
    credit_report_url: 'Credit Report',
    existing_loan_statement_url: 'Existing Loan Statement',
    property_document_url: 'Property Document',
    vehicle_registration_url: 'Vehicle Registration',
    business_plan_url: 'Business Plan',
    financial_statement_url: 'Financial Statement',
    tax_return_url: 'Tax Return',
    memorandum_of_association_url: 'Memorandum of Association',
};

// Build documents list from API data
function getDocumentsList(caseData: any): { label: string; url: string | null }[] {
    const docs = caseData.documents;
    if (!docs || !Array.isArray(docs) || docs.length === 0) return [];
    const docObj = docs[0]; // API returns array with single object
    return Object.entries(docKeyToLabel).map(([key, label]) => ({
        label,
        url: docObj?.[key] || null,
    }));
}

export function CaseDetailsAnalyst({ caseData, onClose, onStatusUpdate }: CaseDetailsAnalystProps) {
    const [notes, setNotes] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [updating, setUpdating] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [isDocumentsChecked, setIsDocumentsChecked] = useState(false);
    // Determine which view to show based on status
    const normalizedStatus = (caseData.status || '').toLowerCase().replaceAll(' ', '_');

    // Get dynamic options based on status
    const getStatusOptions = () => {
        const options: { value: string; label: string }[] = [];
        const s = normalizedStatus;

        // Status-specific transitions
        if (s === 'submitted_to_coordinator' || s === 'ready_for_coordinator' || s === 'physical_docs_received') {
            options.push({ value: 'pending_acceptance', label: 'Pending Acceptance' });
            options.push({ value: 'under_review', label: 'Under Review' });
        } else if (s === 'pending_acceptance') {
            options.push({ value: 'under_review', label: 'Under Review' });
        } else if (s === 'under_review') {
            options.push({ value: 'submitted_to_bank', label: 'Submit to Bank' });
        } else if (s === 'submitted_to_bank') {
            options.push({ value: 'approved', label: 'Approved by Bank' });
            options.push({ value: 'rejected', label: 'Rejected by Bank' });
        }

        // Common options (Send back / Reject)
        if (caseData.telecaller_id) {
            options.push({ value: 'sent_back_to_telecaller', label: 'Send back to Telecaller' });
        } else {
            options.push({ value: 'sent_back_to_agent', label: 'Send back to Agent' });
        }

        // Add Rejected if not already present (it's in submitted_to_bank list already)
        if (!options.find(o => o.value === 'rejected')) {
            options.push({ value: 'rejected', label: 'Rejected' });
        }

        return options;
    };

    const statusOptions = getStatusOptions();

    // Set default selected status if empty
    React.useEffect(() => {
        if (!selectedStatus && statusOptions.length > 0) {
            setSelectedStatus(statusOptions[0].value);
        }
    }, [statusOptions, selectedStatus]);
    const isPendingAcceptance = normalizedStatus === 'pending_acceptance' ||
        normalizedStatus === 'submitted_to_coordinator' ||
        normalizedStatus === 'ready_for_coordinator' ||
        normalizedStatus === 'physical_docs_received';
    const readyToBank = normalizedStatus === 'submitted_to_bank';
    const underReview = normalizedStatus === 'under_review';
    const approvedByBank = normalizedStatus === 'approved';
    const rejectedByBank = normalizedStatus === 'rejected';
    const isFinalized = approvedByBank || rejectedByBank;

    const caseId = Number(caseData.id);

    const handleStatusChange = async (status: string) => {
        setUpdating(true);
        setStatusMessage(null);
        try {
            await updateCaseStatus(caseId, status, notes || undefined);
            setStatusMessage({ type: 'success', text: `Status updated to "${status.replaceAll('_', ' ')}" successfully!` });
            setNotes('');
            onStatusUpdate?.();
        } catch (err: any) {
            const msg = err?.response?.data?.detail || err?.message || 'Failed to update status';
            setStatusMessage({ type: 'error', text: typeof msg === 'string' ? msg : 'Failed to update status' });
        } finally {
            setUpdating(false);
        }
    };

    const handleStatusUpdate = () => {
        handleStatusChange(selectedStatus);
    };

    const documentsList = getDocumentsList(caseData);

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
                <div className="bg-foreground/5 border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                    <div>
                        <h3 className="text-xl sm:text-3xl font-medium text-foreground leading-tight">{caseData.name}</h3>
                        {/* <p className="text-[12px] sm:text-sm text-text-muted italic mt-1 uppercase tracking-widest font-medium opacity-80">
                            Case ID: #{caseData.id} • {caseData.date}
                        </p> */}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {summaryItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-foreground">
                                <span className="text-sm opacity-60">{item.icon}</span>
                                <span className="text-[12px] sm:text-sm font-bold truncate tracking-tight">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Action Card (Conditional) */}
                {isPendingAcceptance ? (
                    <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
                        <div className="bg-foreground p-6 text-background">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">Step 1: Case Intake</h4>
                            <h5 className="text-xl font-medium">Review and Accept Case</h5>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 rounded-xl bg-foreground/5 border-2 border-dashed border-border group-hover:border-foreground/20 transition-all">
                                <p className="text-[11px] font-bold text-foreground leading-tight uppercase flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4 rounded border-border text-foreground focus:ring-foreground/20" checked={isDocumentsChecked} onChange={(e) => setIsDocumentsChecked(e.target.checked)} />
                                    Confirm that you have received all physical documents before proceeding.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleStatusChange('under_review')}
                                    disabled={updating || !isDocumentsChecked}
                                    className="w-full h-12 bg-foreground text-background rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-foreground/90 shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updating ? <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : null}
                                    Start Review Now
                                </button>

                                {normalizedStatus === 'submitted_to_coordinator' && (
                                    <button
                                        onClick={() => handleStatusChange('pending_acceptance')}
                                        disabled={updating || !isDocumentsChecked}
                                        className="w-full h-12 bg-blue/10 text-blue border border-blue/20 rounded-[14px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-blue/20 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        Move to Pending Acceptance
                                    </button>
                                )}

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <button
                                        onClick={() => handleStatusChange(caseData.telecaller_id ? 'sent_back_to_telecaller' : 'sent_back_to_agent')}
                                        disabled={updating}
                                        className="h-12 bg-muted text-text-muted rounded-[14px] font-black uppercase tracking-widest text-[9px] hover:bg-blue/5 hover:text-blue border border-border transition-all active:scale-95 shadow-sm"
                                    >
                                        Send Back
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('rejected')}
                                        disabled={updating}
                                        className="h-12 bg-red/5 text-red/60 border border-red/20 rounded-[14px] font-black uppercase tracking-widest text-[9px] hover:bg-red hover:text-white transition-all active:scale-95 shadow-sm"
                                    >
                                        Quick Reject
                                    </button>
                                </div>
                            </div>
                            {statusMessage && (
                                <div className={`p-3 rounded-md text-xs font-bold uppercase tracking-wider text-center ${statusMessage.type === 'success' ? 'bg-green/10 text-green border border-green/20' : 'bg-red/10 text-red border border-red/20'}`}>
                                    {statusMessage.text}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
                        <div className="bg-foreground p-6 text-background">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">Workflow Status</h4>
                            <h5 className="text-xl font-medium">Case Management</h5>
                        </div>

                        <div className="p-6 space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 border-b border-border pb-3">
                                    <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                    </div>
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-foreground">Submitted Documents</h4>
                                </div>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto px-1 no-scrollbar">
                                    {documentsList.length > 0 ? (
                                        documentsList.map(doc => (
                                            <div key={doc.label} className="flex items-center justify-between p-3 rounded-md border border-border bg-card dark:bg-card/40 hover:border-brand/30 transition-all duration-200">
                                                <div className="flex items-center gap-3">
                                                    {doc.url ? (
                                                        <div className="w-5 h-5 rounded-full bg-green/10 dark:bg-green/20 text-green flex items-center justify-center text-[8px]">
                                                            ✓
                                                        </div>
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full bg-muted dark:bg-card/10 text-text-muted flex items-center justify-center text-[8px]">
                                                            —
                                                        </div>
                                                    )}
                                                    <span className={`text-[11px] font-bold ${doc.url ? 'text-foreground' : 'text-text-muted'}`}>{doc.label}</span>
                                                </div>
                                                {doc.url ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => window.open(doc.url!, '_blank')}
                                                            className="flex items-center gap-1.5 px-3 py-2 bg-foreground/5 border border-border rounded-xl text-[9px] font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all active:scale-95 whitespace-nowrap"
                                                        >
                                                            👁️ View
                                                        </button>
                                                        <a
                                                            href={doc.url}
                                                            download
                                                            className="flex items-center gap-1.5 px-3 py-2 bg-foreground/5 border border-border rounded-xl text-[9px] font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all active:scale-95 whitespace-nowrap cursor-pointer decoration-none!"
                                                        >
                                                            ⬇️ Download
                                                        </a>

                                                    </div>
                                                ) : (
                                                    <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-text-muted/50">
                                                        Not Uploaded
                                                    </span>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center text-text-muted text-xs font-bold uppercase tracking-widest opacity-50">
                                            No documents available
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isFinalized ? (
                                <div className="space-y-6 pt-4 border-t border-border">
                                    <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 text-center space-y-2">
                                        <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${approvedByBank ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
                                            {approvedByBank ? '✓' : '✕'}
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-foreground">
                                            Case {approvedByBank ? 'Approved' : 'Rejected'}
                                        </h4>
                                        <p className="text-xs text-text-muted font-medium">This case has reached a final status and can no longer be modified.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 pt-4 border-t border-border">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Update Case Status</Label>
                                            <select
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                className="w-full h-11 px-4 bg-muted border border-border rounded-xl text-xs font-bold focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
                                            >
                                                {statusOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Analysis Notes</Label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Add your review notes..."
                                                className="w-full h-32 p-4 bg-muted dark:bg-slate-900/50 border border-border rounded-xl text-xs font-medium focus:ring-2 focus:ring-foreground/20 outline-none transition-all resize-none no-scrollbar"
                                            />
                                        </div>
                                    </div>
                                    {statusMessage && (
                                        <div className={`p-3 rounded-md text-xs font-bold uppercase tracking-wider text-center ${statusMessage.type === 'success' ? 'bg-green/10 text-green border border-green/20' : 'bg-red/10 text-red border border-red/20'}`}>
                                            {statusMessage.text}
                                        </div>
                                    )}

                                    <div className="space-y-4 pt-6 border-t border-border">
                                        <button
                                            onClick={handleStatusUpdate}
                                            disabled={updating}
                                            className="w-full h-14 bg-foreground text-background rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-foreground/90 shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {updating ? <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : null}
                                            {updating ? 'Updating...' : 'Submit Status Update'}
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => handleStatusChange(caseData.telecaller_id ? 'sent_back_to_telecaller' : 'sent_back_to_agent')}
                                                disabled={updating}
                                                className="h-12 bg-muted text-text-muted rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-foreground/5 hover:text-foreground border border-border transition-all active:scale-95 shadow-sm"
                                            >
                                                {caseData.telecaller_id ? 'Back to Telecaller' : 'Back to Agent'}
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange('rejected')}
                                                disabled={updating}
                                                className="h-12 bg-red/10 text-red border border-red/20 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-red hover:text-white transition-all active:scale-95 shadow-lg shadow-red/20"
                                            >
                                                Reject Case
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="w-full h-12 bg-card dark:bg-card/5 border border-border text-foreground rounded-[14px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-muted transition-all active:scale-95 shadow-sm"
                >
                    Close
                </button>
            </div>
        </Card>
    );
}
