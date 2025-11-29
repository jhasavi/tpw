import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes - require authentication
  const protectedRoutes = ['/dashboard', '/learn', '/quiz', '/assessment']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Update session
  const response = await updateSession(request)

  // Check auth for protected routes
  if (isProtectedRoute) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const cookieHeader = request.headers.get('cookie') || ''
    
    // Simple check - if there's no session cookie, redirect to login
    if (!cookieHeader.includes('sb-')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
