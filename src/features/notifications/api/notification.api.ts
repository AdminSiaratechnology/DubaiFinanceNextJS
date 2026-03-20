import { apiClient } from "@/lib/api/client";

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  parent_id?: number;
  parent_type?: 'lead' | 'case' | string;
  created_at: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await apiClient.get("/notification");
  return response.data;
};

export const markNotificationAsRead = async (notificationId: number): Promise<{ message: string }> => {
  const response = await apiClient.put(`/notification/${notificationId}/read`);
  return response.data;
};
