import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import firebaseConfig from "../config/firebaseConfig";

const app = initializeApp(firebaseConfig);

// ⚠️ Only initialize messaging in browser
export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;