// TODO: fix, added just for build
import { ROUTES } from "@/core/routes/route-constants";
import * as cookie from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const serializedCookie = cookie.serialize("isLoggedIn", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: -1,
  });

  window.location.href = ROUTES.LOGIN;
  const response = NextResponse.json({ message: "Logout bem-sucedido" });
  response.headers.set("Set-Cookie", serializedCookie);
  return response;
}
