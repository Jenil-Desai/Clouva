import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const jwtPayload = jwtDecode<{ email: string, firstName: string, lastName: string }>(token);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-email', jwtPayload.email);
  requestHeaders.set('x-user-fname', jwtPayload.firstName);
  requestHeaders.set('x-user-lname', jwtPayload.lastName);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })
}

export const config = {
  matcher: ['/transfer', '/sign-out'],
}
