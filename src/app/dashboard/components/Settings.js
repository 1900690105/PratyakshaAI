"use client";

import { useState } from "react";
import { Moon, Sun, Bell, Shield, LogOut, Sliders } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SettingsComponent({
  darkMode,
  setDarkMode,
  form,
  setForm,
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/auth/login");
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Manage preferences, privacy, and notifications
      </p>

      {/* APPEARANCE */}
      <Card
        className={
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            Appearance
          </CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Dark Mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle dark/light theme
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setDarkMode(!darkMode);
              localStorage.setItem("darkMode", darkMode);
            }}
            className="flex items-center gap-2"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4" /> Light
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" /> Dark
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* NOTIFICATIONS */}
      <Card
        className={
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            Notifications
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ToggleRow
            label="Health Risk Alerts"
            description="Notify when high-risk food is scanned"
            value={form.notifyRisk}
            onChange={(v) => handleChange("notifyRisk", v)}
          />

          <ToggleRow
            label="Sugar Limit Warning"
            description="Alert when daily sugar exceeds limit"
            value={form.notifySugar}
            onChange={(v) => handleChange("notifySugar", v)}
          />
        </CardContent>
      </Card>

      {/* PRIVACY */}
      <Card
        className={
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            Privacy
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ToggleRow
            label="Save Scan History"
            description="Store scanned products for insights"
            value={form.saveHistory}
            onChange={(v) => handleChange("saveHistory", v)}
          />

          <ToggleRow
            label="Personalized AI Analysis"
            description="Use profile data for recommendations"
            value={form.personalizedAI}
            onChange={(v) => handleChange("personalizedAI", v)}
          />
        </CardContent>
      </Card>

      {/* LOGOUT */}
      <Card
        className={
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }
      >
        <CardContent className="p-6">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------------------
   Toggle Row Component
-------------------------------- */

function ToggleRow({ label, description, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition relative ${
          value ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
            value ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
