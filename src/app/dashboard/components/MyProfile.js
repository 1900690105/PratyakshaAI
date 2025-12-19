"use client";
import { useEffect, useState } from "react";
import { updateUserData } from "@/lib/getUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Phone, Heart, Edit3 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function ProfilePage({ uid, form, setForm, darkMode }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const inputBase = `
    w-full p-3 rounded-lg mt-1 outline-none
    ${
      darkMode
        ? "bg-[#0D1117] border border-[#2D3748] text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500"
        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
    }
  `;

  useEffect(() => {
    if (!uid) return;

    async function loadData() {
      setLoading(true);
      try {
        const userRef = doc(db, "users", uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) return;

        const data = snap.data();
        setForm((prev) => ({
          ...prev,
          ...data,
          email: data.email || prev.email,
        }));
        if (process.env.NODE_ENV == "development") {
          console.log("my profile firebase call");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
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
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!uid) {
    return (
      <div className="text-center py-10 text-gray-500">User not logged in.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        My Profile
      </h1>
      <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
        View and update your personal information
      </p>

      <Card
        className={`shadow border ${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`flex items-center gap-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <User className="w-6 h-6 text-emerald-500" />
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              type="text"
              className={inputBase}
              placeholder="Your Full Name"
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                className={`${inputBase} pl-10`}
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className={`${inputBase} pl-10`}
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
                className={inputBase}
                value={form.age || ""}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Gender</label>
              <select
                className={inputBase}
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
              className={inputBase}
              rows={3}
              value={form.conditions || ""}
              onChange={(e) => handleChange("conditions", e.target.value)}
            />
          </div>

          {/* ALLERGIES */}
          <div>
            <label className="text-sm font-semibold">Allergies</label>
            <textarea
              className={inputBase}
              rows={2}
              value={form.allergies || ""}
              onChange={(e) => handleChange("allergies", e.target.value)}
            />
          </div>

          {/* DIET */}
          <div>
            <label className="text-sm font-semibold">Diet Preference</label>
            <select
              className={inputBase}
              value={form.diet || ""}
              onChange={(e) => handleChange("diet", e.target.value)}
            >
              <option value="">Select</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Non-Vegetarian</option>
              <option>Keto</option>
              <option>Low Sugar</option>
              <option>High Protein</option>
            </select>
          </div>

          {/* GOAL */}
          <div>
            <label className="text-sm font-semibold">Goal</label>
            <textarea
              className={inputBase}
              rows={2}
              value={form.goal || ""}
              onChange={(e) => handleChange("goal", e.target.value)}
            />
          </div>

          {/* SUGAR LIMIT */}
          <div>
            <label className="text-sm font-semibold">
              Daily Sugar Limit (g)
            </label>
            <input
              type="number"
              className={inputBase}
              value={form.dailysugerlimit || ""}
              onChange={(e) => handleChange("dailysugerlimit", e.target.value)}
            />
          </div>

          {/* SAVE */}
          <Button
            onClick={saveChanges}
            disabled={saving}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 flex items-center justify-center gap-2"
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

// "use client";
// import { useEffect, useState } from "react";
// import { getUserData, updateUserData } from "@/lib/getUser";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, User, Mail, Phone, Heart, Edit3 } from "lucide-react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export function ProfilePage({ uid, form, setForm ,darkMode }) {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Step 2: Load Firestore user data
//   useEffect(() => {
//     if (!uid) return;

//     async function loadData() {
//       setLoading(true);
//       try {
//         const userRef = doc(db, "users", uid);
//         const snap = await getDoc(userRef);

//         if (!snap.exists()) {
//           console.warn("User document does not exist for uid:", uid);
//           return;
//         }

//         const data = snap.data();

//         setForm((prev) => ({
//           ...prev,
//           ...data,
//           email: data.email || prev.email,
//         }));

//         console.log("User data:", data);
//       } catch (error) {
//         console.error("Failed to load user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadData();
//   }, [uid]);

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const saveChanges = async () => {
//     if (!uid) return;

//     setSaving(true);
//     await updateUserData(uid, form);
//     setSaving(false);
//     alert("Profile updated successfully!");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-16">
//         <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
//       </div>
//     );
//   }

//   if (!uid) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-gray-600">User not logged in.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <h1 className="text-3xl font-bold">My Profile</h1>
//       <p className="text-gray-600">View and update your personal information</p>

//       <Card className="shadow border">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <User className="w-6 h-6 text-emerald-600" />
//             Profile Information
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {/* NAME */}
//           <div>
//             <label className="text-sm font-semibold">Full Name</label>
//             <input
//               type="text"
//               className="w-full p-3 border rounded-lg mt-1"
//               placeholder="Your Full Name"
//               value={form.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//             />
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="text-sm font-semibold">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 suppressHydrationWarning
//                 type="email"
//                 className="w-full p-3 pl-10 border rounded-lg "
//                 placeholder="eg.nikhil55@gmail.com"
//                 value={form.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* PHONE */}
//           <div>
//             <label className="text-sm font-semibold">Phone Number</label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 type="text"
//                 className="w-full p-3 pl-10 border rounded-lg"
//                 value={form.phone || ""}
//                 placeholder="eg.9112000000"
//                 onChange={(e) => handleChange("phone", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* AGE + GENDER */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-semibold">Age</label>
//               <input
//                 type="number"
//                 className="w-full p-3 border rounded-lg mt-1"
//                 value={form.age || ""}
//                 placeholder="eg.22"
//                 onChange={(e) => handleChange("age", e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="text-sm font-semibold">Gender</label>
//               <select
//                 className="w-full p-3 border rounded-lg mt-1"
//                 value={form.gender || ""}
//                 onChange={(e) => handleChange("gender", e.target.value)}
//               >
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>
//           </div>

//           {/* HEALTH CONDITIONS */}
//           <div>
//             <label className="text-sm font-semibold flex items-center gap-1">
//               <Heart className="w-4 h-4 text-red-500" />
//               Health Conditions
//             </label>
//             <textarea
//               className="w-full p-3 border rounded-lg mt-1"
//               rows={3}
//               placeholder="Diabetes, BP, Thyroid, etc."
//               value={form.conditions || ""}
//               onChange={(e) => handleChange("conditions", e.target.value)}
//             />
//             <span className="text-sm text-gray-500 ml-2">
//               **If information is not available, leave this field blank.
//             </span>
//           </div>

//           {/* ALLERGIES */}
//           <div>
//             <label className="text-sm font-semibold">Allergies</label>
//             <textarea
//               className="w-full p-3 border rounded-lg mt-1"
//               rows={2}
//               placeholder="Milk, peanuts, gluten, etc."
//               value={form.allergies || ""}
//               onChange={(e) => handleChange("allergies", e.target.value)}
//             />
//             <span className="text-sm text-gray-500 ml-2">
//               **If information is not available, leave this field blank.
//             </span>
//           </div>

//           {/* DIET */}
//           <div>
//             <label className="text-sm font-semibold">Diet Preference</label>
//             <select
//               className="w-full p-3 border rounded-lg mt-1"
//               value={form.diet || ""}
//               onChange={(e) => handleChange("diet", e.target.value)}
//             >
//               <option value="">Select Diet Type</option>
//               <option>Vegetarian</option>
//               <option>Vegan</option>
//               <option>Non-Vegetarian</option>
//               <option>Keto</option>
//               <option>Low Sugar</option>
//               <option>High Protein</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-sm font-semibold">Goal</label>
//             <textarea
//               className="w-full p-3 border rounded-lg mt-1"
//               rows={2}
//               placeholder="weight loss,weight gain,heartattack etc."
//               value={form.goal || ""}
//               onChange={(e) => handleChange("goal", e.target.value)}
//             />
//             <span className="text-sm text-gray-500 ml-2">
//               **What you want to achive from using this platform.
//             </span>
//           </div>
//           <div>
//             <label className="text-sm font-semibold">Suger Daily limit</label>
//             <input
//               type="number"
//               className="w-full p-3 border rounded-lg mt-1"
//               value={form.dailysugerlimit || ""}
//               placeholder="eg.25gm"
//               min={0}
//               max={500}
//               onChange={(e) => handleChange("dailysugerlimit", e.target.value)}
//             />
//             <span className="text-sm text-gray-500 ml-2">
//               **WHO’s healthiest target Keep free sugar intake below 25 grams
//               per day for long-term health.{}
//             </span>
//           </div>

//           <Button
//             onClick={saveChanges}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 mt-4 flex items-center justify-center gap-2"
//             disabled={saving}
//           >
//             {saving ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Edit3 className="w-5 h-5" />
//                 Save Changes
//               </>
//             )}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
