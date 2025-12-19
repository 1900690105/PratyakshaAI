"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  Camera,
  FileText,
  AlertTriangle,
  BarChart3,
  User,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  LogOut,
} from "lucide-react";

import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { ScanFood } from "./components/ScanFood";
import { ProfilePage } from "./components/MyProfile";
import { useCurrentUser } from "../components/GetUID";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";
import ScanHistory from "./components/ScanHistory";
import RiskAlerts from "./components/RiskAlerts";
import AnalysisOverview from "./components/AnalysisOverview";

const PratyakshaAIDashboard = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    conditions: "",
    allergies: "",
    diet: "",
    dailysugerlimit: "",
    goal: "",
  });
  const [sugertoday, setSugerToday] = useState(0);
  const { uid, loading } = useCurrentUser();

  // 🔐 AUTH GUARD (NO FLICKER)
  useEffect(() => {
    if (loading) return; // wait for auth check

    if (!uid) {
      router.replace("/auth/login");
    }
  }, [uid, loading, router]);

  // ⏳ LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Checking authentication...</p>
      </div>
    );
  }

  // 🚫 EXTRA SAFETY
  if (!uid) return null;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "scan", label: "Scan Food", icon: Camera },
    { id: "history", label: "Scan History", icon: FileText },
    { id: "alerts", label: "Risk Alerts", icon: AlertTriangle },
    { id: "analysis", label: "Analysis", icon: BarChart3 },
    { id: "profile", label: "My Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await logoutUser();
    router.replace("/auth/login");
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#0D1117] text-white" : "bg-[#F7F9FA] text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        darkMode={darkMode}
        activeTab={activeTab}
        sidebarOpen={sidebarOpen}
        setActiveTab={setActiveTab}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navbar */}
        <header
          className={`sticky top-0 z-20 border-b ${
            darkMode
              ? "bg-[#161B22] border-[#2D3748]"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold capitalize">
                {activeTab}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E2329]">
                <Bell className="w-5 h-5" />
              </button>

              {/* Dark mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E2329]"
              >
                {darkMode ? <Sun /> : <Moon />}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8 space-y-6">
          {activeTab === "dashboard" && (
            <Dashboard darkMode={darkMode} uid={uid} sugertoday={sugertoday} />
          )}
          {activeTab === "scan" && (
            <ScanFood
              darkMode={darkMode}
              uid={uid}
              form={form}
              sugertoday={sugertoday}
              setSugerToday={setSugerToday}
            />
          )}
          {activeTab === "profile" && (
            <ProfilePage
              uid={uid}
              darkMode={darkMode}
              form={form}
              setForm={setForm}
            />
          )}
          {activeTab === "history" && (
            <ScanHistory uid={uid} darkMode={darkMode} />
          )}
          {activeTab === "alerts" && (
            <RiskAlerts uid={uid} darkMode={darkMode} />
          )}
          {activeTab === "analysis" && (
            <AnalysisOverview uid={uid} darkMode={darkMode} />
          )}
        </main>
      </div>
    </div>
  );
};

export default PratyakshaAIDashboard;
