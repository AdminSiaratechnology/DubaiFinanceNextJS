import { apiClient } from "@/lib/api/client";

export interface Agent {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string;
    emirates_id: string;
    nationality: string;
    experience: number;
    account_holder_name: string;
    bank_name: string;
    account_number: string;
    iban: string;
    status: 'active' | 'inactive';
    commissions: any[];
    created_at: string;
    updated_at: string;
    business_name: string;
}

export interface AgentCreatePayload {
    name: string;
    email: string;
    phone: string;
    emirates_id: string;
    nationality: string;
    business_name: string;
    year_of_experience: number;
    account_holder_name: string;
    bank_name: string;
    account_number: string;
    iban: string;
    status: 'active' | 'inactive';
    password?: string;
    commission_ids?: number[];
}

export interface AgentUpdatePayload {
    name?: string;
    email?: string;
    phone?: string;
    emirates_id?: string;
    nationality?: string;
    business_name?: string;
    year_of_experience?: number;
    account_holder_name?: string;
    bank_name?: string;
    account_number?: string;
    iban?: string;
    status?: string;
    commission_ids?: number[];
}

export interface AgentListResponse {
    total: number;
    page: number;
    limit: number;
    items: Agent[];
}

export const getAgents = async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
}: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
} = {}): Promise<AgentListResponse> => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        if (search) params.append('search', search);
        if (status) params.append('status', status);

        const res = await apiClient.get(`/agent/?${params.toString()}`);
        return res.data;
    } catch (error: any) {
        console.error('Error in getAgents:', {
            status: error?.response?.status,
            data: error?.response?.data,
            message: error?.message,
        });
        return { items: [], total: 0, page, limit };
    }
};

export const getAgentById = async (id: number): Promise<Agent | null> => {
    try {
        const res = await apiClient.get(`/agent/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error in getAgentById for ID ${id}:`, error);
        return null;
    }
};

export const createAgent = async (payload: AgentCreatePayload): Promise<Agent> => {
    try {
        const res = await apiClient.post('/agent/', payload);
        return res.data;
    } catch (error) {
        console.error('Error in createAgent:', error);
        throw error;
    }
};

export const updateAgent = async (
    id: number,
    payload: AgentUpdatePayload
): Promise<Agent> => {
    try {
        const res = await apiClient.put(`/agent/${id}`, payload);
        return res.data;
    } catch (error) {
        console.error(`Error in updateAgent for ID ${id}:`, error);
        throw error;
    }
};

export const deleteAgent = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/agent/${id}`);
    } catch (error) {
        console.error(`Error in deleteAgent for ID ${id}:`, error);
        throw error;
    }
};
