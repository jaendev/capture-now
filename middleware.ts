import { NextRequest, NextResponse } from "next/server"

// Routes that require authentication
const protectedRoutes = ["/notes", "/settings", "/search", "/api/notes", "/api/user", "/"]

// Routes that should redirect to dashboard if user is logged in
const authRoutes = ["/login", "/register"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current route is an API route that needs authentication
  const isProtectedAPIRoute = protectedRoutes.some(route =>
    pathname.startsWith(route) && pathname.startsWith("/api")
  )

  // Check if the current route is a protected page
  const isProtectedPageRoute = protectedRoutes.some(route =>
    pathname.startsWith(route) && !pathname.startsWith("/api")
  )

  // Check if the current route is auth-only
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  )

  // For API routes, authentication is handled in the route handlers
  if (isProtectedAPIRoute) {
    return NextResponse.next()
  }

  // For page routes, we'd need session management (implement later)
  if (isProtectedPageRoute) {
    // For now, allow access - implement session checking later
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
