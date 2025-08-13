import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"
import { JWTPayload } from "../types/jwt"
import { NEXTAUTH_SECRET } from "@/config/config"

/**
 * Method to verify a JWT token.
 * @param token - The JWT token to verify.
 * @returns token payload if valid, null if invalid.
 */
export function verifyJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, NEXTAUTH_SECRET) as JWTPayload
    return decoded
  } catch {
    return null
  }
}

/**
 * Method to extract the JWT token from the request headers.
 * @param request - The incoming request object.
 * @returns token - The JWT token extracted from the request headers, or null if not found.
 */
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  return null
}

/**
 * Method to authenticate a JWT token from the request.
 * @param request - The incoming request object.
 * @returns payload - The decoded JWT payload if valid, null if not authenticated.
 */
export async function authenticateJWT(request: NextRequest) {
  const token = getTokenFromRequest(request)

  if (!token) {
    return null
  }

  const payload = verifyJWT(token)
  return payload
}

/**
 * Method to handle user authentication and retrieve the authenticated user.
 * @param request - The incoming request object.
 * @returns user - The authenticated user object containing userId, or null if not authenticated.
 */
export async function getAuthenticatedUser(request: NextRequest) {
  const jwtPayload = await authenticateJWT(request)
  if (jwtPayload) {
    return { userId: jwtPayload.userId }
  }
  return null
}