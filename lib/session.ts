import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'fallback-secret-key'
);

const SESSION_COOKIE_NAME = 'admin-session';
const SESSION_DURATION = 60 * 60; // 1 hour in seconds

export interface SessionData {
  userId: string;
  username: string;
  email: string;
  role: string;
  exp: number;
}

export async function createSession(userData: Omit<SessionData, 'exp'>) {
  const sessionData: SessionData = {
    ...userData,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION,
  };

  const token = await new SignJWT(sessionData)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_DURATION)
    .sign(secret);

  return token;
}

export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionData;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return await verifySession(token);
}

export async function getSessionFromRequest(request: NextRequest): Promise<SessionData | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return await verifySession(token);
}

export function isSessionExpired(session: SessionData): boolean {
  return Math.floor(Date.now() / 1000) > session.exp;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
} 