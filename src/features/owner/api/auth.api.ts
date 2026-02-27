import { apiClient } from "@/lib/api/client";

export const adminLogin = (data: { email: string; password: string }) => {
  return apiClient.post("/account/login", data);
};

export const adminLogout = () => {
  return apiClient.post("/account/logout");
};

export const getMe = () => {
  return apiClient.get("/account/me");
};  

export const forgotPassword = (data: { email: string }) => {
  return apiClient.post("/account/send-password-reset-email", data);
};

export const resetPassword = (data: { token: string; new_password: string }) => {
  return apiClient.post("/account/verify-password-reset-token", data);
};