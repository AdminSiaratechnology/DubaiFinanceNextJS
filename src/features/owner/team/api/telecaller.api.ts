import { apiClient } from "@/lib/api/client";

export interface Telecaller {
    id: number;
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
    created_at: string;
    updated_at: string;
}

export interface TelecallerCreate {
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
    password?: string;
}

export interface TelecallerResponse {
    items: Telecaller[];
    total: number;
    page: number;
    limit: number;
}

export const getTelecallers= async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
}: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
} = {}): Promise<TelecallerResponse> => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        if (search) params.append('search', search);
        if (status) params.append('status', status);

        const response = await apiClient.get(`/telecaller?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching telecallers:', error);
        return {
            items: [],
            total: 0,
            page,
            limit,
        };
    }
};

export const getTelecallerById = async (id: number): Promise<Telecaller | null> => {
    try {
        const response = await apiClient.get(`/telecaller/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching telecaller ${id}:`, error);
        return null;
    }
};

export const createTelecaller = async (data: TelecallerCreate): Promise<Telecaller> => {
    const response = await apiClient.post('/telecaller/', data);
    return response.data;
};

export const updateTelecaller = async (id: number, data: Partial<TelecallerCreate>): Promise<Telecaller> => {
    const response = await apiClient.put(`/telecaller/${id}`, data);
    return response.data;
};

export const deleteTelecaller = async (id: number): Promise<void> => {
    await apiClient.delete(`/telecaller/${id}`);
};
