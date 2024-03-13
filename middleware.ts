import { getServerSession } from 'next-auth'
import type { NextRequest, NextResponse } from 'next/server'
import { authOptions } from './app/api/auth/[...nextauth]/route'
 
export async function middleware(request: NextRequest) {
    console.log("Request from middleware", request)
  const currentUser = request.cookies.get('currentUser')?.value
  

  console.log("Current user from middleware", currentUser)
 
  if (currentUser && request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/dashboards/details', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/auth/sign-in')) {
    return Response.redirect(new URL('/auth/sign-in', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}