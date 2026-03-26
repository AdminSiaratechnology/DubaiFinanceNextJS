"use client";

import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { toast } from "sonner";
import { useNotificationStore } from "@/features/notifications/store/useNotificationStore";

export const useFcmListener = () => {
  const fetchNotifications = useNotificationStore((state) => state.fetchNotifications);

  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("📩 Foreground notification:", payload);

      const title = payload?.notification?.title || payload?.data?.title || "New Notification";
      const body = payload?.notification?.body || payload?.data?.body || payload?.data?.message || "";

      toast.success(title, {
        description: body,
      });

      try {
        await fetchNotifications();
        console.log("✅ Notifications updated in global store");
      } catch (err) {
        console.error("❌ Error fetching notifications", err);
      }
    });

    return () => unsubscribe();
  }, []);
};