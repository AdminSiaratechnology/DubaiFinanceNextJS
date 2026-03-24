import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDdCs5wRv_2SSLCqrPBZ4wcIj-FMMJe_Xg",
  authDomain: "dubaifinance-253b7.firebaseapp.com",
  projectId: "dubaifinance-253b7",
  storageBucket: "dubaifinance-253b7.firebasestorage.app",
  messagingSenderId: "447458162927",
  appId: "1:447458162927:web:154b02fc9abc680d75c31a",
  measurementId: "G-ZZK3K4ZF8N"
};

const app = initializeApp(firebaseConfig);

// ⚠️ Only initialize messaging in browser
export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;