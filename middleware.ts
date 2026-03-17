import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const parsed = await decrypt(session);
      if (!parsed || !parsed.user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect from login/signup if already logged in
  if (["/login", "/signup"].includes(request.nextUrl.pathname)) {
    if (session) {
      try {
        const parsed = await decrypt(session);
        if (parsed && parsed.user) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {}
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
