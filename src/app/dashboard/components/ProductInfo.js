"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

function ProductInfo({ data }) {
  const { barcode } = useParams();
  const router = useRouter();
  if (!data) return null;

  const product = data;

  return (
    <div className="mt-4 sm:mt-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 md:p-8">
        {barcode && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start mt-6 sm:mt-0">
          {/* IMAGE */}
          {product.image_front_url && (
            <div className="shrink-0">
              <Image
                src={product.image_front_url}
                alt={product.product_name}
                width={180}
                height={180}
                className="rounded-xl shadow-xl object-contain bg-white p-2 w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52"
              />
            </div>
          )}

          {/* PRODUCT INFO */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              {product.product_name}
            </h2>

            <p className="text-blue-100 text-xs sm:text-sm md:text-base mt-1">
              {product.brands}
              {product.quantity && ` • ${product.quantity}`}
            </p>

            {/* BADGES */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              {product.nutriscore_grade && (
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                  NutriScore {product.nutriscore_grade.toUpperCase()}
                </span>
              )}
              {product.nova_group && (
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                  NOVA {product.nova_group}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-5 sm:space-y-6">
        {/* NUTRITION HIGHLIGHTS */}
        {product.nutriments && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              📊 Nutrition Facts
              <span className="text-xs sm:text-sm font-normal text-gray-500">
                (per 100g)
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm">
              <p>Energy: {product.nutriments["energy-kcal_100g"]} kcal</p>
              <p>Fat: {product.nutriments.fat_100g} g</p>
              <p>Sugar: {product.nutriments.sugars_100g} g</p>
              <p>Salt: {product.nutriments.salt_100g} g</p>
            </div>
          </div>
        )}

        {/* INGREDIENTS */}
        {product.ingredients_text && (
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              🧪 Ingredients
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              {product.ingredients_text}
            </p>
          </div>
        )}

        {/* ALLERGENS */}
        {product.allergens_hierarchy?.length > 0 && (
          <div className="bg-red-50 rounded-xl p-4 sm:p-6 shadow-sm border border-red-100">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
              ⚠️ Allergens
            </h3>

            <div className="flex flex-wrap gap-2">
              {product.allergens_hierarchy.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-red-200 text-red-800 rounded-full text-[10px] sm:text-xs md:text-sm font-medium"
                >
                  {item.replace("en:", "").replace(/-/g, " ").toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* COMPLETE NUTRITION TABLE */}
        {product.nutriments && (
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📋 Complete Nutrition Table
              <span className="text-xs sm:text-sm font-normal text-gray-500">
                (per 100g)
              </span>
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700 uppercase">
                      Nutrient
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-right font-semibold text-gray-700 uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {Object.entries(product.nutriments)
                    .filter(([key]) => key.endsWith("_100g"))
                    .map(([key, value], index) => {
                      const nutrientName = key
                        .replace("_100g", "")
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());

                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "bg-gray-50" : ""}
                        >
                          <td className="px-3 sm:px-4 py-2 font-medium text-gray-900">
                            {nutrientName}
                          </td>
                          <td className="px-3 sm:px-4 py-2 text-right font-semibold text-gray-700">
                            {typeof value === "number"
                              ? value.toFixed(2)
                              : value}
                            <span className="text-gray-500 ml-1 font-normal">
                              {key.includes("kcal")
                                ? "kcal"
                                : key.includes("energy")
                                ? "kJ"
                                : "g"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-500 mt-3 text-center sm:hidden">
              Swipe horizontally to view full table
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;
