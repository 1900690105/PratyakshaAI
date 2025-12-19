"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

export function ScanFood({ uid, form, darkMode, sugertoday, setSugerToday }) {
  const [activeTab, setActiveTab] = useState("barcode");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [show, setShow] = useState(false);
  const [verdictColor, setVerdictColor] = useState("");
  const [barcode, setBarcode] = useState("6111242100992");
  const isDark = darkMode;

  const userProfile = {
    age: form.age || null,
    gender: form.gender || "NA",
    conditions: form.conditions || "NA",
    allergies: form.allergies || "Na",
    diet: form.diet || "NA",
    goal: form.goal || "NA",
    sugertoday: sugertoday,
    dailysugerlimit: form.dailysugerlimit,
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
          uid: uid,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Analysis failed");
      }

      setAnalysis(result);
      setSugerToday(result.total_suger_in_product || null);
      if (process.env.NODE_ENV == "development") {
        console.log(result);
      }

      setVerdictColor(
        result.overall_fit === "good"
          ? "text-white text-green-600"
          : result.overall_fit === "moderate"
          ? "text-white text-yellow-600"
          : "text-white bg-red-600"
      );
    } catch (err) {
      console.error(err);
      alert("Failed to analyze product for you");
    } finally {
      setAnalyzing(false);
    }
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
        if (process.env.NODE_ENV == "development") {
          console.log(product);
        }

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

  const handleConsume = async () => {
    if (!uid) {
      console.error("UID missing");
      return;
    }

    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);

      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const consumedSugar = sugertoday; // sugar user just consumed

      if (!snap.exists()) {
        // 🆕 First time user
        await setDoc(userRef, {
          sugar_today: consumedSugar,
          sugar_date: today,
          updatedAt: serverTimestamp(),
        });
      } else {
        const data = snap.data();

        if (data.sugar_date !== today) {
          // 🔄 New day → reset sugar
          await setDoc(
            userRef,
            {
              sugar_today: consumedSugar,
              sugar_date: today,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        } else {
          // ➕ Same day → add sugar
          await setDoc(
            userRef,
            {
              sugar_today: increment(consumedSugar),
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        }
      }

      await fetch("/api/sugar/consume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          sugarConsumed: consumedSugar,
        }),
      });

      alert(`${consumedSugar} Sugar updated successfully`);
    } catch (error) {
      console.error("Failed to update sugar_today:", error);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* TITLE */}
        <div>
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Scan Food
          </h1>
          <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Scan barcodes or ingredient lists to reveal food insights instantly.
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex gap-4">
          <Button
            variant={activeTab === "barcode" ? "default" : "outline"}
            onClick={() => setActiveTab("barcode")}
            className={`flex items-center gap-2 ${
              isDark && activeTab !== "barcode"
                ? "border-gray-600 text-gray-300"
                : ""
            }`}
          >
            <QrCode className="w-4 h-4" />
            Barcode Scan
          </Button>

          {/* <Button
            variant={activeTab === "ocr" ? "default" : "outline"}
            onClick={() => setActiveTab("ocr")}
            className={`flex items-center gap-2 ${
              isDark && activeTab !== "ocr"
                ? "border-gray-600 text-gray-300"
                : ""
            }`}
          >
            <FileText className="w-4 h-4" />
            OCR Scan
          </Button> */}
        </div>

        {/* MAIN CARD */}
        <Card
          className={`border shadow ${
            isDark
              ? "bg-[#161B22] border-[#2D3748]"
              : "bg-white border-gray-200"
          }`}
        >
          <CardHeader>
            <CardTitle
              className={`flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {activeTab === "barcode" ? (
                <>
                  <QrCode className="w-5 h-5 text-emerald-500" />
                  Barcode Scanner
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 text-indigo-500" />
                  Ingredient OCR Scanner
                </>
              )}
            </CardTitle>
          </CardHeader>

          <div className="md:flex md:justify-center">
            <CardContent className="space-y-6">
              {/* BARCODE MODE */}
              {activeTab === "barcode" && (
                <>
                  <div className="p-6">
                    <div className="md:hidden sm:visible">
                      {!show && (
                        <BarcodeScanner
                          onDetected={handleDetected}
                          darkMode={isDark}
                        />
                      )}
                    </div>
                  </div>
                  <div className="md:flex md:flex-col md:-mt-16 hidden">
                    {" "}
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Enter barcode"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      className="border p-2 rounded mt-2 md:w-[400px] w-[250px]"
                    />
                    <Button
                      className="mt-5 md:w-[400px] w-[250px]"
                      disabled={!barcode}
                      onClick={() => handleDetected(barcode)}
                    >
                      Test Scan
                    </Button>
                  </div>

                  {loading && (
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Fetching product details...
                    </div>
                  )}
                </>
              )}

              {/* PRODUCT INFO */}
              <ProductInfo data={data} darkMode={isDark} />

              {/* ACTION BUTTONS */}
              {show && (
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleForMe}
                    disabled={analyzing}
                    className="bg-indigo-600 hover:bg-indigo-700 p-5 md:w-44 md:h-12 flex gap-2 items-center"
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

                  <Button
                    onClick={handleConsume}
                    disabled={!analysis?.overall_fit}
                    className={`p-5 md:w-44 w-30 md:h-12 h-10 ${
                      analysis?.overall_fit === "good"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : analysis?.overall_fit === "moderate"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    Consume Product
                  </Button>
                </div>
              )}

              {/* AI ANALYSIS */}
              <ForMeAnalysisCard analysis={analysis} darkMode={isDark} />

              {/* OCR MODE */}
              {activeTab === "ocr" && (
                <div className="p-6">
                  <OCRUploader onExtract={(text) => console.log(text)} />
                </div>
              )}

              {/* FOOTER NOTE */}
              <div
                className={`text-center text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
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
