// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req) {
  const uid = req.cookies.get("uid")?.value;

  if (!uid && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
