import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token is missing" }, { status: 400 });
  }

  // Set the HTTP-only cookie
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true, // Prevents JS access
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ message: "Token stored successfully" });
}
