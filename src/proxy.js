import { NextResponse } from "next/server";

// Ye pages bina login ke khul sakte hain
const PUBLIC_PATHS = ["/", "/login", "/signup"];

export function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.includes(pathname);

  // Token nahi hai aur page protected hai: landing page pe bhejo
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Token hai aur landing/login/signup khola: dashboard bhejo
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // static files, images, favicon par proxy mat chalao
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
