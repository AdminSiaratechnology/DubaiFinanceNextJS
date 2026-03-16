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
                            <h4 className="text-base font-black uppercase tracking-widest">Step 1: Case Intake</h4>
                            <p className="text-[10px] font-bold opacity-80 mt-1 uppercase">Review and accept this case or move to pending</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 rounded-md bg-blue-soft/40 dark:bg-blue/10 border-2 border-dashed border-blue/20 dark:border-blue/30">
                                <p className="text-[11px] font-bold text-blue leading-tight uppercase"><input type="checkbox" className="mr-1" checked={isDocumentsChecked} onChange={(e) => setIsDocumentsChecked(e.target.checked)} /> Confirm that you have received all physical documents before proceeding.</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleStatusChange('under_review')}
                                    disabled={updating || !isDocumentsChecked}
                                    className="w-full py-4 bg-green text-white rounded-md font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-green/90 shadow-lg shadow-green/10 active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {updating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                                    Start Review Now
                                </button>

                                {normalizedStatus === 'submitted_to_coordinator' && (
                                    <button
                                        onClick={() => handleStatusChange('pending_acceptance')}
                                        disabled={updating || !isDocumentsChecked}
                                        className="w-full py-3 bg-blue/10 text-blue border border-blue/20 rounded-md font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-blue/20 transition-all disabled:opacity-50"
                                    >
                                        Move to Pending Acceptance
                                    </button>
                                )}

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button
                                        onClick={() => handleStatusChange(caseData.telecaller_id ? 'sent_back_to_telecaller' : 'sent_back_to_agent')}
                                        disabled={updating}
                                        className="py-3 bg-muted dark:bg-white/5 text-text-muted rounded-md font-black uppercase tracking-widest text-[9px] hover:bg-brand/10 hover:text-brand transition-all"
                                    >
                                        Send Back
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('rejected')}
                                        disabled={updating}
                                        className="py-3 bg-red/5 text-red/60 border border-red/10 rounded-md font-black uppercase tracking-widest text-[9px] hover:bg-red hover:text-white transition-all"
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
                                    {documentsList.length > 0 ? (
                                        documentsList.map(doc => (
                                            <div key={doc.label} className="flex items-center justify-between p-3 rounded-md border border-border bg-card dark:bg-card/40 hover:border-brand/30 transition-all duration-200">
                                                <div className="flex items-center gap-3">
                                                    {doc.url ? (
                                                        <div className="w-5 h-5 rounded-full bg-green/10 dark:bg-green/20 text-green flex items-center justify-center text-[8px]">
                                                            ✓
                                                        </div>
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full bg-muted dark:bg-white/10 text-text-muted flex items-center justify-center text-[8px]">
                                                            —
                                                        </div>
                                                    )}
                                                    <span className={`text-[11px] font-bold ${doc.url ? 'text-foreground' : 'text-text-muted'}`}>{doc.label}</span>
                                                </div>
                                                {doc.url ? (
                                                    <button
                                                        onClick={() => window.open(doc.url!, '_blank')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-muted dark:bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-text-muted dark:text-text-muted/80 hover:bg-brand/10 hover:text-brand transition-colors"
                                                    >
                                                        👁️ View
                                                    </button>
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

                            <div className="space-y-6 pt-4 border-t border-border">
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-blue-light dark:text-blue-400">Update Case Status</Label>
                                        <Select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            options={statusOptions}
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
                                {statusMessage && (
                                    <div className={`p-3 rounded-md text-xs font-bold uppercase tracking-wider text-center ${statusMessage.type === 'success' ? 'bg-green/10 text-green border border-green/20' : 'bg-red/10 text-red border border-red/20'}`}>
                                        {statusMessage.text}
                                    </div>
                                )}

                                <div className="space-y-3 pt-6 border-t border-border">
                                    <button
                                        onClick={handleStatusUpdate}
                                        disabled={updating}
                                        className="w-full py-4 bg-purple text-white rounded-md font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-purple/90 shadow-lg shadow-purple/10 active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {updating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                                        {updating ? 'Updating...' : 'Submit Status Update'}
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleStatusChange(caseData.telecaller_id ? 'sent_back_to_telecaller' : 'sent_back_to_agent')}
                                            disabled={updating}
                                            className="py-3 bg-muted dark:bg-white/5 text-text-muted rounded-md font-black uppercase tracking-widest text-[9px] hover:bg-brand/10 hover:text-brand transition-all"
                                        >
                                            {caseData.telecaller_id ? 'Back to Telecaller' : 'Back to Agent'}
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange('rejected')}
                                            disabled={updating}
                                            className="py-3 bg-red/5 text-red/60 border border-red/10 rounded-md font-black uppercase tracking-widest text-[9px] hover:bg-red hover:text-white transition-all"
                                        >
                                            Reject Case
                                        </button>
                                    </div>
                                </div>
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
