import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";

export const getFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BCcI18e5cp7hgvVeUlEpZq_7YYYF1ei8T85unpBWLIDdADt98Fmu_DG3MnKS1dRAUpUD7KeTvmI5wGo96FF7cxg",
    });

    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No token available");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};