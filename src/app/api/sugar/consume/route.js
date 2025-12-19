import { NextResponse } from "next/server";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { adminMessaging } from "@/server/firebaseAdmin";

export async function POST(req) {
  try {
    const { uid, sugarConsumed } = await req.json();

    if (!uid || sugarConsumed === undefined || sugarConsumed === null) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    const today = new Date().toISOString().slice(0, 10);
    let sugarToday = Number(sugarConsumed);
    let limit = 25;
    let fcmToken = null;

    if (snap.exists()) {
      const data = snap.data();
      limit = data.dailysugerlimit || 25;
      fcmToken = data.fcmToken || null;

      if (data.sugar_date === today) {
        sugarToday = (data.sugar_today || 0) + sugarToday;
      }
    }

    await setDoc(
      userRef,
      {
        sugar_today: sugarToday,
        sugar_date: today,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    if (fcmToken && sugarToday >= limit) {
      try {
        await adminMessaging.send({
          token: fcmToken,
          notification: {
            title: "🍬 Sugar Limit Reached",
            body: `You consumed ${sugarToday}g sugar today. Limit is ${limit}g.`,
          },
        });
      } catch (e) {
        console.warn("FCM failed:", e.message);
      }
    }

    return NextResponse.json({
      sugar_today: sugarToday,
      limit,
    });
  } catch (err) {
    console.error("Sugar consume error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { adminMessaging } from "@/server/firebaseAdmin";

// export async function POST(req) {
//   try {
//     const { uid, sugarConsumed } = await req.json();

//     if (!uid || !sugarConsumed) {
//       return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//     }

//     const userRef = doc(db, "users", uid);
//     const snap = await getDoc(userRef);

//     const today = new Date().toISOString().slice(0, 10);
//     let sugarToday = sugarConsumed;
//     let limit = 25;
//     let fcmToken = null;

//     if (snap.exists()) {
//       const data = snap.data();
//       limit = data.dailysugerlimit || 25;
//       fcmToken = data.fcmToken || null;

//       if (data.sugar_date === today) {
//         sugarToday = (data.sugar_today || 0) + sugarConsumed;
//       }
//     }

//     await setDoc(
//       userRef,
//       {
//         sugar_today: sugarToday,
//         sugar_date: today,
//         updatedAt: serverTimestamp(),
//       },
//       { merge: true }
//     );

//     /* 🔔 SEND NOTIFICATION */
//     if (fcmToken && sugarToday >= limit) {
//       await adminMessaging.send({
//         token: fcmToken,
//         notification: {
//           title: "🍬 Sugar Limit Reached",
//           body: `You consumed ${sugarToday}g sugar today. Limit is ${limit}g.`,
//         },
//       });
//     }

//     return NextResponse.json({ sugarToday, limit });
//   } catch (err) {
//     console.error("Sugar consume error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
