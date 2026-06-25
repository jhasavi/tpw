import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function withRequestId(response: NextResponse, requestId: string) {
  response.headers.set('x-request-id', requestId)
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestId =
    request.headers.get('x-request-id') ||
    `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`

  // Protected routes - require authentication
  const protectedRoutes = ['/dashboard', '/learn', '/quiz', '/assessment']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Only run auth update for protected routes or auth-related paths
  const isAuthRelated = pathname.startsWith('/auth') || pathname.startsWith('/api/auth') || isProtectedRoute
  
  if (isAuthRelated) {
    // Update session
    const response = await updateSession(request)

    // Check auth for protected routes
    if (isProtectedRoute) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const cookieHeader = request.headers.get('cookie') || ''
      
      // Simple check - if there's no session cookie, redirect to login
      if (!cookieHeader.includes('sb-')) {
        return withRequestId(
          NextResponse.redirect(new URL('/auth/login', request.url)),
          requestId
        )
      }
    }

    return withRequestId(response, requestId)
  }

  // For all other routes, skip auth processing
  return withRequestId(
    NextResponse.next({ request }),
    requestId
  )
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|/api/email/|/auth/callback).*)',
  ],
}
