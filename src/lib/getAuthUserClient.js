// lib/getAuthUserClient.ts
"use client";

import { jwtDecode } from "jwt-decode";

export function getAuthUserClient() {
  if (typeof document === "undefined") return null;

  // Get cookie string safely
  const cookieString = document.cookie || "";
  if (!cookieString.includes("auth_token=")) return null;

  // Extract cookie safely
  const cookies = Object.fromEntries(
    cookieString.split("; ").map((c) => {
      const [name, ...rest] = c.split("=");
      return [name, rest.join("=")];
    })
  );

  const raw = cookies["auth_token"];
  if (!raw) return null;

  try {
    // Decode JWT (must NOT error)
    const decoded = jwtDecode(decodeURIComponent(raw));

    return {
      uid: decoded.sub || decoded.user_id || decoded.uid || null,
      email: decoded.email || null,
    };
  } catch (error) {
    console.error("Failed to decode client token:", error);
    return null;
  }
}
