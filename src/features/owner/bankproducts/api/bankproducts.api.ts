import { apiClient } from "@/lib/api/client";

export interface BankProduct {
    id: number;
    product_name: string;
    customer_segment: string;
    min_loan_amount: number;
    max_loan_amount: number;
    min_tenure: number;
    max_tenure: number;
    processing_fee: number;
    status: string;
    priority_score: number;
    internal_notes: string;
    bank: {
        id: number;
        name: string;
    };
    loan_type: {
        id: number;
        name: string;
    };
    sla_template: {
        id: number;
        template_name: string;
    };
}

export interface BankProductCreate {
    product_name: string;
    bank_id: number;
    loan_type_id: number;
    customer_segment: string;
    min_loan_amount: number;
    max_loan_amount: number;
    min_tenure: number;
    max_tenure: number;
    processing_fee: number;
    status: string;
    priority_score: number;
    default_sla_template_id: number;
    internal_notes: string;
}

export interface BankProductResponse {
    items: BankProduct[];
    total: number;
    page: number;
    limit: number;
}
export const getBankProducts = async ({
    page = 1,
    limit = 5,
    search = '',
    status = 'active',
}: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) => {
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
        const response = await apiClient.get(`/product?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bank products:', error);
        return {
            items: [],
            total: 0,
            page: page,
            limit: limit,
        } as BankProductResponse;
    }
};

export const createBankProduct = async (data: BankProductCreate) => {
    const response = await apiClient.post('/product', data);
    return response.data;
};

export const updateBankProduct = async (id: number, data: BankProductCreate) => {
    const response = await apiClient.put(`/product/${id}`, data);
    return response.data;
};

export const deleteBankProduct = async (id: number) => {
    const response = await apiClient.delete(`/product/${id}`);
    return response.data;
};

export const getBankProductById = async (id: number) => {
    try {
        const response = await apiClient.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bank product:', error);
        return null;
    }
};
