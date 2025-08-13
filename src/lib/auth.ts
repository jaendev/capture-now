import { AuthSession, AuthUser } from "../types/auth"

// Helper function to decode JWT and get user info
export async function getUserFromToken(token: string): Promise<AuthUser | null> {
  try {
    const { verifyJWT } = await import("@/src/lib/jwt-auth")
    const payload = verifyJWT(token)

    if (!payload) return null

    return {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
    }
  } catch {
    return null
  }
}

// Placeholder for future session management
export async function getSession(): Promise<AuthSession | null> {
  // This would be implemented when adding web app authentication
  // For now, only API authentication with JWT is supported
  return null
}
