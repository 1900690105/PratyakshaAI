"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Camera, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

export default function BarcodeScanner({ onDetected }) {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // ✅ STOP CAMERA STREAM CLEANLY
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startScanner = async () => {
    stopCamera(); // cleanup previous session
    setScanning(true);
    setError("");
    setPreviewImage(null);

    try {
      const codeReader = new BrowserMultiFormatReader();
      const constraints = {
        video: {
          facingMode: { ideal: "environment" }, // rear camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true); // iOS fix
        await videoRef.current.play();
      }

      // 🔥 Keep decoding video stream until barcode found
      await codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            const code = result.getText();
            stopCamera();
            setScanning(false);

            if (onDetected) onDetected(code);
          }
        }
      );
    } catch (err) {
      console.error(err);
      setError("Camera access blocked or unavailable.");
      setScanning(false);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* TITLE */}
      <h2 className="text-base font-bold flex items-center gap-2">
        <Camera className="w-6 h-6 text-indigo-600" />
        Scan Product Barcode
      </h2>

      {/* VIDEO SCANNER WINDOW */}
      <div className="md:w-full w-[250px]  aspect-video bg-black rounded-lg overflow-hidden relative">
        <video ref={videoRef} className="w-full h-full object-cover" />

        {scanning && (
          <>
            <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg animate-pulse"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
          </>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* BUTTONS */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={startScanner}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {scanning ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Scanning...
            </div>
          ) : (
            "Start Camera Scan"
          )}
        </button>
      </div>
    </div>
  );
}
