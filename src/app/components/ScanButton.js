"use client";

"use client";

import { Camera, QrCode, X, Upload, Scan } from "lucide-react";
import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

function ScanButton() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanMethod, setScanMethod] = useState(null); // "camera" | "upload"
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [ocrText, setOcrText] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleScanClick = () => {
    setShowScanner(true);
  };

  const handleClose = () => {
    setShowScanner(false);
    setScanMethod(null);
    setUploadedImage(null);
    setScanResult(null);
    setOcrText(null);
    setError(null);
    setScanning(false);
  };

  const handleMethodSelect = (method) => {
    setScanMethod(method);
    setScanResult(null);
    setOcrText(null);
    setError(null);

    if (method === "upload") {
      fileInputRef.current?.click();
    } else if (method === "camera") {
      // keep your camera flow or simulated scan here
      simulateScan();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setUploadedImage(result);
        setScanResult(null);
        setOcrText(null);
        setError(null);
        // We DO NOT auto-scan here. User will click "Extract Text From Image".
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setScanResult(null);
    setOcrText(null);
    setError(null);

    setTimeout(() => {
      setScanning(false);
      setScanResult({
        productName: "Organic Whole Wheat Bread",
        barcode: "1234567890123",
        healthScore: 85,
        status: "healthy",
      });
    }, 2000);
  };

  const handleOcrScan = async () => {
    if (!uploadedImage) return;
    setScanning(true);
    setOcrText(null);
    setError(null);

    try {
      const { data } = await Tesseract.recognize(uploadedImage, "eng", {
        logger: (m) => console.log(m),
      });

      setOcrText(data.text || "");
      setScanning(false);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to extract text. Please try again with a clearer image."
      );
      setScanning(false);
    }
  };

  return (
    <>
      <section className="pb-6 max-w-md mx-auto">
        <button
          onClick={handleScanClick}
          className="w-full h-16 bg-linear-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#4CAF50] hover:to-[#2E7D32] text-white font-bold rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
          <span className="text-lg relative z-10">Scan Product Now</span>
          <QrCode className="w-5 h-5 opacity-70 relative z-10" />
        </button>

        <p className="text-center text-sm text-[#8A8A8A] mt-4 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></span>
          Scan using QR or Barcode instantly
        </p>
      </section>

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Scan Product</h2>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Method selection */}
              {!scanMethod && !scanResult && !uploadedImage && !scanning && (
                <div className="space-y-4">
                  <p className="text-center text-gray-600 mb-6">
                    Choose how to scan your product
                  </p>

                  <button
                    onClick={() => handleMethodSelect("camera")}
                    className="w-full p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:border-[#2E7D32] transition-all duration-300 group"
                  >
                    <Camera className="w-12 h-12 text-[#2E7D32] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-[#1A1A1A] mb-1">
                      Use Camera
                    </h3>
                    <p className="text-sm text-gray-600">
                      Scan barcode or QR code
                    </p>
                  </button>

                  <button
                    onClick={() => handleMethodSelect("upload")}
                    className="w-full p-6 bg-linear-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 hover:border-[#2E7D32] transition-all duration-300 group"
                  >
                    <Upload className="w-12 h-12 text-[#2E7D32] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-[#1A1A1A] mb-1">
                      Upload Image
                    </h3>
                    <p className="text-sm text-gray-600">Choose from gallery</p>
                  </button>
                </div>
              )}

              {/* Uploaded image + OCR button */}
              {scanMethod === "upload" && uploadedImage && !scanning && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    Preview your image, then extract text from it.
                  </p>
                  <div className="w-full max-h-64 overflow-hidden rounded-2xl border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="w-full object-contain"
                    />
                  </div>

                  <button
                    onClick={handleOcrScan}
                    className="w-full py-3 bg-linear-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Scan className="w-5 h-5" />
                    Extract Text From Image
                  </button>
                </div>
              )}

              {/* Scanning state */}
              {scanning && (
                <div className="text-center py-12">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
                    <Scan className="w-12 h-12 text-[#2E7D32] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                    Scanning...
                  </h3>
                  <p className="text-sm text-gray-600">
                    Analyzing product information
                  </p>
                </div>
              )}

              {/* Camera simulated result */}
              {scanResult && !scanning && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
                  <div className="text-center py-4">
                    <div className="w-20 h-20 bg-linear-to-br from-[#2E7D32] to-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">✓</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                      Scan Complete!
                    </h3>
                  </div>

                  <div className="bg-linear-to-br from-green-50 to-white p-5 rounded-2xl border border-green-200">
                    <h4 className="font-bold text-[#1A1A1A] mb-3">
                      {scanResult.productName}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Barcode:</span>
                        <span className="font-mono text-[#1A1A1A]">
                          {scanResult.barcode}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Health Score:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-[#2E7D32] to-[#4CAF50]"
                              style={{
                                width: `${scanResult.healthScore ?? 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-bold text-[#2E7D32]">
                            {scanResult.healthScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 bg-linear-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    View Full Details
                  </button>
                </div>
              )}

              {/* OCR result */}
              {ocrText && !scanning && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-500">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">
                    Extracted Text
                  </h3>
                  <div className="max-h-60 overflow-auto bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-800 whitespace-pre-wrap">
                    {ocrText}
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 bg-linear-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* Error */}
              {error && !scanning && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
}

export default ScanButton;

// import { Camera, QrCode, X, Upload, Scan } from "lucide-react";
// import React, { useState, useRef } from "react";

// function ScanButton() {
//   const [showScanner, setShowScanner] = useState(false);
//   const [scanMethod, setScanMethod] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [scanning, setScanning] = useState(false);
//   const [scanResult, setScanResult] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleScanClick = () => {
//     setShowScanner(true);
//   };

//   const handleClose = () => {
//     setShowScanner(false);
//     setScanMethod(null);
//     setUploadedImage(null);
//     setScanResult(null);
//     setScanning(false);
//   };

//   const handleMethodSelect = (method) => {
//     setScanMethod(method);
//     if (method === "upload") {
//       fileInputRef.current?.click();
//     } else if (method === "camera") {
//       simulateScan();
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setUploadedImage(event.target.result);
//         simulateScan();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const simulateScan = () => {
//     setScanning(true);
//     setScanResult(null);

//     // Simulate scanning process
//     setTimeout(() => {
//       setScanning(false);
//       setScanResult({
//         productName: "Organic Whole Wheat Bread",
//         barcode: "1234567890123",
//         healthScore: 85,
//         status: "healthy",
//       });
//     }, 2000);
//   };

//   return (
//     <>
//       <section className="pb-6 max-w-md mx-auto">
//         <button
//           onClick={handleScanClick}
//           className="w-full h-16 bg-linear-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#4CAF50] hover:to-[#2E7D32] text-white font-bold rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl group relative overflow-hidden"
//         >
//           <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//           <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
//           <span className="text-lg relative z-10">Scan Product Now</span>
//           <QrCode className="w-5 h-5 opacity-70 relative z-10" />
//         </button>

//         <p className="text-center text-sm text-[#8A8A8A] mt-4 flex items-center justify-center gap-2">
//           <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></span>
//           Scan using QR or Barcode instantly
//         </p>
//       </section>

//       {/* Scanner Modal */}
//       {showScanner && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
//           <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in slide-in-from-bottom duration-500">
//             {/* Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-[#1A1A1A]">Scan Product</h2>
//               <button
//                 onClick={handleClose}
//                 className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="p-6">
//               {!scanMethod && !scanResult && (
//                 <div className="space-y-4">
//                   <p className="text-center text-gray-600 mb-6">
//                     Choose how to scan your product
//                   </p>

//                   <button
//                     onClick={() => handleMethodSelect("camera")}
//                     className="w-full p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:border-[#2E7D32] transition-all duration-300 group"
//                   >
//                     <Camera className="w-12 h-12 text-[#2E7D32] mx-auto mb-3 group-hover:scale-110 transition-transform" />
//                     <h3 className="font-bold text-[#1A1A1A] mb-1">
//                       Use Camera
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       Scan barcode or QR code
//                     </p>
//                   </button>

//                   <button
//                     onClick={() => handleMethodSelect("upload")}
//                     className="w-full p-6 bg-linear-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 hover:border-[#2E7D32] transition-all duration-300 group"
//                   >
//                     <Upload className="w-12 h-12 text-[#2E7D32] mx-auto mb-3 group-hover:scale-110 transition-transform" />
//                     <h3 className="font-bold text-[#1A1A1A] mb-1">
//                       Upload Image
//                     </h3>
//                     <p className="text-sm text-gray-600">Choose from gallery</p>
//                   </button>
//                 </div>
//               )}

//               {scanning && (
//                 <div className="text-center py-12">
//                   <div className="relative w-24 h-24 mx-auto mb-6">
//                     <div className="absolute inset-0 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
//                     <Scan className="w-12 h-12 text-[#2E7D32] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//                   </div>
//                   <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
//                     Scanning...
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Analyzing product information
//                   </p>
//                 </div>
//               )}

//               {scanResult && (
//                 <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
//                   <div className="text-center py-4">
//                     <div className="w-20 h-20 bg-linear-to-br from-[#2E7D32] to-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
//                       <span className="text-4xl">✓</span>
//                     </div>
//                     <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
//                       Scan Complete!
//                     </h3>
//                   </div>

//                   <div className="bg-linear-to-br from-green-50 to-white p-5 rounded-2xl border border-green-200">
//                     <h4 className="font-bold text-[#1A1A1A] mb-3">
//                       {scanResult.productName}
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Barcode:</span>
//                         <span className="font-mono text-[#1A1A1A]">
//                           {scanResult.barcode}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Health Score:</span>
//                         <div className="flex items-center gap-2">
//                           <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                               className="h-full bg-linear-to-r from-[#2E7D32] to-[#4CAF50]"
//                               style={{ width: `${scanResult.healthScore}%` }}
//                             ></div>
//                           </div>
//                           <span className="font-bold text-[#2E7D32]">
//                             {scanResult.healthScore}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleClose}
//                     className="w-full py-3 bg-linear-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
//                   >
//                     View Full Details
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hidden File Input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handleFileUpload}
//         className="hidden"
//       />
//     </>
//   );
// }

// export default ScanButton;
