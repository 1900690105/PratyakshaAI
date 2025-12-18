// // src/lib/auth.ts
// "use server";

// import { clearAuthCookie, setAuthCookie } from "./cookies";

// export async function saveAuthToken(token, uid) {
//   await setAuthCookie(token, uid);
// }

// export async function logoutUser() {
//   await clearAuthCookie();
//   return { success: true };
// }

export async function saveAuthToken(token, uid) {
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, uid }),
  });

  if (!res.ok) {
    throw new Error("Failed to save auth session");
  }
}

export async function logoutUser() {
  await fetch("/api/auth/logout", { method: "POST" });
}
