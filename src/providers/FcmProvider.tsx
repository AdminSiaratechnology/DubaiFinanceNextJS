"use client";

import { useFcmListener } from "@/lib/useFcmListener";

export default function FcmProvider({ children }: { children: React.ReactNode }) {
    useFcmListener();

    return children;
}