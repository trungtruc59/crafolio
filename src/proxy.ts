
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!request.auth;
  const isAdminRoute = pathname.startsWith("/admin");
  const isUserDashboardRoute = pathname.startsWith("/dashboard");

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isUserDashboardRoute && request.auth?.user?.role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdminRoute && request.auth?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/admin/:path*"],
};
