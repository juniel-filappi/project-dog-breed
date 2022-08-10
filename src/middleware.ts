import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { origin } = req.nextUrl;

  const token = req.cookies.get("token") || "";

  if (!token) {
    return NextResponse.redirect(`${origin}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/dogs/:path*", "/dogs"],
};
