import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

//using "jose" for verifying jwt

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to /login without token verification
  if (pathname === "/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const jwtSecret = process.env.JWT_KEY;

  // Check if JWT secret is defined
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in environment variables");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify the token
  try {
    // jose needs encoded format for verifying
    const secret = new TextEncoder().encode(jwtSecret);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/addtopic", "/topics"],
};
