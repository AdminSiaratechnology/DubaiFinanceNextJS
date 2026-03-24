import { apiClient } from "@/lib/api/client";

export interface TopProduct {
    id: number;
    product_name: string;
    total_cases: number;
    total_leads: number;
    approved_cases: number;
    approval_ratio: number;
    avg_ticket_size: number;
    total_revenue: number;
}

export const topProductsApi = async (): Promise<TopProduct[]> => {
    const response = await apiClient.get("/dashboard/top-products");
    return response.data?.data ?? [];
};

export interface OwnerCaseDocument {
    emirates_id_front_url: string | null;
    emirates_id_back_url: string | null;
    passport_copy_url: string | null;
    residencevisa_url: string | null;
    salary_certificate_url: string | null;
    bank_statement_last_3_months_url: string | null;
    bank_statement_last_6_months_url: string | null;
    trade_license_url: string | null;
    liability_letter_url: string | null;
    noc_from_employer_url: string | null;
    security_cheque_url: string | null;
    utility_bill_url: string | null;
    tenancy_contract_url: string | null;
    proof_of_address_url: string | null;
    last_3_month_payslips_url: string | null;
    last_6_month_payslips_url: string | null;
    company_id_card_url: string | null;
    labor_contract_url: string | null;
    employment_letter_url: string | null;
    bank_account_statement_url: string | null;
    credit_report_url: string | null;
    existing_loan_statement_url: string | null;
    property_document_url: string | null;
    vehicle_registration_url: string | null;
    business_plan_url: string | null;
    financial_statement_url: string | null;
    tax_return_url: string | null;
    memorandum_of_association_url: string | null;
    [key: string]: string | null;
}

export interface OwnerCase {
    id: number;
    agent_id: number;
    customer_name: string;
    mobile_number: string;
    email: string;
    product: { id: number; product_name: string } | null;
    bank: { id: number; name: string } | null;
    requested_amount: number;
    salary: number;
    company_name: string;
    emirates_id: string;
    passport_no: string | null;
    status: string;
    created_at: string;
    notes: string | null;
    analysis_notes: string | null;
    coordinator_id: number | null;
    telecaller_id: number | null;
    documents: OwnerCaseDocument[];
}

export interface OwnerCasesResponse {
    total: number;
    page: number;
    limit: number;
    items: OwnerCase[];
}

export const getAllCases = async (
    page: number = 1,
    limit: number = 10,
    search?: string
): Promise<OwnerCasesResponse> => {
    const response = await apiClient.get("/cases/", {
        params: { page, limit, search: search || undefined },
    });
    return response.data;
};

export interface AgentDashboard {
    rank: number;
    agent_id: number;
    agent_name: string;
    total_cases: number;
    total_leads: number;
    approved_cases: number;
    approval_ratio: number;
    total_revenue: number;
    total_commission: number;
    paid_commission: number;
}

export interface AgentDashboardResponse {
    total: number;
    page: number;
    limit: number;
    data: AgentDashboard[];
}

export const agentDashboardApi = async (
    page: number = 1,
    limit: number = 10,
    search?: string
): Promise<AgentDashboardResponse> => {
    const response = await apiClient.get("/dashboard/agent-dashboard", {
        params: { page, limit, search: search || undefined },
    });
    const apiData = response.data.data;
     return {
        total: apiData.total,
        page: apiData.page,
        limit: apiData.limit,
        data: apiData.data
    };
};

export interface BankDashboard {
    bank_id: number;
    bank_name: string;
    total_cases: number;
    approved_cases: number;
    pending_cases: number;
    approval_ratio: number;
    avg_tat_days: number;
    total_revenue: number;
    risk_flag: string;
}

export interface BankDashboardResponse {
    total: number;
    page: number;
    limit: number;
    data: BankDashboard[];
}

export const bankDashboardApi = async (
    page: number = 1,
    limit: number = 10,
    search?: string
): Promise<BankDashboardResponse> => {
    const response = await apiClient.get("/dashboard/bank-dashboard", {
        params: { page, limit, search: search || undefined },
    });
    const apiData = response.data.data;
     return {
        total: apiData.total,
        page: apiData.page,
        limit: apiData.limit,
        data: apiData.data
    };
};

export interface TelecallerDashboard {
    telecaller_id: number;
    name: string;
    leads_assigned: number;
    conversion_rate: number;
}

export interface TelecallerDashboardResponse {
    total: number;
    page: number;
    limit: number;
    data: TelecallerDashboard[];
}

export const telecallerDashboardApi = async (
    page: number = 1,
    limit: number = 10,
    search?: string
): Promise<TelecallerDashboardResponse> => {
    const response = await apiClient.get("/dashboard/telecaller-dashboard", {
        params: { page, limit, search: search || undefined },
    });
    const apiData = response.data.data;
     return {
        total: apiData.total,
        page: apiData.page,
        limit: apiData.limit,
        data: apiData.data
    };
};

export interface AnalystDashboard {
    analyst_id: number;
    name: string;
    active_cases: number;
    avg_analysis_time_days: string;
    approval_ratio: number;
    sla_breaches: number;
}

export interface AnalystDashboardResponse {
    total: number;
    page: number;
    limit: number;
    data: AnalystDashboard[];
}

export const analystDashboardApi = async (
    page: number = 1,
    limit: number = 10,
    search?: string
): Promise<AnalystDashboardResponse> => {
    const response = await apiClient.get("/dashboard/coordinator-dashboard", {
        params: { page, limit, search: search || undefined },
    });
    const apiData = response.data.data;
     return {
        total: apiData.total,
        page: apiData.page,
        limit: apiData.limit,
        data: apiData.data
    };
};

export interface FunnelDashboard{
    leads_generated: number;
    consent_verified: number;
    docs_uploaded: number;
    submitted_to_bank: number;
    bank_approval: number;
    disbursal: number;
}

export interface FunnelStep {
  step: number;
  label: string;
  value: number;
}

export const funnelDashboardApi = async (): Promise<FunnelDashboard> => {
    const response = await apiClient.get("/dashboard/funnel-dashboard");
    return response.data.data;
}
