import { apiClient } from "@/lib/api/client";

interface SubmitLeadPayload {
    customer_name: string;
    mobile_number: string;
    email: string;
    bank_id: string | number;
    product_id: string | number;
    requested_amount: number;
    status?: string;
}

export interface Lead {
  id: number;
  customer_name: string;
  mobile_number: string;
  email: string;
  requested_amount: number;
  agent_id: number;
  telecaller_id: number;
  product: {
    id: number;
    product_name: string;
  };
  bank: {
    id: number;
    name: string;
  };
  case?: {
    id: number;
    status: string;
    requested_amount: number;
  } | null;
  created_at: string;
  is_returned: boolean;
}

export interface Case {
  id: number;
  customer_name: string;
  mobile_number: string;
  email: string;
  emirates_id: string;
  employer: string;
  salary: number;
  product: {
    id: number;
    product_name: string;
  };
  bank?: {
    id: number;
    name: string;
  };
  amount: number;
  date: string;
  status: string;
  step: number;
  documents?: any[];
  company_name?: string;
  product_type?: string;
  requested_amount?: number;
  created_at?: string;
  notes?: string;
  agent_commission?: string | undefined;
}

export const sendLeadOtp = async (email: string) => {
    const response = await apiClient.post(`/leads/send-otp?email=${encodeURIComponent(email)}`);
    return response.data;
}

export const submitLead = async (payload: SubmitLeadPayload, otp: string) => {
    const response = await apiClient.post(`/leads?otp=${otp}`, payload);
    return response.data;
}

export const updateLead = async (leadId: number, payload: SubmitLeadPayload) => {
    const response = await apiClient.put(`/leads/${leadId}`, payload);
    return response.data;
}

export const sendCaseOtp = async (email: string) => {
    const formData = new FormData();
    formData.append("email", email);

    return apiClient.post("/cases/case-otp", formData);
};

export const submitCompleteCase = async (formData: FormData) => {
    const response = await apiClient.post('/cases/submit-complete', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export const updateCase = async (caseId: number, formData: FormData) => {
    const response = await apiClient.put(`/cases/update-case/${caseId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}




/* 
GET /api/leads Get Leads Parameters Cancel Name Description skip integer (query) 0 limit integer (query) 100 search string | (string | null) (query) search Execute Clear Responses Curl curl -X 'GET' \ 'http://127.0.0.1:8000/api/leads?skip=0&limit=100' \ -H 'accept: application/json' Request URL http://127.0.0.1:8000/api/leads?skip=0&limit=100 Server response Code Details 200 Response body Download [ { "customer_name": "ertyui", "mobile_number": "34567890", "email": "social.fowl.ewbd@hidingmail.com", "requested_amount": 3456789, "id": 11, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T11:56:06.280001Z" }, { "customer_name": "sedrfghjk", "mobile_number": "3456789", "email": "social.fowl.ewbd@hidingmail.com", "requested_amount": 23456789, "id": 10, "agent_id": 15, "telecaller_id": 6, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T11:55:19.467472Z" }, { "customer_name": "sdfghj", "mobile_number": "2345678", "email": "social.fowl.ewbd@hidingmail.com", "requested_amount": 2345678, "id": 9, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T11:54:02.797310Z" }, { "customer_name": "fdghjkl", "mobile_number": "4356789", "email": "philosophical.whippet.xwdh@hidingmail.com", "requested_amount": 234567, "id": 8, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T11:46:17.982264Z" }, { "customer_name": "ghjk", "mobile_number": "34567890", "email": "kcpgf@dollicons.com", "requested_amount": 20000000, "id": 7, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T11:26:42.547339Z" }, { "customer_name": "sdfghj", "mobile_number": "567890", "email": "01z3g@dollicons.com", "requested_amount": 12345678, "id": 6, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T10:59:44.987975Z" }, { "customer_name": "jimmy", "mobile_number": "345678998", "email": "0s0bo@dollicons.com", "requested_amount": 2000000, "id": 5, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T10:55:43.672169Z" }, { "customer_name": "sneha", "mobile_number": "34567890", "email": "00y6j@dollicons.com", "requested_amount": 2000000, "id": 4, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T10:53:21.821863Z" }, { "customer_name": "janhvi", "mobile_number": "234567890", "email": "internaladmin@gmail.com", "requested_amount": 2000000, "id": 3, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T10:31:24.870309Z" }, { "customer_name": "janhvi", "mobile_number": "234567890", "email": "internaladmin@gmail.com", "requested_amount": 2000000, "id": 2, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T10:31:13.817461Z" }, { "customer_name": "", "mobile_number": "", "email": "internaladmin@gmail.com", "requested_amount": 0, "id": 1, "agent_id": 15, "telecaller_id": 4, "product": { "id": 2, "product_name": "nsp product" }, "bank": { "id": 2, "name": "bank of nsp" }, "created_at": "2026-03-09T10:28:13.754009Z" } ] Response headers content-length: 3133 content-type: application/json date: Wed,11 Mar 2026 05:52:50 GMT server: uvicorn Responses Code Description Links 200 Successful Response Media type application/json Controls Accept header. Example Value Schema [ { "customer_name": "string", "mobile_number": "string", "email": "user@example.com", "requested_amount": 0, "id": 0, "agent_id": 0, "telecaller_id": 0, "product": { "id": 0, "product_name": "string" }, "bank": { "id": 0, "name": "string" }, "created_at": "2026-03-11T05:53:11.560Z" } ]
*/

export const getLeads = async (
  skip: number = 0,
  limit: number = 10,
  search?: string,
  lead_type?: string
): Promise<Lead[]> => {
    console.log(lead_type)
  const response = await apiClient.get("/leads", {
    params: {
      skip,
      limit,
      search,
      lead_type
    },
  });

  return response.data;
};

export interface MyCasesResponse {
  total: number;
  page: number;
  limit: number;
  items: Case[];
}

export const getMyCases = async (
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<MyCasesResponse> => {
  const response = await apiClient.get("/cases/my-cases", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

export const getLeadById = async (id: number): Promise<Lead | null> => {
  try {
    const response = await apiClient.get(`/leads/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lead ${id}:`, error);
    return null;
  }
};

export const getCaseByLeadId = async (leadId: number): Promise<Case | null> => {
  try {
    const response = await apiClient.get(`/cases/${leadId}/case`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching case for lead ${leadId}:`, error);
    return null;
  }
};

export interface CoordinatorCase {
  id: number;
  agent_id: number;
  customer_name: string;
  mobile_number: string;
  email: string;
  product: {
    id: number;
    product_name: string;
  };
  bank: {
    id: number;
    name: string;
  };
  requested_amount: number;
  salary: number;
  company_name: string;
  emirates_id: string;
  passport_no: string | null;
  status: string;
  created_at: string;
  notes: string | null;
  documents: any[];
  telecaller_id: number | null;
}

export interface CoordinatorCasesResponse {
  total: number;
  page: number;
  limit: number;
  items: CoordinatorCase[];
}

export const getCoordinatorCases = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string
): Promise<any> => {
  const response = await apiClient.get("/cases/coordinator-cases", {
    params: {
      page,
      limit,
      search: search || undefined,
      status: status || undefined,
    },
  });
  console.log(response.data)
  return response.data;
};

export const updateCaseStatus = async (
  caseId: number,
  status: string,
  analysisNotes?: string
): Promise<{ message: string; case_id: number }> => {
  const params = new URLSearchParams();
  params.append("status", status);
  if (analysisNotes) {
    params.append("analysis_notes", analysisNotes);
  }
  const response = await apiClient.put(
    `/cases/update-case-status/${caseId}`,
    params.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};

export const dashboardApi = async () => {
  const response = await apiClient.get("/dashboard/dashboard-api");
  return response.data;
};
