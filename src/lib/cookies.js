// lib/cookies.ts
"use server";

import { cookies } from "next/headers";

export async function setAuthCookie(token) {
  const cookieStore = await cookies(); // ⬅ IMPORTANT

  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies(); // ⬅ IMPORTANT

  cookieStore.delete("auth_token");
}
