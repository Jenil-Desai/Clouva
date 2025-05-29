import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const jwtPayload = jwtDecode<{ email: string, firstName: string, lastName: string, publicKey: string }>(token);

  const reponse = NextResponse.next();
  reponse.cookies.set("user", JSON.stringify({
    email: jwtPayload.email,
    firstName: jwtPayload.firstName,
    lastName: jwtPayload.lastName,
    publickKey: jwtPayload.publicKey
  }))

  return reponse;
}

export const config = {
  matcher: ['/transfer', '/sign-out'],
}
