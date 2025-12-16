"use client";

import { useState } from "react";
import { FileText, QrCode, Loader2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OCRUploader } from "@/app/components/OCRUploader";
import BarcodeScanner from "@/app/components/BarcodeScanner";
import ProductInfo from "./ProductInfo";
import { FaUserMd } from "react-icons/fa";
import {
  getProductByBarcode,
  saveProductToCache,
  saveUserScan,
} from "@/lib/productCache";
import { ForMeAnalysisCard } from "./PersonalizeData";

export function ScanFood() {
  const [activeTab, setActiveTab] = useState("barcode");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [show, setShow] = useState(false);
  const uid = "a5KdQQZlqtbTa0FAkdduWJhG2SB3";

  const userProfile = {
    age: 28,
    gender: "Male",
    conditions: ["Diabetes"],
    allergies: ["Milk", "Soy"],
    diet: "Low Sugar",
    goal: "Weight loss",
  };

  const handleForMe = async () => {
    if (!data) {
      alert("Please scan a product first");
      return;
    }

    try {
      setAnalyzing(true);

      const res = await fetch("/api/for-me-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfile,
          product: data,
          uid: "a5KdQQZlqtbTa0FAkdduWJhG2SB3",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Analysis failed");
      }

      console.log("For Me Analysis:", result);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze product for you");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleExtract = (text) => {
    console.log("Extracted text:", text);
  };

  const handleDetected = async (code) => {
    try {
      setLoading(true);

      /* -------------------------------
       1️⃣ CHECK FIRESTORE FIRST
    -------------------------------- */
      const cachedProduct = await getProductByBarcode(code);

      if (cachedProduct?.raw_json) {
        const product = JSON.parse(cachedProduct.raw_json);

        // ✅ Use cached product
        setData(product);
        setShow(true);

        // ✅ STOP here (important)
        return;
      }

      /* -------------------------------
       2️⃣ FETCH FROM OPENFOODFACTS
    -------------------------------- */
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${code}.json`
      );

      if (!res.ok) {
        throw new Error("OpenFoodFacts request failed");
      }

      const result = await res.json();

      if (result.status !== 1) {
        alert("Product not found");
        return;
      }

      const product = result.product;

      /* -------------------------------
       3️⃣ SAVE TO FIRESTORE (productdetails)
    -------------------------------- */
      await saveUserScan(uid, code);
      await saveProductToCache(code, product);

      /* -------------------------------
       4️⃣ UPDATE UI
    -------------------------------- */
      setData(product);
      setShow(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while fetching product");
    } finally {
      setLoading(false);
    }
  };

  const startFakeScan = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
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
          <div className="md:flex md:justify-center">
            <CardContent className="space-y-6">
              {/* SCAN FRAME (Barcode Mode) */}
              {activeTab === "barcode" && (
                <>
                  <div className="p-6">
                    {!show && <BarcodeScanner onDetected={handleDetected} />}
                    <div>
                      <Button
                        className="mt-5 flex gap-3 flex-col sm:flex-row md:w-[400px] w-[250px]"
                        onClick={() => handleDetected("6111242100992")}
                      >
                        Test Scan
                      </Button>
                    </div>
                  </div>
                  {loading && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Fetching product details...
                    </div>
                  )}
                </>
              )}
              <ProductInfo data={data} />
              {show && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleForMe}
                    disabled={analyzing}
                    className="bg-indigo-600 p-5 w-44 h-12 flex gap-2 items-center"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing
                      </>
                    ) : (
                      <>
                        <FaUserMd />
                        For Me
                      </>
                    )}
                  </Button>
                </div>
              )}

              <ForMeAnalysisCard analysis={analysis} />
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
          </div>
        </Card>
      </div>
    </>
  );
}
