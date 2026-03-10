import { apiClient } from "@/lib/api/client";

export interface EmailConfig {
    id: number;
    smtp_user: string;
    smtp_password: string;
}

export interface EmailConfigPayload {
    smtp_user: string;
    smtp_password: string;
}

export const getEmailConfig = async (): Promise<EmailConfig | null> => {
    try {
        const response = await apiClient.get('/email-config');
        // Usually, if multiple items can exist, it returns a list, 
        // but the user says only 1 can exist and the GET returns "Fetch Email Config".
        // If it returns a list, we take the first one. If it returns an object, we use it.
        if (Array.isArray(response.data)) {
            return response.data[0] || null;
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching email config:', error);
        return null;
    }
};

export const saveEmailConfig = async (payload: EmailConfigPayload): Promise<EmailConfig> => {
    const response = await apiClient.post('/email-config', payload);
    return response.data;
};

export const deleteEmailConfig = async (id: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/email-config/${id}`);
    return response.data;
};
