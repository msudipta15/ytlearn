import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const jwtsecret = process.env.NEXT_PUBLIC_JWT_KEY;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!jwtsecret) {
    console.log("Invalid jwtsecret !");
    return;
  }

  try {
    const validtoken = jwt.verify(token.toString(), jwtsecret);
    return NextResponse.next();
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  middleware,
  matcher: ["/admin/:path*"],
};
