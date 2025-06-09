import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = localStorage.getItem("token");
  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.log("JWT_SECRET is not defined in environment variables");
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    const validate = jwt.verify(token.toString(), jwtSecret);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
