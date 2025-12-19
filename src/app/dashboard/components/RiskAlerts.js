"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ShieldAlert, XCircle, CheckCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/app/components/GetUID";

export default function RiskAlerts({ darkMode }) {
  const { uid, loading: authLoading } = useCurrentUser();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid || authLoading) return;

    async function fetchAlerts() {
      setLoading(true);
      try {
        const q = query(
          collection(db, "airesult"),
          where("uid", "==", uid),

          limit(5)
        );

        const snap = await getDocs(q);
        const collected = [];

        snap.forEach((docSnap) => {
          const data = docSnap.data();
          if (!data?.analysis) return;

          const analysis = data.analysis;

          // 🔴 High risk product
          if (analysis.overall_fit === "poor") {
            collected.push({
              type: "danger",
              title: "High Risk Product",
              message: analysis.final_advice,
            });
          }

          // ⚠️ Health warnings
          analysis.health_warnings?.forEach((warn) => {
            collected.push({
              type: "warning",
              title: "Health Warning",
              message: warn,
            });
          });

          // 🧪 High-risk ingredients
          analysis.ingredient_concerns
            ?.filter((i) => i.risk_level === "high")
            .forEach((ing) => {
              collected.push({
                type: "danger",
                title: `High Risk Ingredient: ${ing.ingredient}`,
                message: ing.reason,
              });
            });
        });

        setAlerts(collected.slice(0, 6));
        console.log("airesult firebase call");
      } catch (error) {
        console.error("Failed to load risk alerts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, [uid, authLoading]);

  if (loading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading risk alerts...
      </p>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card
        className={`${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }`}
      >
        <CardContent className="flex items-center gap-2 py-6 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <p>No active health risks detected 🎉</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`${
        darkMode ? "bg-[#161B22] border-[#2D3748]" : "bg-white border-gray-200"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <ShieldAlert className="w-5 h-5" />
          Risk Alerts
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border-l-4 ${
              alert.type === "danger"
                ? darkMode
                  ? "bg-red-500/10 border-red-500"
                  : "bg-red-50 border-red-500"
                : darkMode
                ? "bg-amber-500/10 border-amber-500"
                : "bg-amber-50 border-amber-500"
            }`}
          >
            <div className="flex items-start gap-2">
              {alert.type === "danger" ? (
                <XCircle className="w-5 h-5 text-red-600 mt-1" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-1" />
              )}
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alert.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
