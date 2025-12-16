// app/api/for-me-analysis/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req) {
  try {
    const { uid, userProfile, product } = await req.json();

    if (!uid || !userProfile || !product) {
      return NextResponse.json(
        { error: "Missing uid, userProfile or product data" },
        { status: 400 }
      );
    }

    const barcode = product.code;
    if (!barcode) {
      return NextResponse.json(
        { error: "Product barcode missing" },
        { status: 400 }
      );
    }

    /* ----------------------------------
       1️⃣ STORE PRODUCT (IF NOT EXISTS)
    ---------------------------------- */
    const productRef = doc(db, "productdetails", barcode);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      await setDoc(productRef, {
        barcode,
        name: product.product_name || "",
        ingredients: product.ingredients_text || "",
        allergens: product.allergens_tags || [],
        nutriments: product.nutriments || {},
        nova_group: product.nova_group || null,
        createdAt: serverTimestamp(),
      });
    }

    /* ----------------------------------
       2️⃣ GEMINI PROMPT
    ---------------------------------- */
    const prompt = `
You are a health and nutrition expert AI.

Analyze if the product is suitable for the user.

RETURN ONLY VALID JSON. NO MARKDOWN. NO EXTRA TEXT.

USER PROFILE:
${JSON.stringify(userProfile, null, 2)}

PRODUCT DATA:
${JSON.stringify(
  {
    name: product.product_name,
    ingredients: product.ingredients_text,
    allergens: product.allergens_tags,
    nutriments: product.nutriments,
    nova_group: product.nova_group,
    barcode,
  },
  null,
  2
)}

RESPONSE FORMAT:
{
  "overall_fit": "good | moderate | poor",
  "health_score": number,
  "is_recommended": boolean,
  "positive_factors": [],
  "negative_factors": [],
  "health_warnings": [],
  "diet_compatibility": {
    "compatible": boolean,
    "notes": string
  },
  "condition_analysis": [
    {
      "condition": string,
      "impact": "safe | caution | avoid",
      "reason": string
    }
  ],
  "ingredient_concerns": [
    {
      "ingredient": string,
      "risk_level": "low | medium | high",
      "reason": string
    }
  ],
  "nutrient_summary": {
    "sugar": "low | moderate | high",
    "salt": "low | moderate | high",
    "fat": "low | moderate | high",
    "saturated_fat": "low | moderate | high"
  },
  "final_advice": string
}
`;

    /* ----------------------------------
       3️⃣ CALL GEMINI
    ---------------------------------- */
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const geminiData = await geminiRes.json();

    let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    text = text.replace(/```json|```/g, "").trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid Gemini JSON output");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    /* ----------------------------------
       4️⃣ STORE AI RESULT (USER-SPECIFIC)
    ---------------------------------- */
    await addDoc(collection(db, "airesult"), {
      uid,
      barcode,
      productName: product.product_name || "",
      analysis, // FULL AI JSON STORED AS IS
      createdAt: serverTimestamp(),
    });

    /* ----------------------------------
       5️⃣ RETURN RESULT
    ---------------------------------- */
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("For Me API Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze product for user" },
      { status: 500 }
    );
  }
}

// // app/api/for-me-analysis/route.ts
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { userProfile, product } = await req.json();

//     if (!userProfile || !product) {
//       return NextResponse.json(
//         { error: "Missing userProfile or product data" },
//         { status: 400 }
//       );
//     }

//     const prompt = `
// You are a health and nutrition expert AI.

// Analyze if the product is suitable for the user.

// RETURN ONLY VALID JSON. NO MARKDOWN. NO EXTRA TEXT.

// USER PROFILE:
// ${JSON.stringify(userProfile, null, 2)}

// PRODUCT DATA:
// ${JSON.stringify(
//   {
//     name: product.product_name,
//     ingredients: product.ingredients_text,
//     allergens: product.allergens_tags,
//     nutriments: product.nutriments,
//     nova_group: product.nova_group,
//   },
//   null,
//   2
// )}

// RESPONSE FORMAT:
// {
//   "overall_fit": "good | moderate | poor",
//   "health_score": number,
//   "is_recommended": boolean,
//   "positive_factors": [],
//   "negative_factors": [],
//   "health_warnings": [],
//   "diet_compatibility": {
//     "compatible": boolean,
//     "notes": string
//   },
//   "condition_analysis": [
//     {
//       "condition": string,
//       "impact": "safe | caution | avoid",
//       "reason": string
//     }
//   ],
//   "ingredient_concerns": [
//     {
//       "ingredient": string,
//       "risk_level": "low | medium | high",
//       "reason": string
//     }
//   ],
//   "nutrient_summary": {
//     "sugar": "low | moderate | high",
//     "salt": "low | moderate | high",
//     "fat": "low | moderate | high",
//     "saturated_fat": "low | moderate | high"
//   },
//   "final_advice": string
// }
// `;

//     const geminiRes = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }],
//         }),
//       }
//     );

//     const geminiData = await geminiRes.json();
//     console.log(prompt);

//     let text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//     text = text.replace(/```json|```/g, "").trim();

//     const jsonMatch = text.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error("Invalid Gemini JSON output");
//     }

//     const parsed = JSON.parse(jsonMatch[0]);

//     return NextResponse.json(parsed);
//   } catch (error) {
//     console.error("For Me API Error:", error);
//     return NextResponse.json(
//       { error: "Failed to analyze product for user" },
//       { status: 500 }
//     );
//   }
// }
