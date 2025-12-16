"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export async function saveProductToFirestore(barcode, product) {
  if (!barcode || !product) return;

  const ref = doc(db, "product_details", barcode);

  const snap = await getDoc(ref);
  if (snap.exists()) {
    // Already stored → skip overwrite
    return;
  }

  await setDoc(ref, {
    barcode,
    product_name: product.product_name || "",
    brand: product.brands || "",
    nutriments: product.nutriments || {},
    ingredients_text: product.ingredients_text || "",
    allergens: product.allergens_tags || [],
    nutriscore_grade: product.nutriscore_grade || null,
    nova_group: product.nova_group || null,
    images: product.selected_images || {},
    source: "openfoodfacts",
    raw: product, // full data (optional but powerful)
    createdAt: serverTimestamp(),
  });
}
