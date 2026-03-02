import axios from "axios";
import { redirect } from "next/navigation";

// 🔥 Universal origin resolver (production safe)
const getBaseURL = () => {
  // Browser → use proxy
  if (typeof window !== "undefined") {
    return "/api";
  }
  // Server → must use absolute URL
  return process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api`
    : "http://localhost:3000/api";
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// 🔥 SSR Cookie Forwarding
apiClient.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();
      if (cookieString) {
        config.headers.Cookie = cookieString;
      }
    } catch (e) {
      // Not in a request context (e.g. build time or outside Next.js)
    }
  }
  return config;
});

// Queue for handling multiple 401s (Browser only)
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthEndpoint =
      originalRequest.url?.includes("/account/login") ||
      originalRequest.url?.includes("/account/logout") ||
      originalRequest.url?.includes("/account/refresh");

    // 🔥 401 Handling Logic
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      // Browser: Handle Refresh Queue
      if (typeof window !== "undefined") {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => apiClient(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          apiClient
            .post("/account/refresh")
            .then(() => {
              isRefreshing = false;
              processQueue(null);
              resolve(apiClient(originalRequest));
            })
            .catch((refreshError) => {
              isRefreshing = false;
              processQueue(refreshError);
              if (window.location.pathname !== "/login") {
                window.location.href = "/login";
              }
              reject(refreshError);
            });
        });
      }

      // Server: Do NOT redirect here. Let Page/Proxy handle it.
      // If we reach here, proxy likely refresh failed or was bypassed.
    }

    return Promise.reject(error);
  }
);