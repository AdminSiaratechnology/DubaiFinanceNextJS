"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Label, Input, Select } from "@/components/ui/Form";
import { FileUploader } from "@/shared/FileUploader";
import { ApiSearchableSelect } from "@/shared/ApiSearchableSelect";

import { getBanks } from "@/features/owner/bank/api/bank.api";
import { getBankProductByBankId } from "@/features/owner/bankproducts/api/bankproducts.api";
import { Case, submitCompleteCase, updateCase } from "./api/agent.api";

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

export function LeadDetails({ lead, caseData, onClose }: LeadDetailsProps) {

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
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [status, setStatus] = useState("documents_pending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Sync form when case loads
  useEffect(() => {
    if (!caseData) return;

    setFormData({
      name: caseData.customer_name || lead.customer_name || "",
      mobile: caseData.mobile_number || lead.mobile_number || "",
      email: caseData.email || lead.email || "",
      amount: (caseData.requested_amount || lead.requested_amount || "").toString(),

      employer_name: caseData.company_name || "",
      salary: (caseData.salary || "").toString(),
      emirates_id: caseData.emirates_id || "",

      bank_id: (caseData.bank?.id || lead.bank?.id || "").toString(),
      product_id: (caseData.product?.id || lead.product?.id || "").toString(),
    });

    setStatus(caseData.status || "documents_pending");

  }, [caseData, lead]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      Object.entries(files).forEach(([id, file]) => {
        if (file) multipart.append(id, file);
      });

      if (caseData) {
        await updateCase(caseData.id, multipart);
      } else {
        multipart.append("lead_id", String(lead.id));
        await submitCompleteCase(multipart);
      }

      alert(caseData ? "Case updated successfully" : "Case created successfully");

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card noPadding className="h-full flex flex-col">
      <div className="bg-green-soft/30 p-4 border-b border-border flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Lead Details</h3>

          <span className="text-xs text-text-muted">
            {lead.product?.product_name} • {lead.bank?.name}
          </span>

          {/* {caseData && (
            <div className="mt-1">
              <span className="text-[10px] px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
                Case Created • {caseData.status}
              </span>
            </div>
          )} */}
        </div>

        <button onClick={onClose} className="p-2 hover:bg-red-soft rounded-2xl">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10">
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-bold">Customer Information</h4>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-1 py-0.5 border rounded text-xs"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <Label>Full Name</Label>
              <Input name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing}/>
            </div>

            <div>
              <Label>Mobile</Label>
              <Input name="mobile" value={formData.mobile} onChange={handleInputChange} disabled={!isEditing}/>
            </div>

            <div>
              <Label>Email</Label>
              <Input name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing}/>
            </div>

            <div>
              <Label>Emirates ID</Label>
              <Input name="emirates_id" value={formData.emirates_id} onChange={handleInputChange} disabled={!isEditing}/>
            </div>

            <div>
              <Label>Employer</Label>
              <Input name="employer_name" value={formData.employer_name} onChange={handleInputChange} disabled={!isEditing}/>
            </div>

            <div>
              <Label>Salary</Label>
              <Input name="salary" type="number" value={formData.salary} onChange={handleInputChange} disabled={!isEditing}/>
            </div>

            <div>
              <Label>Requested Amount</Label>
              <Input name="amount" value={formData.amount} onChange={handleInputChange} disabled={!isEditing}/>
            </div>

            <div>
              <Label>Select Bank *</Label>
              <ApiSearchableSelect
                fetchFn={getBanks as any}
                value={formData.bank_id}
                initialOptions={(() => {
                  const options = [];
                  if (lead.bank?.id) options.push({ id: lead.bank.id, name: lead.bank.name });
                  if (caseData?.bank?.id) options.push({ id: caseData.bank.id, name: caseData.bank.name });
                  return options;
                })()}
                onChange={(val) =>
                  setFormData(prev => ({ ...prev, bank_id: String(val), product_id: "" }))
                }
                placeholder="Search bank..."
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label>Select Product *</Label>
              <ApiSearchableSelect
                fetchFn={fetchProducts}
                labelKey="product_name"
                value={formData.product_id}
                initialOptions={(() => {
                  const options = [];
                  if (lead.product?.id) options.push({ id: lead.product.id, product_name: lead.product.product_name });
                  if (caseData?.product?.id) options.push({ id: caseData.product.id, product_name: caseData.product.product_name });
                  return options;
                })()}
                onChange={(val) =>
                  setFormData(prev => ({ ...prev, product_id: String(val) }))
                }
                placeholder="Search product..."
                disabled={!isEditing || !formData.bank_id}
              />
            </div>

          </div>

        </section>

        <section className="space-y-6">
          <h4 className="font-bold">Upload Documents</h4>

          {requiredDocs.map(doc => {
            let docUrl = null;
            if (caseData?.documents && caseData.documents.length > 0) {
              const docData = caseData.documents[0];
              const expectedKey = `${doc.id}_url`;
              const alternateKey = doc.id === "residence_visa" ? "residencevisa_url" : expectedKey;
              docUrl = docData[alternateKey] || null;
            }

            return (
              <FileUploader
                key={doc.id}
                id={doc.id}
                label={doc.label}
                file={files[doc.id] || null}
                previewUrl={docUrl}
                onChange={handleFileChange}
                color="blue"
              />
            );
          })}
        </section>

        <section className="space-y-6">
          <h4 className="font-bold">Update Status</h4>

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "documents_pending", label: "Documents Pending" },
              { value: "documents_collected", label: "Documents Collected" },
              { value: "follow_up", label: "Follow Up Required" },
              { value: "submitted_to_coordinator", label: "Submitted to Coordinator" },
              { value: "documents_required", label: "Documents Required" }
            ]}
          />
        </section>

      </div>

      <div className="p-6 border-t border-border grid grid-cols-2 gap-4">

        <button
          onClick={() => handleSubmitCase(status)}
          disabled={isSubmitting}
          className="py-3 px-4 bg-brand text-white rounded-xl text-xs font-bold"
        >
          {isSubmitting ? "Submitting..." : "Update Status"}
        </button>

        <button
          onClick={() => handleSubmitCase("submitted_to_coordinator")}
          disabled={isSubmitting || status !== "submitted_to_coordinator"}
          className="py-3 px-4 bg-green text-white rounded-xl text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit to Coordinator
        </button>

        <button className="py-3 px-4 border border-border rounded-xl text-xs font-bold">
          Call
        </button>

        <button className="py-3 px-4 border border-border rounded-xl text-xs font-bold">
          Email
        </button>

      </div>

    </Card>
  );
}