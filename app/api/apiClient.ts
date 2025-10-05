/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestOptions } from "@/src/types/api";
import { API_URL } from "../../config/config";

const defaultHeaders = {
  "Content-Type": "application/json",
};

// Helper function to get auth headers without circular dependency
const getAuthHeaders = (): Record<string, string> => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const { state } = JSON.parse(stored);
        if (state?.token) {
          return {
            'Authorization': `Bearer ${state.token}`
          };
        }
      }
    } catch (error) {
      console.warn('Failed to get auth token:', error);
    }
  }
  return {};
};

export default async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
  requireAuth: boolean = true // Default to requiring auth
): Promise<T> {

  // Merge headers: default + auth + custom
  const authHeaders = requireAuth ? getAuthHeaders() : {};

  const config: RequestInit = {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...authHeaders,
      ...options.headers, // Custom headers override everything
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    // Handle authentication errors
    if (res.status === 401) {
      // Clear auth if token is invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      }
    }

    const error = new Error(data?.message || "Error en la solicitud");
    (error as any).status = res.status;
    throw error;
  }

  return data;
}

export const apiClient = {
  // Authenticated requests (default)
  get: <T>(url: string, headers?: Record<string, string>) =>
    request<T>(url, { headers }),

  post: <T>(url: string, body?: any, headers?: Record<string, string>) =>
    request<T>(url, { method: "POST", body, headers }),

  patch: <T>(url: string, body?: any, headers?: Record<string, string>) =>
    request<T>(url, { method: "PATCH", body, headers }),

  delete: <T>(url: string, headers?: Record<string, string>) =>
    request<T>(url, { method: "DELETE", headers }),

  // Public endpoints (no auth required)
  public: {
    get: <T>(url: string, headers?: Record<string, string>) =>
      request<T>(url, { headers }, false),

    post: <T>(url: string, body?: any, headers?: Record<string, string>) =>
      request<T>(url, { method: "POST", body, headers }, false),
  }
};