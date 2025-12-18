"use client";
import { useEffect, useState } from "react";
import { getUserData, updateUserData } from "@/lib/getUser";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Phone, Heart, Edit3 } from "lucide-react";

export function ProfilePage({ uid }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    conditions: "",
    allergies: "",
    diet: "",
  });

  // Step 2: Load Firestore user data
  useEffect(() => {
    if (!uid) return;

    async function loadData() {
      setLoading(true);
      try {
        const data = await getUserData(uid);
        if (data) {
          setForm((prev) => ({
            ...prev,
            ...data,
            email: data.email || prev.email,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [uid]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    if (!uid) return;

    setSaving(true);
    await updateUserData(uid, form);
    setSaving(false);
    alert("Profile updated successfully!");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!uid) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">User not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="text-gray-600">View and update your personal information</p>

      <Card className="shadow border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-emerald-600" />
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mt-1"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                disabled
                className="w-full p-3 pl-10 border rounded-lg bg-gray-100 cursor-not-allowed"
                value={form.email}
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full p-3 pl-10 border rounded-lg"
                value={form.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          {/* AGE + GENDER */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Age</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg mt-1"
                value={form.age || ""}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Gender</label>
              <select
                className="w-full p-3 border rounded-lg mt-1"
                value={form.gender || ""}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* HEALTH CONDITIONS */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              Health Conditions
            </label>
            <textarea
              className="w-full p-3 border rounded-lg mt-1"
              rows={3}
              placeholder="Diabetes, BP, Thyroid, etc."
              value={form.conditions || ""}
              onChange={(e) => handleChange("conditions", e.target.value)}
            />
          </div>

          {/* ALLERGIES */}
          <div>
            <label className="text-sm font-semibold">Allergies</label>
            <textarea
              className="w-full p-3 border rounded-lg mt-1"
              rows={2}
              placeholder="Milk, peanuts, gluten, etc."
              value={form.allergies || ""}
              onChange={(e) => handleChange("allergies", e.target.value)}
            />
          </div>

          {/* DIET */}
          <div>
            <label className="text-sm font-semibold">Diet Preference</label>
            <select
              className="w-full p-3 border rounded-lg mt-1"
              value={form.diet || ""}
              onChange={(e) => handleChange("diet", e.target.value)}
            >
              <option value="">Select Diet Type</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Non-Vegetarian</option>
              <option>Keto</option>
              <option>Low Sugar</option>
              <option>High Protein</option>
            </select>
          </div>

          <Button
            onClick={saveChanges}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 mt-4 flex items-center justify-center gap-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Edit3 className="w-5 h-5" />
                Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
