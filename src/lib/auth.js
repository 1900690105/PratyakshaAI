// lib/auth.ts
"use server";

import { clearAuthCookie, setAuthCookie } from "./cookies";

export async function saveAuthToken(idToken) {
  await setAuthCookie(idToken);
  return { success: true };
}

export async function logoutUser() {
  await clearAuthCookie();
  return { success: true };
}
