import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser && request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/dashboards/details", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/auth/sign-in")) {
    return Response.redirect(new URL("/auth/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
