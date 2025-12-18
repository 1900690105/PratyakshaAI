"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useCurrentUser } from "@/app/components/GetUID";

export default function LoginPage() {
  const router = useRouter();
  const { uid, loading: authLoading } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  /* --------------------------------
     ✅ If already logged in → redirect
  --------------------------------- */
  useEffect(() => {
    if (!authLoading && uid) {
      router.replace("/dashboard");
    }
  }, [uid, authLoading, router]);

  const validate = () => {
    if (!email.includes("@")) return "Invalid email address.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
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

    try {
      setLoading(true);

      // 1️⃣ Firebase client login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      // 2️⃣ Store token + uid via API (ONLY place cookies are set)
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          uid: user.uid,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create session");
      }

      // 3️⃣ Redirect AFTER cookies are set
      router.replace("/dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     Loading state while checking auth
  --------------------------------- */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-6">
          <LogIn className="w-12 h-12 mx-auto text-emerald-600" />
          <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">
            Login to continue to PratyakshaAI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {errorMsg && (
            <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded-lg">
              {errorMsg}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/signup"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
