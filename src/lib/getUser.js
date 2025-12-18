// lib/getUser.ts
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return null;
  return snap.data();
}

export async function updateUserData(uid, data) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, data);
  return true;
}
