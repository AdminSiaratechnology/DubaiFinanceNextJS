import { apiClient } from "@/lib/api/client";

export interface BankCategory {
  id: number;
  name: string;
  description: string;
  status: string;
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
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
  });

  if (search) {
    params.append('search', search);
  }

  const res = await apiClient.get(
    `/category?${params.toString()}`,
  );

  return res.data;
};

export interface CreateBankCategoryPayload {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

export const createBankCategory = async (
  payload: CreateBankCategoryPayload
) => {
  const res = await apiClient.post('/category', payload);
  return res.data;
};

export const getBankCategoryById = async (category_id: number) => {
  console.log(category_id)
  const res = await apiClient.get(`/category/${category_id}`);
  return res.data;
};

export const updateBankCategory = async (category_id: number, payload: CreateBankCategoryPayload) => {
  const res = await apiClient.put(`/category/${category_id}`, payload);
  return res.data;
};