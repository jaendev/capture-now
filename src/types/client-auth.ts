// Auth types for client-side
export interface AuthToken {
  token: string
  expiresAt: number
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  token: string | null
}

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar_url?: string
}

export interface LoginResponse {
  message: string
  token: string
  user: AuthUser
}

export interface RegisterResponse {
  message: string
  user: AuthUser
}

