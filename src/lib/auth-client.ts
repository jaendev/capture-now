import { useAuthStore } from '@/src/stores/authStore'
import { AuthUser, LoginResponse } from '../types/auth'

// API call helper with auth token from Zustand store
export async function authFetch(url: string, options: RequestInit = {}) {
  const { getAuthHeaders } = useAuthStore.getState()

  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

// Login function
export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Login failed')
  }

  const data: LoginResponse = await response.json()

  // Store token and user data using Zustand
  const { setAuth } = useAuthStore.getState()
  setAuth(data.token, data.user)

  return data
}

// Register function
export async function register(name: string, email: string, password: string): Promise<{ message: string; user: AuthUser }> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Registration failed')
  }

  return response.json()
}

// Logout function
export function logout() {
  const { clearAuth } = useAuthStore.getState()
  clearAuth()
  window.location.href = '/login'
}

// Helper functions for backward compatibility
export function isAuthenticated(): boolean {
  return useAuthStore.getState().isAuthenticated
}

export function getAuthUser(): AuthUser | null {
  return useAuthStore.getState().user
}

export function getAuthToken(): string | null {
  return useAuthStore.getState().token
}