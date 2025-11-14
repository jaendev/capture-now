export interface JWTPayload {
  userId: string
  email: string
  name: string
  iat: number
  exp: number
}