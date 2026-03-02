import { apiClient } from "@/lib/api/client";

export interface Bank {
  id: number;
  name: string;
  description: string;
  status: string;
  short_code: string;
  loan_types: { id: number; name: string; description: string; status: string }[];
  logo_url: string | null | undefined;
  category: { id: number; name: string; description: string; status: string };
  default_tat_days: number;
}

export interface BankResponse {
  total: number;
  page: number;
  limit: number;
  items: Bank[];
}

export const getBanks = async ({
  page = 1,
  limit = 5,
  search = '',
  status = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<BankResponse> => {
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
      `/banks?${params.toString()}`
    );

    return res.data;
  } catch (error: any) {
    console.error("Error in getBanks:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    // ✅ NEVER throw in SSR data functions
    // Return safe fallback instead
    return {
      items: [],
      total: 0,
      page: page,
      limit: limit,
    } as BankResponse;
  }
};

export interface CreateBankPayload {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  short_code: string;
  loan_types: string[]; // or loan_type_ids depending on backend
  logo_file?: File; // 👈 important (image)
  category_id: number;
  default_tat_days: number;
}

export const createBank = async (formData: FormData) => {
  try {
    const res = await apiClient.post('/banks/', formData, {
      headers: {
        // ❌ DO NOT set Content-Type manually
        // Axios will auto set multipart boundary
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in createBank:", error);
    throw error;
  }
};

export const getBankById = async (bank_id: number) => {
  try {
    const res = await apiClient.get(`/banks/${bank_id}`);
    return res.data;
  } catch (error) {
    console.error(`Error in getBankById for ID ${bank_id}:`, error);
    throw error;
  }
};

export const updateBank = async (bank_id: number, formData: FormData) => {
  try {
    const res = await apiClient.put(`/banks/${bank_id}/`, formData);
    return res.data;
  } catch (error) {
    console.error(`Error in updateBank for ID ${bank_id}:`, error);
    throw error;
  }
};

export const deleteBank = async (bank_id: number) => {
  try {
    const res = await apiClient.delete(`/banks/${bank_id}/`);
    return res.data;
  } catch (error) {
    console.error(`Error in deleteBank for ID ${bank_id}:`, error);
    throw error;
  }
};