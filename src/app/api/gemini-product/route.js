import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { barcode } = await req.json();

    if (!barcode) {
      return NextResponse.json({ error: "Barcode missing" }, { status: 400 });
    }

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" +
        process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Strict JSON only. No markdown, no backticks, no explanation.

Return JSON for product detected from barcode: ${barcode}

{
  "barcode": "",
  "product_name": "",
  "brand": ""
}
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiRes.json();

    // Extract model output text
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      return NextResponse.json(
        { error: "Gemini returned empty content." },
        { status: 500 }
      );
    }

    // Remove possible code fences
    text = text.replace(/```/g, "").trim();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json(
        { error: "No JSON found inside Gemini response." },
        { status: 500 }
      );
    }

    const finalJSON = JSON.parse(match[0]);

    return NextResponse.json(finalJSON);
  } catch (err) {
    console.error("Gemini JSON parse error:", err);
    return NextResponse.json(
      { error: "Failed to parse Gemini output." },
      { status: 500 }
    );
  }
}
