"use client";

import { AlertTriangle, HeartPulse, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ForMeAnalysisCard({ analysis }) {
  if (!analysis) return null;

  const verdictColor =
    analysis.overall_fit === "good"
      ? "text-green-600"
      : analysis.overall_fit === "moderate"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 px-2 sm:px-0">
      {/* OVERALL VERDICT */}
      <Card className="border-l-4 sm:border-l-8 border-red-500">
        <CardHeader>
          <CardTitle
            className={`text-lg sm:text-2xl font-bold leading-tight ${verdictColor}`}
          >
            {analysis.overall_fit === "poor" && "🚫 Not Suitable for You"}
            {analysis.overall_fit === "moderate" && "⚠️ Consume with Caution"}
            {analysis.overall_fit === "good" && "✅ Good Choice for You"}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <p className="text-gray-600 text-sm">Health Score</p>
            <p className="text-3xl sm:text-4xl font-bold">
              {analysis.health_score}/100
            </p>
          </div>

          <p
            className={`font-semibold text-sm sm:text-base ${
              analysis.is_recommended ? "text-green-600" : "text-red-600"
            }`}
          >
            {analysis.is_recommended ? "Recommended" : "Not Recommended"}
          </p>
        </CardContent>
      </Card>

      {/* WARNINGS */}
      {analysis.health_warnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 text-base sm:text-lg">
              <ShieldAlert className="w-5 h-5" /> Health Warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.health_warnings.map((warn, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-orange-700"
              >
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="leading-relaxed">{warn}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* CONDITION ANALYSIS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <HeartPulse className="text-red-500 w-5 h-5" />
            Your Health Conditions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {analysis.condition_analysis.map((c, i) => (
            <div key={i} className="border rounded-lg p-3 sm:p-4 bg-red-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <p className="font-semibold text-sm sm:text-base">
                  {c.condition}
                </p>
                <span className="text-red-600 text-xs sm:text-sm font-bold uppercase">
                  {c.impact}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed">
                {c.reason}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* INGREDIENT RISKS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Ingredient Risk Breakdown
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {analysis.ingredient_concerns.map((ing, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border ${
                ing.risk_level === "high"
                  ? "bg-red-50 border-red-300"
                  : "bg-yellow-50 border-yellow-300"
              }`}
            >
              <p className="font-semibold text-sm sm:text-base">
                {ing.ingredient}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {ing.reason}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* NUTRIENT SUMMARY */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Nutrient Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {Object.entries(analysis.nutrient_summary).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center border rounded p-2"
            >
              <span className="capitalize text-xs sm:text-sm">
                {key.replace("_", " ")}
              </span>
              <span
                className={`font-semibold text-xs sm:text-sm ${
                  value === "high"
                    ? "text-red-600"
                    : value === "moderate"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FINAL ADVICE */}
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-4 sm:p-6">
          <p className="text-base sm:text-lg font-semibold mb-2">
            🩺 Final Advice
          </p>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            {analysis.final_advice}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// "use client";

// import {
//   AlertTriangle,
//   XCircle,
//   CheckCircle,
//   HeartPulse,
//   ShieldAlert,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect } from "react";

// export function ForMeAnalysisCard({ analysis }) {
//   if (!analysis) return null;

//   const verdictColor =
//     analysis.overall_fit === "good"
//       ? "text-green-600"
//       : analysis.overall_fit === "moderate"
//       ? "text-yellow-600"
//       : "text-red-600";

//   return (
//     <div className="space-y-6 mt-6">
//       {/* OVERALL VERDICT */}
//       <Card className="border-l-8 border-red-500">
//         <CardHeader>
//           <CardTitle className={`text-2xl font-bold ${verdictColor}`}>
//             {analysis.overall_fit === "poor" && "🚫 Not Suitable for You"}
//             {analysis.overall_fit === "moderate" && "⚠️ Consume with Caution"}
//             {analysis.overall_fit === "good" && "✅ Good Choice for You"}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex justify-between items-center">
//           <div>
//             <p className="text-gray-600">Health Score</p>
//             <p className="text-4xl font-bold">{analysis.health_score}/100</p>
//           </div>
//           <div className="text-right">
//             <p
//               className={`font-semibold ${
//                 analysis.is_recommended ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {analysis.is_recommended ? "Recommended" : "Not Recommended"}
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       {/* WARNINGS */}
//       {analysis.health_warnings.length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-orange-600">
//               <ShieldAlert /> Health Warnings
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {analysis.health_warnings.map((warn, i) => (
//               <div
//                 key={i}
//                 className="flex items-start gap-2 text-sm text-orange-700"
//               >
//                 <AlertTriangle className="w-4 h-4 mt-1" />
//                 <p>{warn}</p>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       )}

//       {/* CONDITION ANALYSIS */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <HeartPulse className="text-red-500" /> Your Health Conditions
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {analysis.condition_analysis.map((c, i) => (
//             <div key={i} className="border rounded-lg p-4 bg-red-50">
//               <div className="flex justify-between">
//                 <p className="font-semibold">{c.condition}</p>
//                 <span className="text-red-600 font-bold uppercase">
//                   {c.impact}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-700 mt-1">{c.reason}</p>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* INGREDIENT RISKS */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Ingredient Risk Breakdown</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {analysis.ingredient_concerns.map((ing, i) => (
//             <div
//               key={i}
//               className={`p-3 rounded-lg border ${
//                 ing.risk_level === "high"
//                   ? "bg-red-50 border-red-300"
//                   : "bg-yellow-50 border-yellow-300"
//               }`}
//             >
//               <p className="font-semibold">{ing.ingredient}</p>
//               <p className="text-sm text-gray-700">{ing.reason}</p>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* NUTRIENT SUMMARY */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Nutrient Summary</CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-2 gap-4 text-sm">
//           {Object.entries(analysis.nutrient_summary).map(([key, value]) => (
//             <div key={key} className="flex justify-between border rounded p-2">
//               <span className="capitalize">{key.replace("_", " ")}</span>
//               <span
//                 className={`font-semibold ${
//                   value === "high"
//                     ? "text-red-600"
//                     : value === "moderate"
//                     ? "text-yellow-600"
//                     : "text-green-600"
//                 }`}
//               >
//                 {value}
//               </span>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* FINAL ADVICE */}
//       <Card className="bg-gray-900 text-white">
//         <CardContent className="p-6">
//           <p className="text-lg font-semibold mb-2">🩺 Final Advice</p>
//           <p className="text-sm text-gray-200">{analysis.final_advice}</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
