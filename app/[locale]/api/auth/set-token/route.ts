import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token is missing" }, { status: 400 });
  }

 
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 2, 
  });

  return NextResponse.json({ message: "Token stored successfully" });
}
