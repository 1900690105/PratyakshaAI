"use client";

import React, { useEffect, useState } from "react";
import {
  Camera,
  TrendingUp,
  AlertTriangle,
  Apple,
  ChevronRight,
} from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useCurrentUser } from "@/app/components/GetUID";

/* ---------------------------
  SCORE BADGE
---------------------------- */
function ScoreBadge({ score, darkMode }) {
  const color =
    score >= 80
      ? darkMode
        ? "bg-green-500/20 text-green-400"
        : "bg-green-100 text-green-700"
      : score >= 50
      ? darkMode
        ? "bg-amber-500/20 text-amber-400"
        : "bg-amber-100 text-amber-700"
      : darkMode
      ? "bg-red-500/20 text-red-400"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}>
      {score}
    </span>
  );
}

/* ---------------------------
  DASHBOARD
---------------------------- */
export default function Dashboard({ darkMode, sugertoday }) {
  const { uid } = useCurrentUser();

  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(sugertoday);
  }, []);

  /* ---------------------------
     LOAD RECENT SCANS
  ---------------------------- */
  useEffect(() => {
    if (!uid) return;

    async function loadDashboardData() {
      setLoading(true);

      try {
        const scanQuery = query(
          collection(db, "user_scans"),
          where("uid", "==", uid),
          limit(5)
        );

        const scanSnap = await getDocs(scanQuery);

        const scans = [];

        for (const scanDoc of scanSnap.docs) {
          const scan = scanDoc.data();
          const barcode = scan.barcode;

          const productRef = doc(db, "productdetails", barcode);
          const productSnap = await getDoc(productRef);

          if (!productSnap.exists()) continue;

          const product = productSnap.data();

          scans.push({
            name: product.name || "Unknown Product",
            category: product.category || "Food",
            score: scan.health_score || 0,
            risk: scan.risk || "moderate",
            time: scan.createdAt?.toDate().toLocaleString() || "Recently",
          });
        }

        setRecentScans(scans);
        console.log("dashboard firebase call");
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [uid]);

  /* ---------------------------
     UI
  ---------------------------- */
  return (
    <>
      {/* ---------------- STATS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Scans"
          value={recentScans.length}
          icon={Camera}
          darkMode={darkMode}
        />
        <StatCard2
          title="Suger Today"
          sugertoday={sugertoday}
          icon={TrendingUp}
          darkMode={darkMode}
        />
        <StatCard
          title="High Risk"
          value={recentScans.filter((s) => s.score < 50).length}
          icon={AlertTriangle}
          darkMode={darkMode}
        />
        <StatCard
          title="Healthy Choices"
          value={recentScans.filter((s) => s.score >= 80).length}
          icon={Apple}
          darkMode={darkMode}
        />
      </div>

      {/* ---------------- RECENT SCANS ---------------- */}
      <div
        className={`rounded-xl border p-6 mt-6 ${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Your Recent Scans</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading scans...</p>
        ) : recentScans.length === 0 ? (
          <p className="text-sm text-gray-500">No scans yet</p>
        ) : (
          <div className="space-y-3">
            {recentScans.map((scan, index) => (
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
                    <h3 className="font-semibold">{scan.name}</h3>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {scan.category} • {scan.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ScoreBadge score={scan.score} darkMode={darkMode} />
                  <button className="text-[#0EAD69] text-sm font-medium flex items-center gap-1 hover:underline">
                    View <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* ---------------------------
  STAT CARD
---------------------------- */
function StatCard({ title, value, icon: Icon, darkMode }) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        darkMode ? "bg-[#161B22] border-[#2D3748]" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-emerald-500/10">
          <Icon className="w-6 h-6 text-[#0EAD69]" />
        </div>
      </div>

      <div className="mt-4">
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {title}
        </p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}

function StatCard2({ title, value, icon: Icon, darkMode, sugertoday }) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        darkMode ? "bg-[#161B22] border-[#2D3748]" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-emerald-500/10">
          <Icon className="w-6 h-6 text-[#0EAD69]" />
        </div>
      </div>

      <div className="mt-4">
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {title}
        </p>
        <p className="text-3xl font-bold mt-1">{sugertoday}</p>
      </div>
    </div>
  );
}
