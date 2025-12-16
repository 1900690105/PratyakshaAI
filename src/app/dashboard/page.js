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
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { ScanFood } from "./components/ScanFood";
import { ProfilePage } from "./components/MyProfile";

const PratyakshaAIDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "scan", label: "Scan Food", icon: Camera },
    { id: "history", label: "Scan History", icon: FileText },
    { id: "alerts", label: "Risk Alerts", icon: AlertTriangle },
    { id: "analysis", label: "Analysis", icon: BarChart3 },
    { id: "profile", label: "My Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#0D1117] text-white" : "bg-[#F7F9FA] text-gray-900"
      }`}
    >
      {/* Sidebar - Desktop */}
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
          className={`sticky top-0 z-20 ${
            darkMode
              ? "bg-[#161B22] border-[#2D3748]"
              : "bg-white border-gray-200"
          } border-b`}
        >
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold">Dashboard</h1>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <div
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${
                  darkMode ? "bg-[#1E2329]" : "bg-gray-100"
                }`}
              >
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scans, products..."
                  className="bg-transparent border-none outline-none text-sm w-48"
                />
              </div>

              <button
                className={`p-2 rounded-lg ${
                  darkMode ? "hover:bg-[#1E2329]" : "hover:bg-gray-100"
                }`}
              >
                <Bell className="w-5 h-5" />
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? "hover:bg-[#1E2329]" : "hover:bg-gray-100"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8 space-y-6">
          {activeTab == "dashboard" && <Dashboard darkMode={darkMode} />}
          {activeTab == "scan" && <ScanFood darkMode={darkMode} />}
          {activeTab == "profile" && <ProfilePage darkMode={darkMode} />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        className={`lg:hidden fixed bottom-0 left-0 right-0 ${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        } border-t`}
      >
        <div className="flex items-center justify-around py-3">
          {[
            { id: "dashboard", icon: Home, label: "Home" },
            { id: "scan", icon: Camera, label: "Scan" },
            { id: "history", icon: FileText, label: "History" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center gap-1"
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive
                      ? "text-[#0EAD69]"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs ${
                    isActive
                      ? "text-[#0EAD69]"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default PratyakshaAIDashboard;
