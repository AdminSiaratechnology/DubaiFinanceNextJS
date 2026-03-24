"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Label, Input, Select } from "@/components/ui/Form";
import { FileUploader } from "@/shared/FileUploader";
import { ApiSearchableSelect } from "@/shared/ApiSearchableSelect";

import { getBanks } from "@/features/owner/bank/api/bank.api";
import { getBankProductByBankId } from "@/features/owner/bankproducts/api/bankproducts.api";
import { Case, submitCompleteCase, updateCase } from "./api/agent.api";
import { toast } from "sonner";

interface LeadDetailsProps {
  lead: {
    id: number;
    customer_name: string;
    mobile_number: string;
    email?: string;
    requested_amount?: number;
    product?: {
      id: number;
      product_name: string;
    };
    bank?: {
      id: number;
      name: string;
    };
  };
  caseData?: Case | null;
  onClose: () => void;
  readOnly?: boolean;
}

const requiredDocs = [
  { id: "emirates_id_front", label: "Emirates ID (Front) *" },
  { id: "emirates_id_back", label: "Emirates ID (Back) *" },
  { id: "passport_copy", label: "Passport Copy *" },
  { id: "residence_visa", label: "Residence Visa *" },
  { id: "salary_certificate", label: "Salary Certificate *" },
  { id: "bank_statement_last_3_months", label: "Bank Statements (Last 3 Months) *" },
  { id: "bank_statement_last_6_months", label: "Bank Statements (Last 6 Months) *" },
  { id: "trade_license", label: "Trade License *" },
  { id: "liability_letter", label: "Liability Letter" },
  { id: "noc_from_employer", label: "NOC From Employer" },
  { id: "security_cheque", label: "Security Cheque" },
  { id: "utility_bill", label: "Utility Bill" },
  { id: "tenancy_contract", label: "Tenancy Contract" },
  { id: "proof_of_address", label: "Proof of Address" },
  { id: "last_3_month_payslips", label: "Last 3 Months Payslip" },
  { id: "last_6_month_payslips", label: "Last 6 Months Payslip" },
  { id: "company_id_card", label: "Company ID Card" },
  { id: "labor_contract", label: "Labor Contract" },
  { id: "employment_letter", label: "Employment Letter" },
  { id: "bank_account_statement", label: "Bank Account Statement (Personal)" },
  { id: "credit_report", label: "Credit Report" },
  { id: "existing_loan_statement", label: "Existing Loan Statements" },
  { id: "property_document", label: "Property Documents (if applicable)" },
  { id: "vehicle_registration", label: "Vehicle Registration (for Auto Loan)" },
  { id: "business_plan", label: "Business Plan (for Business Loan)" },
  { id: "financial_statement", label: "Financial Statements (Last 2 Years)" },
  { id: "tax_return", label: "Tax Returns" },
  { id: "memorandum_of_association", label: "(MOA) Memorandum of Association" },
];

const lockedStatuses = ["submitted_to_coordinator", "under_review", "approved", "rejected", "more_info_required"];

const formatStatus = (s: string) => s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const getStatusOptions = (currentStatus?: string, hasCase?: boolean) => {
  if (currentStatus && lockedStatuses.includes(currentStatus)) {
    return [{ value: currentStatus, label: formatStatus(currentStatus) }];
  }

  let options = hasCase ? [
    { value: "documents_collected", label: "Documents Collected" },
    { value: "follow_up", label: "Follow Up Required" },
    { value: "documents_required", label: "Documents Required" },
    { value: "submitted_to_coordinator", label: "Submitted to Coordinator" },
  ] : [
    { value: "sent_back_to_agent", label: "Sent Back to Agent" },
    { value: "documents_collected", label: "Documents Collected" },
    { value: "follow_up", label: "Follow Up Required" },
    { value: "documents_required", label: "Documents Required" },
    { value: "submitted_to_coordinator", label: "Submitted to Coordinator" },
  ];

  if (currentStatus && !options.find(o => o.value === currentStatus)) {
    options = [{ value: currentStatus, label: formatStatus(currentStatus) }, ...options];
  }

  return options;
};

export function LeadDetails({ lead, caseData, onClose, readOnly = false }: LeadDetailsProps) {

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: lead.customer_name || "",
    mobile: lead.mobile_number || "",
    email: lead.email || "",
    amount: lead.requested_amount?.toString() || "",

    employer_name: "",
    salary: "",
    emirates_id: "",

    bank_id: lead.bank?.id?.toString() || "",
    product_id: lead.product?.id?.toString() || "",
    notes: caseData?.notes || "",
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [status, setStatus] = useState("sent_back_to_agent");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLocked = lockedStatuses.includes(status);

  // ✅ Optimized update function
  const updateField = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Sync form when case loads
  useEffect(() => {
    if (!caseData) return;
    setFormData({
      name: caseData.customer_name || lead.customer_name || "",
      mobile: caseData.mobile_number || lead.mobile_number || "",
      email: caseData.email || lead.email || "",
      amount: (caseData.requested_amount || lead.requested_amount || "").toString(),

      employer_name: caseData.company_name || "",
      salary: caseData.salary != null ? String(caseData.salary) : "",
      emirates_id: caseData.emirates_id || "",

      bank_id: (caseData.bank?.id || lead.bank?.id || "").toString(),
      product_id: (caseData.product?.id || lead.product?.id || "").toString(),
      notes: caseData.notes || "",
    });

    setStatus(caseData.status || "documents_pending");

  }, [caseData, lead]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateField(e.target.name as any, e.target.value);
  };

  const handleFileChange = (id: string, file: File | null) => {
    setFiles(prev => {
      if (file) return { ...prev, [id]: file };
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const fetchProducts = async () => {
    if (!formData.bank_id) {
      return { items: [], total: 0, page: 1, limit: 10 };
    }

    const data = await getBankProductByBankId(Number(formData.bank_id));

    return {
      items: data,
      total: data.length,
      page: 1,
      limit: data.length,
    };
  };

  const handleSubmitCase = async (statusToSend: string) => {
    try {
      setIsSubmitting(true);

      const multipart = new FormData();

      multipart.append("customer_name", formData.name);
      multipart.append("mobile_number", formData.mobile);
      multipart.append("email", formData.email);
      multipart.append("employer_name", formData.employer_name);
      multipart.append("monthly_salary", String(formData.salary));
      multipart.append("bank_id", String(formData.bank_id));
      multipart.append("product_id", String(formData.product_id));
      multipart.append("requested_amount", String(formData.amount));
      multipart.append("emirates_id", formData.emirates_id);
      multipart.append("status", statusToSend);
      multipart.append("notes", formData.notes);

      Object.entries(files).forEach(([id, file]) => {
        if (file) multipart.append(id, file);
      });

      if (caseData) {
        await updateCase(caseData.id, multipart);
      } else {
        multipart.append("lead_id", String(lead.id));
        await submitCompleteCase(multipart);
      }

      const getSuccessMessage = (status: string, hasCase: boolean) => {
        if (status === "sent_back_to_agent") return "Sent back to agent";
        if (status === "submitted_to_coordinator") return "Submitted to coordinator";
        return hasCase ? "Case updated successfully" : "Case created successfully";
      };

      toast.success(getSuccessMessage(statusToSend, !!caseData));
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  const isFormValid = !!(formData.name.trim() && formData.mobile.trim() && formData.email.trim());

  return (
    <Card noPadding className="h-full flex flex-col relative border-none shadow-soft bg-card ">
      {/* Header */}
      <div className="bg-card backdrop-blur-md p-5 sm:p-8 border-b border-border flex flex-col sticky top-0 z-20">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-5 sm:right-5 p-1 hover:bg-red/10 text-text-muted hover:text-red rounded-xl transition-all duration-200 z-30 shadow-sm cursor-pointer"
          title="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-foreground/10 flex items-center justify-center text-foreground shadow-sm ring-1 ring-foreground/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <div>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight text-foreground leading-tight">Lead Information</h3>
            <p className="text-[14px] sm:text-base italic font-bold text-text-muted mt-0.5">
              {lead.product?.product_name || "General inquiry"} • {lead.bank?.name || "Multiple Banks"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-12 no-scrollbar scroll-smooth bg-card">
        {/* Customer Information */}
        <section className="space-y-8">
          <div className="flex justify-between items-end border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-foreground/10 text-foreground shrink-0 mt-1 sm:mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <h4 className="text-[13px] uppercase font-black tracking-widest text-foreground">Primary Details</h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.preventDefault(); if (formData.mobile) window.location.href = `tel:${formData.mobile}`; }}
                className="p-2 sm:px-3 sm:py-1.5 flex items-center justify-center gap-1.5 border border-border bg-card rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm"
                title="Call"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span className="hidden sm:inline">Call</span>
              </button>

              <button
                onClick={(e) => { e.preventDefault(); if (formData.email) window.location.href = `mailto:${formData.email}`; }}
                className="p-2 sm:px-3 sm:py-1.5 flex items-center justify-center gap-1.5 border border-border bg-card rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all active:scale-95 shadow-sm"
                title="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <span className="hidden sm:inline">Email</span>
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                disabled={readOnly || isLocked}
                className={`
                  px-3 sm:px-4 py-1.5 flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                  ${isEditing
                    ? "bg-red/10 text-red border border-red/20 shadow-sm"
                    : "bg-card hover:bg-foreground/5 hover:text-foreground border border-border shadow-sm font-bold"
                  }
                  ${(readOnly) ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {isEditing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                )}
                {isEditing ? "Discard Changes" : "Edit Details"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Full Name <span className="text-red-500">*</span></Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-11 rounded-xl! transition-all focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Mobile Number <span className="text-red-500">*</span></Label>
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-11 rounded-xl! transition-all focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Email Address <span className="text-red-500">*</span></Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-11 rounded-xl! transition-all focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Emirates ID</Label>
              <Input
                name="emirates_id"
                value={formData.emirates_id}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-11 rounded-xl transition-all focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Employer / Company</Label>
              <Input
                name="employer_name"
                value={formData.employer_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-11 rounded-xl! transition-all focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Monthly Salary (AED)</Label>
              <Input
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-11 rounded-xl! transition-all focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Requested Amount</Label>
              <Input
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-11 rounded-xl! transition-all focus:ring-foreground/20 font-bold"
              />
            </div>

            <div className="space-y-2">
              <ApiSearchableSelect
                label="Select Bank"
                required
                fetchFn={getBanks as any}
                value={formData.bank_id}
                initialOptions={(() => {
                  const options = [];
                  if (lead.bank?.id) options.push({ id: lead.bank.id, name: lead.bank.name });
                  if (caseData?.bank?.id) options.push({ id: caseData.bank.id, name: caseData.bank.name });
                  return options;
                })()}
                onChange={(val) => {
                  updateField("bank_id", String(val));
                  updateField("product_id", "");
                }}
                placeholder="Search bank..."
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <ApiSearchableSelect
                label="Select Product"
                required
                fetchFn={fetchProducts}
                labelKey="product_name"
                value={formData.product_id}
                initialOptions={(() => {
                  const options = [];
                  if (lead.product?.id) options.push({ id: lead.product.id, product_name: lead.product.product_name });
                  if (caseData?.product?.id) options.push({ id: caseData.product.id, product_name: caseData.product.product_name });
                  return options;
                })()}
                onChange={(val) => updateField("product_id", String(val))}
                placeholder="Search product..."
                disabled={!isEditing || !formData.bank_id}
              />
            </div>

          </div>
        </section>

        {/* Documentation Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="p-2 rounded-lg bg-foreground/10 text-foreground shrink-0 mt-1 sm:mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            </div>
            <h4 className="text-[13px] uppercase font-black tracking-widest text-foreground">Documentation Vault</h4>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {requiredDocs.map(doc => {
              let docUrl = null;
              if (caseData?.documents && caseData.documents.length > 0) {
                const docData = caseData.documents[0];
                const expectedKey = `${doc.id}_url`;
                const alternateKey = doc.id === "residence_visa" ? "residencevisa_url" : expectedKey;
                docUrl = docData[alternateKey] || null;
              }

              return (
                <div key={doc.id} className="bg-muted/10 p-4 rounded-2xl border border-border/50 hover:border-foreground/20 transition-all duration-300">
                  <FileUploader
                    id={doc.id}
                    label={doc.label}
                    file={files[doc.id] || null}
                    previewUrl={docUrl}
                    onChange={handleFileChange}
                    color="foreground"
                    disabled={readOnly || isLocked}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Workflow Status */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="p-2 rounded-lg bg-foreground/10 text-foreground shrink-0 mt-1 sm:mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            </div>
            <h4 className="text-[13px] uppercase font-black tracking-widest text-foreground">Workflow Intelligence</h4>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Stage Alignment</Label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={getStatusOptions(status, !!caseData)}
                disabled={readOnly || isLocked}
                className="h-11 rounded-xl! font-bold text-foreground bg-foreground/5 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-text-primary">Internal Notes</Label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange as any}
                disabled={readOnly || !isEditing}
                placeholder="Describe any specific observations or pending requirements..."
                className="w-full min-h-[120px] p-4 rounded-xl border border-border bg-card text-sm focus:ring-2 focus:ring-foreground/20 outline-none transition-all resize-none disabled:bg-muted/50 disabled:text-text-muted"
              />
            </div>
          </div>
        </section>
      </div>

      {!readOnly && (
        <div className="p-6 sm:p-8 bg-card border-t border-border flex flex-col gap-4 sticky bottom-0 z-20 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
          <div className="w-full grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSubmitCase(status)}
              disabled={isSubmitting || !isFormValid}
              className="h-12 flex items-center justify-center gap-2 border-2 border-foreground bg-transparent text-foreground rounded-[14px] text-xs font-black uppercase tracking-widest hover:bg-foreground/5 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              {isSubmitting ? "Syncing..." : "Update Progress"}
            </button>

            <button
              onClick={() => handleSubmitCase("submitted_to_coordinator")}
              disabled={isSubmitting || !isFormValid || status !== "submitted_to_coordinator"}
              className="h-12 flex items-center justify-center gap-2 bg-foreground text-background rounded-[14px] text-xs font-black uppercase tracking-widest shadow-lg shadow-foreground/20 hover:bg-foreground/90 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              Submit to Coordinator
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}