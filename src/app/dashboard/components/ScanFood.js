"use client";

import { useState } from "react";
import {
  Camera,
  FileText,
  QrCode,
  ScanLine,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OCRUploader } from "@/app/components/OCRUploader";
import BarcodeScanner from "@/app/components/BarcodeScanner";
import ProductInfo from "./ProductInfo";

export function ScanFood() {
  const [activeTab, setActiveTab] = useState("barcode");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleExtract = (text) => {
    console.log("Extracted text:", text);
  };

  const handleDetected = async (code) => {
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${code}.json`
      );
      if (!res.ok) {
        throw new Error("OpenFoodFacts request failed");
      }
      const data = await res.json();
      if (data.status !== 1) {
        return null; // product not found
      }
      console.log(data.product);
      setData(data.product);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const startFakeScan = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">Scan Food</h1>
        <p className="text-gray-600 mt-1">
          Scan barcodes or ingredient lists to reveal food insights instantly.
        </p>
      </div>

      {/* TAB SWITCHER */}
      <div className="flex gap-4">
        <Button
          variant={activeTab === "barcode" ? "default" : "outline"}
          onClick={() => setActiveTab("barcode")}
          className="flex items-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          Barcode Scan
        </Button>

        <Button
          variant={activeTab === "ocr" ? "default" : "outline"}
          onClick={() => setActiveTab("ocr")}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          OCR Scan
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <Card className="shadow border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {activeTab === "barcode" ? (
              <>
                <QrCode className="w-5 h-5 text-emerald-600" />
                Barcode Scanner
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 text-indigo-600" />
                Ingredient OCR Scanner
              </>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* SCAN FRAME (Barcode Mode) */}
          {activeTab === "barcode" && (
            <>
              <div className="p-6">
                <BarcodeScanner onDetected={handleDetected} />
                <Button onClick={() => handleDetected("8901725016296")}>
                  Test Scan
                </Button>
              </div>
            </>
          )}

          <ProductInfo data={data} />

          {/* SCAN FRAME (OCR Mode) */}
          {activeTab === "ocr" && (
            <div className="p-6">
              <OCRUploader
                onExtract={(text) => {
                  console.log("OCR Result:", text);
                }}
              />
            </div>
          )}

          {/* Optional Info */}
          <div className="text-center text-gray-500 text-sm">
            {activeTab === "barcode"
              ? "Align the barcode inside the frame for best results."
              : "Ensure ingredient text is clear and well-lit."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
