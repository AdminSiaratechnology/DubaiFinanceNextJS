import { apiClient } from "@/lib/api/client";

interface SubmitLeadPayload {
    customer_name: string;
    mobile_number: string;
    email: string;
    bank_id: string | number;
    product_id: string | number;
    requested_amount: number;
}
export const sendLeadOtp = async (email: string) => {
    const response = await apiClient.post(`/leads/send-otp?email=${encodeURIComponent(email)}`);
    return response.data;
}

export const submitLead = async (payload: SubmitLeadPayload, otp: string) => {
    const response = await apiClient.post(`/leads?otp=${otp}`, payload);
    return response.data;
}