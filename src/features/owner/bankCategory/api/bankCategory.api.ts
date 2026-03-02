import { apiClient } from "@/lib/api/client";

export interface BankCategory {
  id: number;
  name: string;
  description: string;
  status: string;
  [key: string]: unknown;
}

export interface BankCategoryResponse {
  total: number;
  page: number;
  limit: number;
  items: BankCategory[];
}

export const getBankCategories = async ({
  page = 1,
  limit = 5,
  search = '',
  status = 'active',
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<BankCategoryResponse> => {
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
      `/category?${params.toString()}`,
    );

    return res.data;
  } catch (error: any) {
    console.error("Error in getBankCategories:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    return {
      items: [],
      total: 0,
      page: page,
      limit: limit,
    } as BankCategoryResponse;
  }
};

export interface CreateBankCategoryPayload {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

export const createBankCategory = async (
  payload: CreateBankCategoryPayload
) => {
  try {
    const res = await apiClient.post('/category', payload);
    return res.data;
  } catch (error) {
    console.error("Error in createBankCategory:", error);
    throw error;
  }
};

export const getBankCategoryById = async (category_id: number) => {
  try {
    const res = await apiClient.get(`/category/${category_id}`);
    return res.data;
  } catch (error) {
    console.error(`Error in getBankCategoryById for ID ${category_id}:`, error);
    throw error;
  }
};

export const updateBankCategory = async (category_id: number, payload: CreateBankCategoryPayload) => {
  try {
    const res = await apiClient.put(`/category/${category_id}`, payload);
    return res.data;
  } catch (error) {
    console.error(`Error in updateBankCategory for ID ${category_id}:`, error);
    throw error;
  }
};

export const deleteBankCategory = async (category_id: number) => {
  try {
    const res = await apiClient.delete(`/category/${category_id}`);
    return res.data;
  } catch (error) {
    console.error(`Error in deleteBankCategory for ID ${category_id}:`, error);
    throw error;
  }
};
