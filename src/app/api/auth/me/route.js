import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // ✅ MUST await cookies()
    const cookieStore = await cookies();

    const uid = cookieStore.get("uid")?.value;
    const token = cookieStore.get("auth_token")?.value;

    if (!uid || !token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // ✅ Token exists, user exists
    return NextResponse.json(
      {
        authenticated: true,
        uid,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth /me error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
