"use client";

import {
  HeartPulse,
  AlertTriangle,
  Candy,
  Users,
  Activity,
} from "lucide-react";

export default function WhyWeBuiltThis({ darkMode = false }) {
  const stats = [
    {
      title: "People with Diabetes",
      value: "101M+",
      desc: "Adults living with diabetes in India",
      icon: HeartPulse,
      color: "red",
    },
    {
      title: "Hidden Sugar Intake",
      value: "70%",
      desc: "Packaged foods contain hidden sugars",
      icon: Candy,
      color: "amber",
    },
    {
      title: "Lifestyle Diseases",
      value: "60%",
      desc: "Deaths linked to lifestyle-related diseases",
      icon: Activity,
      color: "orange",
    },
    {
      title: "People Unaware",
      value: "8 in 10",
      desc: "Don’t read or understand food labels",
      icon: Users,
      color: "blue",
    },
    {
      title: "Risky Ingredients",
      value: "1,000+",
      desc: "Additives commonly used in packaged food",
      icon: AlertTriangle,
      color: "rose",
    },
  ];

  return (
    <section
      className={`py-16 ${
        darkMode ? "bg-[#0D1117] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why We Built DailyScan
          </h2>
          <p
            className={`mt-4 text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Millions consume packaged food every day — without knowing what it
            does to their body. We built PratyakshaAI to bring **clarity,
            awareness, and control** back to people.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`rounded-xl p-6 border transition ${
                  darkMode
                    ? "bg-[#161B22] border-[#2D3748]"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-${item.color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${item.color}-500`} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{item.value}</p>
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                </div>

                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div
          className={`mt-14 text-center max-w-3xl mx-auto p-6 rounded-xl ${
            darkMode
              ? "bg-[#161B22]"
              : "bg-gradient-to-r from-emerald-50 to-teal-50"
          }`}
        >
          <p className="text-lg font-semibold">
            PratyakshaAI helps you move from{" "}
            <span className="text-red-500">blind consumption</span> to{" "}
            <span className="text-emerald-600">informed eating</span>.
          </p>
          <p
            className={`mt-2 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Scan food • Understand risks • Choose what’s right for *you*
          </p>
        </div>
      </div>
    </section>
  );
}
