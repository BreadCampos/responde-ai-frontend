import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST() {
  const serializedCookie = cookie.serialize("isLoggedIn", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: -1,
  });

  const response = NextResponse.json({ message: "Logout bem-sucedido" });
  response.headers.set("Set-Cookie", serializedCookie);
  return response;
}
