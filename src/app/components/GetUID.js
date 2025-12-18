// "use client";

// import { useEffect, useState } from "react";

// export function useCurrentUser() {
//   const [uid, setUid] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/me")
//       .then((res) => {
//         if (!res.ok) throw new Error("Not authenticated");
//         return res.json();
//       })
//       .then((data) => {
//         setUid(data.uid ?? null);
//       })
//       .catch(() => setUid(null))
//       .finally(() => setLoading(false));
//   }, []);

//   return { uid, loading };
// }
"use client";

import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");

        // ✅ Not logged in (NORMAL)
        if (res.status === 401) {
          if (mounted) {
            setUid(null);
            setLoading(false);
          }
          return;
        }

        // ❌ Real server error
        if (res.status >= 500) {
          throw new Error("Server auth error");
        }

        const data = await res.json();

        if (mounted && data.authenticated) {
          setUid(data.uid);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        if (mounted) setUid(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return { uid, loading };
}
