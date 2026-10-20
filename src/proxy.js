import { NextResponse } from "next/server";

// Ye pages bina login ke khul sakte hain
const PUBLIC_PATHS = ["/", "/login", "/signup"];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Login hai aur landing page (/) khola: dashboard bhejo
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // static files, images, favicon par proxy mat chalao
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|css|js|woff2?)$).*)",
  ],
};
