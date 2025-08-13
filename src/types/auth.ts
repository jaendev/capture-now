export interface AuthUser {
  id: string
  name: string
  email: string
  image?: string
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