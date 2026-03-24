"use client";

import { useFcmListener } from "@/lib/useFcmListener";
import { getFcmToken } from "@/lib/getFcmToken";
import { useEffect, useState } from "react";
import { sendNotification } from "@/features/notifications/api/notification.api";
export default function Page() {
    const [token, setToken] = useState<string | null>(null);
    useFcmListener();
    useEffect(() => {
        getFcmToken().then((token) => {
            setToken(token);
        });
    }, []);
    const handleSendNotification = async () => {
        // if (token) {
        //     await sendNotification(token);
        // }
    }
    return <div>FCM Ready 🚀
        <button onClick={handleSendNotification} className="bg-red">Send Notification</button>
    </div>;
}