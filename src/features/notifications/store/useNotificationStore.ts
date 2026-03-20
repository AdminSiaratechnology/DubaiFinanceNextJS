import { create } from 'zustand';
import { getNotifications, markNotificationAsRead as markAsRead, Notification } from '../api/notification.api';

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    error: string | null;
    fetchNotifications: () => Promise<void>;
    markNotificationAsRead: (id: number) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,

    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const notifications = await getNotifications();
            const unreadCount = notifications.filter(n => !n.is_read).length;
            set({ notifications, unreadCount, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch notifications', isLoading: false });
        }
    },

    markNotificationAsRead: async (id: number) => {
        try {
            await markAsRead(id);
            const { notifications } = get();
            const updatedNotifications = notifications.map(n => 
                n.id === id ? { ...n, is_read: true } : n
            );
            const unreadCount = updatedNotifications.filter(n => !n.is_read).length;
            set({ notifications: updatedNotifications, unreadCount });
        } catch (error) {
            set({ error: 'Failed to mark notification as read' });
        }
    },

    markAllAsRead: async () => {
        const { notifications } = get();
        const unreadNotifications = notifications.filter(n => !n.is_read);
        
        try {
            await Promise.all(unreadNotifications.map(n => markAsRead(n.id)));
            const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
            set({ notifications: updatedNotifications, unreadCount: 0 });
        } catch (error) {
            set({ error: 'Failed to mark all as read' });
        }
    }
}));
