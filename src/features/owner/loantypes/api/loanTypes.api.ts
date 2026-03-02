import { apiClient } from "@/lib/api/client";

export interface LoanType {
  id: number;
  name: string;
  description: string;
  status: string;
  [key: string]: unknown;
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
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (status) {
      params.append('status', status);
    }

    if (search) {
      params.append('search', search);
    }

    const res = await apiClient.get(
      `/loantype?${params.toString()}`,
    );

    return res.data;
  } catch (error: any) {
    console.error("Error in getLoanTypes:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    return {
      items: [],
      total: 0,
      page: page,
      limit: limit,
    } as LoanTypeResponse;
  }
};

export interface CreateLoanTypePayload {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

export const createLoanType = async (
  payload: CreateLoanTypePayload
) => {
  try {
    const res = await apiClient.post('/loantype', payload);
    return res.data;
  } catch (error) {
    console.error("Error in createLoanType:", error);
    throw error;
  }
};

export const getLoanTypeById = async (loan_type_id: number) => {
  try {
    const res = await apiClient.get(`/loantype/${loan_type_id}`);
    return res.data;
  } catch (error) {
    console.error(`Error in getLoanTypeById for ID ${loan_type_id}:`, error);
    throw error;
  }
};

export const updateLoanType = async (loan_type_id: number, payload: CreateLoanTypePayload) => {
  try {
    const res = await apiClient.put(`/loantype/${loan_type_id}`, payload);
    return res.data;
  } catch (error) {
    console.error(`Error in updateLoanType for ID ${loan_type_id}:`, error);
    throw error;
  }
};

export const deleteLoanType = async (loan_type_id: number) => {
  try {
    const res = await apiClient.delete(`/loantype/${loan_type_id}`);
    return res.data;
  } catch (error) {
    console.error(`Error in deleteLoanType for ID ${loan_type_id}:`, error);
    throw error;
  }
};