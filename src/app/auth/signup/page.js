// "use client";

// import { useState } from "react";
// import { Eye, EyeOff, Mail, Lock, UserPlus } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "@/lib/firebase";
// import { saveAuthToken } from "@/lib/auth";
// import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// export default function SignUpPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     if (!email.includes("@")) return "Invalid email format.";
//     if (password.length < 6) return "Password must be at least 6 characters.";
//     if (password !== confirm) return "Passwords do not match.";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     console.log("🚀 Submit triggered");

//     const validationError = validate();
//     if (validationError) {
//       console.warn("❌ Validation failed:", validationError);
//       setErrorMsg(validationError);
//       return;
//     }

//     setLoading(true);
//     console.log("⏳ Loading started");

//     try {
//       // 1. CREATE USER
//       console.log("🔐 Creating user with email:", email);

//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       console.log("✅ User created:", userCredential);

//       const user = userCredential.user;

//       // 2. GET ID TOKEN
//       console.log("🎟️ Getting ID token...");
//       const token = await user.getIdToken();

//       console.log("✅ Token received:", token);

//       // 3. SAVE TOKEN + UID IN COOKIES (SERVER)
//       console.log("🍪 Saving auth token to server...");
//       await saveAuthToken(token, user.uid);

//       console.log("✅ Token saved successfully");

//       // 4. CREATE USER DOCUMENT
//       console.log("📝 Creating Firestore user document...");
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         createdAt: serverTimestamp(),
//       });

//       console.log("✅ Firestore user document created");

//       // 5. REDIRECT
//       console.log("➡️ Redirecting to dashboard");
//       router.push("/dashboard");
//     } catch (err) {
//       console.error("🔥 Signup error occurred");
//       console.error("Error object:", err);
//       console.error("Error code:", err.code);
//       console.error("Error message:", err.message);

//       setErrorMsg(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//       console.log("🛑 Loading stopped");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <UserPlus className="w-12 h-12 mx-auto text-indigo-600" />
//           <h2 className="text-2xl font-bold mt-2">Create Your Account</h2>
//           <p className="text-gray-600 text-sm">
//             Join and start scanning healthier
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* EMAIL */}
//           <div>
//             <label className="text-sm font-semibold">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 suppressHydrationWarning
//                 type="email"
//                 className="w-full mt-1 pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="example@mail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="text-sm font-semibold">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full mt-1 pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="******"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-4 top-3 text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div>
//             <label className="text-sm font-semibold">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//               placeholder="******"
//               value={confirm}
//               onChange={(e) => setConfirm(e.target.value)}
//             />
//           </div>

//           {/* ERROR */}
//           {errorMsg && (
//             <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
//               {errorMsg}
//             </div>
//           )}

//           {/* SUBMIT */}
//           <Button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-base rounded-lg"
//             disabled={loading}
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </Button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a
//             href="/auth/login"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { saveAuthToken } from "@/lib/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.includes("@")) return "Invalid email format";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirm) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Get Firebase ID token
      const token = await user.getIdToken();

      // 3️⃣ Save token in HTTP-only cookies
      await saveAuthToken(token, user.uid);

      // 4️⃣ Create Firestore user document
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });

      // 5️⃣ Redirect
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <UserPlus className="w-12 h-12 mx-auto text-indigo-600" />
          <h2 className="text-2xl font-bold mt-2">Create Account</h2>
          <p className="text-sm text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                suppressHydrationWarning
                type="email"
                className="w-full mt-1 pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="******"
            />
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
