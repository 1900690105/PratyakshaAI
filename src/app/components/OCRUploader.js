"use client";

import { useState } from "react";
import { Upload, Loader2, FileText } from "lucide-react";
import Image from "next/image";

export function OCRUploader({ onExtract }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/ocr", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert("OCR Error: " + data.error);
      return;
    }

    setText(data.text);
    if (onExtract) onExtract(data.text);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2 text-xl font-bold">
        <FileText className="w-6 h-6 text-indigo-600" />
        OCR Ingredient Extractor
      </div>

      {/* Upload Box */}
      <label className="border-2 border-dashed p-6 rounded-lg flex flex-col items-center cursor-pointer hover:border-indigo-500 transition">
        <Upload className="w-8 h-8 text-gray-500" />
        <p className="text-gray-600">Click to upload image</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {/* Preview */}
      {preview && (
        <Image
          src={preview}
          className="rounded-lg shadow"
          alt="preview"
          width={100}
          height={100}
        />
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-indigo-600">
          <Loader2 className="animate-spin w-5 h-5" /> Extracting...
        </div>
      )}

      {/* Output */}
      {text && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="font-medium mb-1">Extracted Text:</p>
          <pre className="whitespace-pre-wrap text-sm">{text}</pre>
        </div>
      )}
    </div>
  );
}
