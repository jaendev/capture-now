export interface AuthUser {
  id: string
  name: string
  email: string
  avatar_url?: string
}

export interface AuthSession {
  user: AuthUser
  expires: string
}

export interface LoginResponse {
  message: string
  token: string
  user: AuthUser
}