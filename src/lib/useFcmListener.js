"use client";

import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { toast } from "sonner";
import { getNotifications } from "@/features/notifications/api/notification.api";

export const useFcmListener = () => {
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("📩 Foreground notification:", payload);

      const title = payload?.notification?.title || "New Notification";
      const body = payload?.notification?.body || "";

      // ✅ Clean UI (no alert)
      toast(title, {
        description: body,
      });

      // ✅ Fetch latest notifications
      try {
        const data = await getNotifications();

        // 👉 Agar Zustand/Redux use kar raha hai:
        // setNotifications(data);

        console.log("✅ Notifications updated", data);
      } catch (err) {
        console.error("❌ Error fetching notifications", err);
      }
    });

    return () => unsubscribe(); // 🔥 cleanup
  }, []);
};