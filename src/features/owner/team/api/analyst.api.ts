import { apiClient } from "@/lib/api/client";

export interface Coordinator {
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

export interface CoordinatorCreate {
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

export interface CoordinatorResponse {
    items: Coordinator[];
    total: number;
    page: number;
    limit: number;
}

export const getCoordinators = async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
}: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
} = {}): Promise<CoordinatorResponse> => {
    try {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        if (search) params.append('search', search);
        if (status) params.append('status', status);

        const response = await apiClient.get(`/coordinators/?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coordinators:', error);
        return {
            items: [],
            total: 0,
            page,
            limit,
        };
    }
};

export const getCoordinatorById = async (id: number): Promise<Coordinator | null> => {
    try {
        const response = await apiClient.get(`/coordinators/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching coordinator ${id}:`, error);
        return null;
    }
};

export const createCoordinator = async (data: CoordinatorCreate): Promise<Coordinator> => {
    const response = await apiClient.post('/coordinators/', data);
    return response.data;
};

export const updateCoordinator = async (id: number, data: Partial<CoordinatorCreate>): Promise<Coordinator> => {
    const response = await apiClient.put(`/coordinators/${id}`, data);
    return response.data;
};

export const deleteCoordinator = async (id: number): Promise<void> => {
    await apiClient.delete(`/coordinators/${id}`);
};
