import { NextResponse } from 'next/server';

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the session cookie
  response.cookies.set('admin-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0, // Expire immediately
    path: '/',
  });

  return response;
} 