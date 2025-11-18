import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin-pamplabua-51nsugjabxhy") {
    return NextResponse.next();
  }

  // Проверяем подстраницы админки
  if (request.nextUrl.pathname.startsWith("/admin-pamplabua-51nsugjabxhy/")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || token.role !== "admin") {
      return NextResponse.redirect(
        new URL("/admin-pamplabua-51nsugjabxhy", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-pamplabua-51nsugjabxhy/:path*"],
};
