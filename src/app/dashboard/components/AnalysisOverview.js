"use client";

import { useEffect, useState } from "react";
import { TrendingUp, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* -------------------------------
   COLOR MAPS (TAILWIND SAFE)
-------------------------------- */
const iconColors = {
  emerald: "text-emerald-500",
  green: "text-green-500",
  red: "text-red-500",
  amber: "text-amber-500",
};

const barColors = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

export default function AnalysisOverview({ darkMode, uid }) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    avgScore: 0,
    good: 0,
    moderate: 0,
    poor: 0,
    highSugar: 0,
    allergens: 0,
  });

  useEffect(() => {
    if (!uid) return;

    async function loadAnalysis() {
      setLoading(true);

      try {
        const q = query(collection(db, "airesult"), where("uid", "==", uid));
        const snap = await getDocs(q);

        let totalScore = 0;
        let count = 0;
        let good = 0;
        let moderate = 0;
        let poor = 0;
        let highSugar = 0;
        let allergens = 0;

        snap.forEach((doc) => {
          const a = doc.data().analysis;
          if (!a) return;

          totalScore += a.health_score || 0;
          count++;

          if (a.overall_fit === "good") good++;
          if (a.overall_fit === "moderate") moderate++;
          if (a.overall_fit === "poor") poor++;

          if (a.nutrient_summary?.sugar === "high") highSugar++;

          a.ingredient_concerns?.forEach((i) => {
            if (i.risk_level === "high") allergens++;
          });
        });

        setSummary({
          avgScore: count ? Math.round(totalScore / count) : 0,
          good,
          moderate,
          poor,
          highSugar,
          allergens,
        });
        console.log("analysis firebase call");
      } catch (err) {
        console.error("Analysis load failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAnalysis();
  }, [uid]);

  if (loading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Analyzing your data...
      </p>
    );
  }

  const total = summary.good + summary.moderate + summary.poor;

  return (
    <div className="space-y-6">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          title="Average Health Score"
          value={`${summary.avgScore}/100`}
          icon={TrendingUp}
          color="emerald"
          darkMode={darkMode}
        />
        <Stat
          title="Safe Products"
          value={summary.good}
          icon={ShieldCheck}
          color="green"
          darkMode={darkMode}
        />
        <Stat
          title="Risky Products"
          value={summary.poor}
          icon={AlertTriangle}
          color="red"
          darkMode={darkMode}
        />
        <Stat
          title="High Sugar Scans"
          value={summary.highSugar}
          icon={Activity}
          color="amber"
          darkMode={darkMode}
        />
      </div>

      {/* DISTRIBUTION */}
      <Card
        className={
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }
      >
        <CardHeader>
          <CardTitle>Scan Outcome Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Bar label="Good" value={summary.good} total={total} color="green" />
          <Bar
            label="Moderate"
            value={summary.moderate}
            total={total}
            color="amber"
          />
          <Bar label="Poor" value={summary.poor} total={total} color="red" />
        </CardContent>
      </Card>

      {/* AI INSIGHT */}
      <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-2">🧠 AI Insight</h3>
          <p className="text-sm opacity-90">
            {summary.poor > summary.good
              ? "You are frequently scanning high-risk products. Reducing sugar and ultra-processed foods will significantly improve your health score."
              : "Your food choices are improving. Continue prioritizing low-sugar and minimally processed products."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------------------
   SUB COMPONENTS
-------------------------------- */

function Stat({ title, value, icon: Icon, color, darkMode }) {
  return (
    <Card
      className={
        darkMode ? "bg-[#161B22] border-[#2D3748]" : "bg-white border-gray-200"
      }
    >
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className={`w-7 h-7 ${iconColors[color]}`} />
      </CardContent>
    </Card>
  );
}

function Bar({ label, value, total, color }) {
  const percent = total ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${barColors[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { TrendingUp, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function AnalysisOverview({ darkMode, uid }) {
//   const [loading, setLoading] = useState(true);
//   const [summary, setSummary] = useState({
//     avgScore: 0,
//     good: 0,
//     moderate: 0,
//     poor: 0,
//     highSugar: 0,
//     allergens: 0,
//   });

//   useEffect(() => {
//     if (!uid) return;

//     async function loadAnalysis() {
//       setLoading(true);

//       try {
//         const q = query(collection(db, "airesult"), where("uid", "==", uid));

//         const snap = await getDocs(q);

//         let totalScore = 0;
//         let count = 0;
//         let good = 0;
//         let moderate = 0;
//         let poor = 0;
//         let highSugar = 0;
//         let allergens = 0;

//         snap.forEach((doc) => {
//           const a = doc.data().analysis;
//           if (!a) return;

//           totalScore += a.health_score || 0;
//           count++;

//           if (a.overall_fit === "good") good++;
//           if (a.overall_fit === "moderate") moderate++;
//           if (a.overall_fit === "poor") poor++;

//           if (a.nutrient_summary?.sugar === "high") highSugar++;

//           a.ingredient_concerns?.forEach((i) => {
//             if (i.risk_level === "high") allergens++;
//           });
//         });

//         setSummary({
//           avgScore: count ? Math.round(totalScore / count) : 0,
//           good,
//           moderate,
//           poor,
//           highSugar,
//           allergens,
//         });
//       } catch (err) {
//         console.error("Analysis load failed:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadAnalysis();
//   }, [uid]);

//   if (loading) {
//     return <p className="text-sm text-gray-500">Analyzing your data...</p>;
//   }

//   return (
//     <div className="space-y-6">
//       {/* TOP STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Stat
//           title="Average Health Score"
//           value={`${summary.avgScore}/100`}
//           icon={TrendingUp}
//           color="emerald"
//           darkMode={darkMode}
//         />
//         <Stat
//           title="Safe Products"
//           value={summary.good}
//           icon={ShieldCheck}
//           color="green"
//           darkMode={darkMode}
//         />
//         <Stat
//           title="Risky Products"
//           value={summary.poor}
//           icon={AlertTriangle}
//           color="red"
//           darkMode={darkMode}
//         />
//         <Stat
//           title="High Sugar Scans"
//           value={summary.highSugar}
//           icon={Activity}
//           color="amber"
//           darkMode={darkMode}
//         />
//       </div>

//       {/* DISTRIBUTION */}
//       <Card
//         className={
//           darkMode
//             ? "bg-[#161B22] border-[#2D3748]"
//             : "bg-white border-gray-200"
//         }
//       >
//         <CardHeader>
//           <CardTitle>Scan Outcome Distribution</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <Bar
//             label="Good"
//             value={summary.good}
//             total={summary.good + summary.moderate + summary.poor}
//             color="green"
//           />
//           <Bar
//             label="Moderate"
//             value={summary.moderate}
//             total={summary.good + summary.moderate + summary.poor}
//             color="amber"
//           />
//           <Bar
//             label="Poor"
//             value={summary.poor}
//             total={summary.good + summary.moderate + summary.poor}
//             color="red"
//           />
//         </CardContent>
//       </Card>

//       {/* AI INSIGHT */}
//       <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
//         <CardContent className="p-6">
//           <h3 className="text-lg font-bold mb-2">🧠 AI Insight</h3>
//           <p className="text-sm opacity-90">
//             {summary.poor > summary.good
//               ? "You are frequently scanning high-risk products. Reducing sugar and ultra-processed foods will significantly improve your health score."
//               : "Your food choices are improving. Continue prioritizing low-sugar and minimally processed products."}
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// /* -------------------------------
//    Sub Components
// -------------------------------- */

// function Stat({ title, value, icon: Icon, color, darkMode }) {
//   return (
//     <Card
//       className={
//         darkMode ? "bg-[#161B22] border-[#2D3748]" : "bg-white border-gray-200"
//       }
//     >
//       <CardContent className="p-5">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">{title}</p>
//             <p className="text-2xl font-bold">{value}</p>
//           </div>
//           <Icon className={`w-7 h-7 text-${color}-500`} />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function Bar({ label, value, total, color }) {
//   const percent = total ? Math.round((value / total) * 100) : 0;

//   return (
//     <div>
//       <div className="flex justify-between text-sm mb-1">
//         <span>{label}</span>
//         <span>{percent}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div
//           className={`h-2 rounded-full bg-${color}-500`}
//           style={{ width: `${percent}%` }}
//         />
//       </div>
//     </div>
//   );
// }
