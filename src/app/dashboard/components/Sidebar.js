"use client";
import { LogOut, Shield, X } from "lucide-react";
import Image from "next/image";
import React from "react";

function Sidebar({
  menuItems,
  darkMode,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 ${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        } border-r transition-all z-30`}
      >
        <div className="p-2 border-b border-gray-200 dark:border-gray-700 md:ml-16">
          <div className="flex items-center gap-2">
            <Image
              src={"/logo1200630.png"}
              alt="logo"
              width={100}
              height={30}
            />
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-emerald-50 dark:bg-[#0EAD69]/10 text-[#0EAD69] border-l-4 border-[#0EAD69]"
                    : darkMode
                    ? "text-gray-300 hover:bg-[#1E2329]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              darkMode
                ? "text-gray-300 hover:bg-[#1E2329]"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className={`absolute left-0 top-0 h-full w-64 ${
              darkMode ? "bg-[#161B22]" : "bg-white"
            } shadow-xl`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={"/cutlogo.png"} alt="logo" width={50} height={50} />
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive
                        ? "bg-emerald-50 dark:bg-[#0EAD69]/10 text-[#0EAD69] border-l-4 border-[#0EAD69]"
                        : darkMode
                        ? "text-gray-300 hover:bg-[#1E2329]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
