// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { token, uid } = await req.json();

//   if (!token || !uid) {
//     return NextResponse.json(
//       { error: "Missing token or uid" },
//       { status: 400 }
//     );
//   }

//   const res = NextResponse.json({ success: true });

//   res.cookies.set("auth_token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//   });

//   res.cookies.set("uid", uid, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7,
//   });

//   return res;
// }

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, uid } = await req.json();

    if (!token || !uid) {
      return NextResponse.json(
        { error: "Missing token or uid" },
        { status: 400 }
      );
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    res.cookies.set({
      name: "uid",
      value: uid,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("Session error:", err);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
