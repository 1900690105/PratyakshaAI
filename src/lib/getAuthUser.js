// lib/getAuthUser.ts
"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      uid: decoded.user_id || decoded.uid || null,
      email: decoded.email || null,
      exp: decoded.exp || null,
    };
  } catch (error) {
    console.error("Invalid auth token", error);
    return null;
  }
}
