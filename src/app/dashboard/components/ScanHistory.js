"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { Loader2, Apple, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ScanHistory({ darkMode, uid }) {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  /* ----------------------------------
     FETCH SCAN HISTORY
  ---------------------------------- */
  useEffect(() => {
    if (!uid) return;

    async function fetchHistory() {
      setLoading(true);
      setError("");

      try {
        const q = query(collection(db, "user_scans"), where("uid", "==", uid));

        const snap = await getDocs(q);
        const results = [];

        for (const docSnap of snap.docs) {
          const scan = docSnap.data();
          const barcode = scan.barcode;

          if (!barcode) continue;

          const productRef = doc(db, "productdetails", barcode);
          const productSnap = await getDoc(productRef);

          const product = productSnap.exists() ? productSnap.data() : null;

          results.push({
            barcode,
            productName: product?.name || scan.productName || "Unknown Product",
            category: product?.category || "Food",
            healthScore: scan.health_score || 0,
            scannedAt: scan.createdAt?.toDate().toLocaleString(),
          });
        }

        setScans(results);
        if (process.env.NODE_ENV == "development") {
          console.log("scan history productdetails,user_scans");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load scan history");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [uid]);

  /* ----------------------------------
     UI STATES
  ---------------------------------- */
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center py-6">{error}</p>;
  }

  if (scans.length === 0) {
    return (
      <p className="text-gray-500 text-center py-6">No scan history found.</p>
    );
  }

  /* ----------------------------------
     MAIN UI
  ---------------------------------- */
  return (
    <div
      className={`rounded-xl border p-6 ${
        darkMode ? "bg-[#161B22] border-[#2D3748]" : "bg-white border-gray-200"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Scan History</h2>

      <div className="space-y-3">
        {scans.map((scan, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${
              darkMode ? "bg-[#1E2329]" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  darkMode ? "bg-[#0D1117]" : "bg-white"
                }`}
              >
                <Apple className="w-6 h-6 text-[#0EAD69]" />
              </div>

              <div>
                <h3 className="font-semibold">{scan.productName}</h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {scan.category} • {scan.scannedAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  scan.healthScore >= 80
                    ? darkMode
                      ? "bg-green-500/20 text-green-400"
                      : "bg-green-100 text-green-700"
                    : scan.healthScore >= 50
                    ? darkMode
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-amber-100 text-amber-700"
                    : darkMode
                    ? "bg-red-500/20 text-red-400"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {scan.healthScore}
              </span>

              <button
                onClick={() =>
                  router.push(`/dashboard/history/${scan.barcode}`)
                }
                className="text-[#0EAD69] text-sm font-medium flex items-center gap-1 hover:underline"
              >
                View <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
