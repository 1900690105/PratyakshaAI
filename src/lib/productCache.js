import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export async function getProductByBarcode(barcode) {
  const ref = doc(db, "productdetails", barcode);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
}

export async function saveProductToCache(barcode, product) {
  const ref = doc(db, "productdetails", barcode);

  await setDoc(ref, {
    barcode,
    name: product.product_name || "",
    ingredients_text: product.ingredients_text || "",
    allergens: product.allergens_tags || [],
    nutriments: product.nutriments || {},
    nova_group: product.nova_group ?? null,

    // 🔥 SAFE: store raw JSON as string
    raw_json: JSON.stringify(product),

    createdAt: serverTimestamp(),
    source: "openfoodfacts",
  });
}

export async function saveUserScan(uid, barcode) {
  await addDoc(collection(db, "user_scans"), {
    uid,
    barcode,
    scannedAt: serverTimestamp(),
  });
}
