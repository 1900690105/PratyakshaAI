"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Camera, Loader2 } from "lucide-react";

export default function BarcodeScanner({ onDetected, darkMode }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  /* -------------------------------
     Stop Camera Cleanly
  -------------------------------- */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  /* -------------------------------
     Start Scanner
  -------------------------------- */
  const startScanner = async () => {
    stopCamera();
    setScanning(true);
    setError("");

    try {
      const codeReader = new BrowserMultiFormatReader();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        await videoRef.current.play();
      }

      await codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result) => {
          if (result) {
            stopCamera();
            setScanning(false);
            onDetected?.(result.getText());
          }
        }
      );
    } catch (err) {
      console.error(err);
      setError("Camera access denied or unavailable");
      setScanning(false);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="space-y-5">
      {/* TITLE */}
      <h2
        className={`flex items-center gap-2 font-semibold text-lg ${
          darkMode ? "text-emerald-400" : "text-indigo-600"
        } `}
      >
        <Camera
          className={`w-6 h-6 ${
            darkMode ? "text-emerald-400" : "text-indigo-600"
          }`}
        />
        Scan Product Barcode
      </h2>

      {/* CAMERA WINDOW */}
      <div
        className={`relative md:w-[420px] w-full aspect-video rounded-xl overflow-hidden border ${
          darkMode ? "bg-black border-[#2D3748]" : "bg-black border-gray-300"
        }`}
      >
        <video ref={videoRef} className="w-full h-full object-cover" />

        {scanning && (
          <>
            <div
              className={`absolute inset-0 rounded-xl border-2 animate-pulse ${
                darkMode ? "border-emerald-500" : "border-indigo-500"
              }`}
            />
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 animate-pulse" />
          </>
        )}
      </div>

      {/* ERROR */}
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      {/* ACTION BUTTON */}
      <button
        onClick={startScanner}
        disabled={scanning}
        className={`w-full md:w-[420px] py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
          darkMode
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {scanning ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Scanning...
          </>
        ) : (
          "Start Camera Scan"
        )}
      </button>
    </div>
  );
}
