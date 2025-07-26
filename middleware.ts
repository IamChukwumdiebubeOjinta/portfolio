import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionFromRequest, isSessionExpired } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/login') {
      return NextResponse.next();
    }

    // Check for valid session
    const session = await getSessionFromRequest(request);
    
    if (!session || isSessionExpired(session)) {
      // Session is invalid or expired, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Session is valid, allow access
    return NextResponse.next();
  }

  // Handle login page - if user has valid session, redirect to admin dashboard
  if (pathname === '/login') {
    const session = await getSessionFromRequest(request);
    
    if (session && !isSessionExpired(session)) {
      // User is already logged in, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 