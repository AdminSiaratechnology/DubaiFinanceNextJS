import { apiClient } from "@/lib/api/client";

export interface LoanType {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface LoanTypeResponse {
  total: number;
  page: number;
  limit: number;
  items: LoanType[];
}

export const getLoanTypes = async ({
  page = 1,
  limit = 5,
  search = '',
  status = 'active',
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<LoanTypeResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
  });

  if (search) {
    params.append('search', search);
  }

  const res = await apiClient.get(
    `/loantype?${params.toString()}`,
  );

  return res.data;
};

export interface CreateLoanTypePayload {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

export const createLoanType = async (
  payload: CreateLoanTypePayload
) => {
  const res = await apiClient.post('/loantype', payload);
  return res.data;
};

export const getLoanTypeById = async (loan_type_id: number) => {
  console.log(loan_type_id)
  const res = await apiClient.get(`/loantype/${loan_type_id}`);
  return res.data;
};

export const updateLoanType = async (loan_type_id: number, payload: CreateLoanTypePayload) => {
  const res = await apiClient.put(`/loantype/${loan_type_id}`, payload);
  return res.data;
};