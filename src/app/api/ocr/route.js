import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = Buffer.from(await file.arrayBuffer());

    // Send to Google Vision
    const [result] = await client.textDetection(bytes);

    const detections = result.textAnnotations;
    const extractedText = detections?.[0]?.description || "";

    return NextResponse.json({ text: extractedText });
  } catch (err) {
    console.error("OCR Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
