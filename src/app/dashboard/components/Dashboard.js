"use client";
import React, { useState } from "react";
import {
  Home,
  Camera,
  FileText,
  AlertTriangle,
  BarChart3,
  User,
  Settings,
  LogOut,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  TrendingUp,
  Apple,
  Shield,
  Zap,
  ChevronRight,
} from "lucide-react";

function Dashboard({ darkMode }) {
  // Sample data
  const stats = [
    {
      title: "Total Scans",
      value: "143",
      icon: Camera,
      trend: "+12%",
      color: "emerald",
    },
    {
      title: "Avg Health Score",
      value: "62",
      icon: TrendingUp,
      trend: "+5%",
      color: "blue",
    },
    {
      title: "High-Risk Alerts",
      value: "8",
      icon: AlertTriangle,
      trend: "-3%",
      color: "red",
    },
    {
      title: "Healthy Alternatives",
      value: "34",
      icon: Apple,
      trend: "+18%",
      color: "green",
    },
  ];

  const recentScans = [
    {
      name: "Maggi Noodles",
      score: 42,
      risk: "high",
      time: "2 hours ago",
      category: "Instant Food",
    },
    {
      name: "Organic Honey",
      score: 88,
      risk: "safe",
      time: "5 hours ago",
      category: "Natural",
    },
    {
      name: "Diet Coke",
      score: 55,
      risk: "moderate",
      time: "1 day ago",
      category: "Beverage",
    },
    {
      name: "Whole Wheat Bread",
      score: 76,
      risk: "safe",
      time: "2 days ago",
      category: "Bakery",
    },
  ];

  const ingredients = {
    safe: ["Whole Wheat", "Organic Sugar", "Natural Flavor", "Sea Salt"],
    moderate: ["Palm Oil", "Citric Acid", "Modified Starch"],
    harmful: ["Sodium Benzoate", "Artificial Color", "MSG", "Trans Fat"],
  };

  const alerts = [
    {
      type: "warning",
      title: "High Sodium Intake",
      message: "3 products scanned today contain >500mg sodium",
      color: "amber",
    },
    {
      type: "danger",
      title: "Preservative Alert",
      message: "Sodium Benzoate detected in last scan",
      color: "red",
    },
    {
      type: "info",
      title: "Sugar Watch",
      message: "Daily sugar limit approaching (78%)",
      color: "orange",
    },
  ];

  const ScoreBadge = ({ score }) => {
    const getColor = () => {
      if (score >= 80)
        return darkMode
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-green-100 text-green-700 border-green-300";
      if (score >= 50)
        return darkMode
          ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
          : "bg-amber-100 text-amber-700 border-amber-300";
      return darkMode
        ? "bg-red-500/20 text-red-400 border-red-500/30"
        : "bg-red-100 text-red-700 border-red-300";
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold border ${getColor()}`}
      >
        {score}
      </span>
    );
  };

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div
        className={`${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        } rounded-xl p-6 border transition-all hover:shadow-lg`}
      >
        <div className="flex items-start justify-between">
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-[#0EAD69]/20" : "bg-emerald-50"
            }`}
          >
            <Icon className="w-6 h-6 text-[#0EAD69]" />
          </div>
          <span className="text-xs text-green-500 font-medium">
            {stat.trend}
          </span>
        </div>
        <div className="mt-4">
          <h3
            className={`text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {stat.title}
          </h3>
          <p
            className={`text-3xl font-bold mt-1 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {stat.value}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Recent Scans */}
      <div
        className={`${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        } rounded-xl border p-6`}
      >
        <h2 className="text-xl font-bold mb-4">Your Recent Scans</h2>
        <div className="space-y-3">
          {recentScans.map((scan, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg ${
                darkMode ? "bg-[#1E2329]" : "bg-gray-50"
              } gap-3`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg ${
                    darkMode ? "bg-[#0D1117]" : "bg-white"
                  } flex items-center justify-center`}
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
                <ScoreBadge score={scan.score} />
                <button className="text-[#0EAD69] hover:underline text-sm font-medium flex items-center gap-1">
                  View <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredient Insights & Risk Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingredient Insights */}
        <div
          className={`${
            darkMode
              ? "bg-[#161B22] border-[#2D3748]"
              : "bg-white border-gray-200"
          } rounded-xl border p-6`}
        >
          <h2 className="text-xl font-bold mb-4">Ingredient Insights</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-green-500 mb-2">
                Safe Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.safe.map((item, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode
                        ? "bg-green-500/20 text-green-400"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-amber-500 mb-2">
                Moderate
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.moderate.map((item, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-red-500 mb-2">
                Harmful
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.harmful.map((item, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode
                        ? "bg-red-500/20 text-red-400"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Alerts */}
        <div
          className={`${
            darkMode
              ? "bg-[#161B22] border-[#2D3748]"
              : "bg-white border-gray-200"
          } rounded-xl border p-6`}
        >
          <h2 className="text-xl font-bold mb-4">Your Risk Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.color === "red"
                    ? darkMode
                      ? "bg-red-500/10 border-red-500"
                      : "bg-red-50 border-red-500"
                    : alert.color === "amber"
                    ? darkMode
                      ? "bg-amber-500/10 border-amber-500"
                      : "bg-amber-50 border-amber-500"
                    : darkMode
                    ? "bg-orange-500/10 border-orange-500"
                    : "bg-orange-50 border-orange-500"
                }`}
              >
                <h3 className="font-semibold mb-1">{alert.title}</h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div
        className={`${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        } rounded-xl border p-6`}
      >
        <h2 className="text-xl font-bold mb-4">AI Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-6 rounded-lg ${
              darkMode
                ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
                : "bg-gradient-to-br from-emerald-50 to-teal-50"
            }`}
          >
            <Zap className="w-8 h-8 text-[#0EAD69] mb-3" />
            <h3 className="font-bold mb-2">Better Alternatives</h3>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              34 healthier options found
            </p>
            <button className="text-[#0EAD69] hover:underline text-sm font-medium">
              Explore →
            </button>
          </div>

          <div
            className={`p-6 rounded-lg ${
              darkMode
                ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                : "bg-gradient-to-br from-blue-50 to-purple-50"
            }`}
          >
            <Shield className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-bold mb-2">For Your Health</h3>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Personalized suggestions
            </p>
            <button className="text-blue-500 hover:underline text-sm font-medium">
              View All →
            </button>
          </div>

          <div
            className={`p-6 rounded-lg ${
              darkMode
                ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                : "bg-gradient-to-br from-purple-50 to-pink-50"
            }`}
          >
            <Apple className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="font-bold mb-2">Clean Ingredients</h3>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Natural & organic picks
            </p>
            <button className="text-purple-500 hover:underline text-sm font-medium">
              Discover →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
