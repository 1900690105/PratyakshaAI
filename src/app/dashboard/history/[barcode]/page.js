"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { ForMeAnalysisCard } from "@/app/dashboard/components/PersonalizeData";
import { Loader2 } from "lucide-react";
import ProductInfo from "@/app/dashboard/components/ProductInfo";
import { useCurrentUser } from "@/app/components/GetUID";
import { Button } from "@/components/ui/button";

export default function ProductHistoryDetail() {
  const { barcode } = useParams();
  const { uid } = useCurrentUser();

  const [product, setProduct] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!barcode || !uid) return;

    async function fetchData() {
      setLoading(true);

      try {
        /* ---------------------------
           1️⃣ PRODUCT DETAILS
        ---------------------------- */
        const productRef = doc(db, "productdetails", barcode);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data());
        }

        /* ---------------------------
           2️⃣ AI RESULT (USER SPECIFIC)
        ---------------------------- */
        const q = query(
          collection(db, "airesult"),
          where("uid", "==", uid),
          where("barcode", "==", barcode)
        );

        const aiSnap = await getDocs(q);

        if (!aiSnap.empty) {
          setAnalysis(aiSnap.docs[0].data().analysis);
        }
      } catch (error) {
        console.error("Failed to load product history:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [barcode, uid]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!product || !analysis) {
    return <p className="text-center text-gray-500">Data not available</p>;
  }

  return (
    <>
      <div className="space-y-6">
        {/* PRODUCT DETAILS */}
        <ProductInfo data={product} />

        {/* AI ANALYSIS (REUSED COMPONENT) */}
        <ForMeAnalysisCard analysis={analysis} />
      </div>
    </>
  );
}
