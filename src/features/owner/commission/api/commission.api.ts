import { apiClient } from "@/lib/api/client";

// ─────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────

export interface Commission {
    id: number;
    commission_type: 'flat' | 'percentage';
    commission_value: number;
    agent_share: number;
    telecaller_share: number;
    coordinator_share: number;
    effective_from_date: string;   // ISO date string e.g. "2026-03-05"
    status: 'active' | 'inactive';
    bank: {
        id: number;
        name: string;
    };
    product: {
        id: number;
        product_name: string;
    };
    created_at: string;
    updated_at: string;
}

export interface CommissionCreatePayload {
    commission_type: 'flat' | 'percentage';
    commission_value: number;
    agent_share: number;
    telecaller_share: number;
    coordinator_share: number;
    effective_from_date: string;
    status: 'active' | 'inactive';
    bank_id: number;
    product_id: number;
}

export interface CommissionListResponse {
    total: number;
    page: number;
    limit: number;
    items: Commission[];
}

// ─────────────────────────────────────────────
// List / Read
// ─────────────────────────────────────────────

export const getCommissions = async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
}: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
} = {}): Promise<CommissionListResponse> => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        if (search) params.append('search', search);
        if (status) params.append('status', status);

        const res = await apiClient.get(`/commission?${params.toString()}`);
        return res.data;
    } catch (error: any) {
        console.error('Error in getCommissions:', {
            status: error?.response?.status,
            data: error?.response?.data,
            message: error?.message,
        });
        return { items: [], total: 0, page, limit };
    }
};

export const getCommissionById = async (id: number): Promise<Commission | null> => {
    try {
        const res = await apiClient.get(`/commission/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error in getCommissionById for ID ${id}:`, error);
        return null;
    }
};

// ─────────────────────────────────────────────
// Create / Update / Delete
// ─────────────────────────────────────────────

export const createCommission = async (payload: CommissionCreatePayload): Promise<Commission> => {
    try {
        const res = await apiClient.post('/commission/', payload);
        return res.data;
    } catch (error) {
        console.error('Error in createCommission:', error);
        throw error;
    }
};

export const updateCommission = async (
    id: number,
    payload: Partial<CommissionCreatePayload>
): Promise<Commission> => {
    try {
        const res = await apiClient.put(`/commission/${id}/`, payload);
        return res.data;
    } catch (error) {
        console.error(`Error in updateCommission for ID ${id}:`, error);
        throw error;
    }
};

export const deleteCommission = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/commission/${id}/`);
    } catch (error) {
        console.error(`Error in deleteCommission for ID ${id}:`, error);
        throw error;
    }
};
