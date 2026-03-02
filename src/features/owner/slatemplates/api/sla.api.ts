import { apiClient } from "@/lib/api/client";

export interface SLA {
  id?: number;
  template_name: string;
  telecaller_action_time?: number;
  manager_action_time?: number;
  coordinator_verification_time?: number;
  submission_time_limit?: number;
  escalation_after?: number;
  auto_revert_enabled?: boolean;
  status: string;
}

export interface SLAResponse{
  total: number;
  page: number;
  limit: number;
  items: SLA[];
}

export const getSLAs = async ({
  page = 1,
  limit = 5,
  search = '',
  status = 'active',
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<SLAResponse> => {
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
      `/slatemplate?${params.toString()}`,
    );

    return res.data;
  } catch (error: any) {
    console.error("Error in getSLAs:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    return {
      items: [],
      total: 0,
      page: page,
      limit: limit,
    } as SLAResponse;
  }
};

export interface CreateSLAPayload {
  template_name: string;
  telecaller_action_time?: number;
  manager_action_time?: number;
  coordinator_verification_time?: number;
  submission_time_limit?: number;
  escalation_after?: number;
  auto_revert_enabled?: boolean;
  status: string;
}

export const createSLA = async (
  payload: CreateSLAPayload
) => {
  try {
    const res = await apiClient.post('/slatemplate', payload);
    return res.data;
  } catch (error) {
    console.error("Error in createSLA:", error);
    throw error;
  }
};

export const getSLAById = async (sla_id: number) => {
  try {
    const res = await apiClient.get(`/slatemplate/${sla_id}`);
    return res.data;
  } catch (error) {
    console.error(`Error in getSLAById for ID ${sla_id}:`, error);
    throw error;
  }
};

export const updateSLA = async (sla_id: number, payload: CreateSLAPayload) => {
  try {
    const res = await apiClient.put(`/slatemplate/${sla_id}`, payload);
    return res.data;
  } catch (error) {
    console.error(`Error in updateSLA for ID ${sla_id}:`, error);
    throw error;
  }
};

export const deleteSLA = async (sla_id: number) => {
  try {
    const res = await apiClient.delete(`/slatemplate/${sla_id}`);
    return res.data;
  } catch (error) {
    console.error(`Error in deleteSLA for ID ${sla_id}:`, error);
    throw error;
  }
};