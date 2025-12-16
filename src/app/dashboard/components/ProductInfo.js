import { Button } from "@/components/ui/button";
import Image from "next/image";

function ProductInfo({ data }) {
  if (!data) return null;

  const product = data;

  return (
    <div className="mt-6 bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section with Image */}
      <div className="relative bg-linear-to-r from-blue-500 to-purple-600 p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {product.image_front_url && (
            <div className="shrink-0">
              <Image
                src={product.image_front_url}
                alt={product.product_name}
                width={200}
                height={200}
                className="rounded-xl shadow-xl object-cover bg-white p-2"
              />
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {product.product_name}
            </h2>
            <p className="text-blue-100 text-sm md:text-base">
              {product.brands} {product.quantity && `• ${product.quantity}`}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {product.nutriscore_grade && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs md:text-sm font-semibold border border-white/30">
                  NutriScore {product.nutriscore_grade.toUpperCase()}
                </span>
              )}
              {product.nova_group && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs md:text-sm font-semibold border border-white/30">
                  NOVA {product.nova_group}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Nutrition Highlights */}
        {product.nutriments && (
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-green-600">📊</span> Nutrition Facts
              <span className="text-xs md:text-sm font-normal text-gray-500">
                (per 100g)
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>Energy: {product.nutriments?.["energy-kcal_100g"]} kcal</p>
              <p>Fat: {product.nutriments?.fat_100g} g</p>
              <p>Sugar: {product.nutriments?.sugars_100g} g</p>
              <p>Salt: {product.nutriments?.salt_100g} g</p>
            </div>
          </div>
        )}

        {/* Ingredients */}
        {product.ingredients_text && (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🧪</span> Ingredients
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {product.ingredients_text}
            </p>
          </div>
        )}

        {/* Allergens */}
        {product?.allergens_hierarchy &&
          product.allergens_hierarchy.length > 0 && (
            <div className="bg-red-50 rounded-xl p-4 md:p-6 shadow-sm border border-red-100">
              <h3 className="text-lg md:text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
                <span>⚠️</span> Allergens
              </h3>
              <div className="flex flex-wrap gap-2">
                {product?.allergens_hierarchy?.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-red-200 text-red-800 rounded-full text-xs md:text-sm font-medium"
                  >
                    {item.replace("en:", "").replace(/-/g, " ").toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Detailed Nutriments Table */}
        {product.nutriments && (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Complete Nutrition Table
              <span className="text-xs md:text-sm font-normal text-gray-500">
                (per 100g)
              </span>
            </h3>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Nutrient
                      </th>
                      <th className="px-4 md:px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {Object.entries(product.nutriments)
                      .filter(([key]) => key.endsWith("_100g"))
                      .sort(([a], [b]) => {
                        // Sort to put most important nutrients first
                        const priority = [
                          "energy-kcal_100g",
                          "energy_100g",
                          "fat_100g",
                          "saturated-fat_100g",
                          "carbohydrates_100g",
                          "sugars_100g",
                          "fiber_100g",
                          "proteins_100g",
                          "salt_100g",
                          "sodium_100g",
                        ];
                        const indexA = priority.indexOf(a);
                        const indexB = priority.indexOf(b);
                        if (indexA !== -1 && indexB !== -1)
                          return indexA - indexB;
                        if (indexA !== -1) return -1;
                        if (indexB !== -1) return 1;
                        return a.localeCompare(b);
                      })
                      .map(([key, value], index) => {
                        const nutrientName = key
                          .replace("_100g", "")
                          .replace(/-/g, " ")
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ");

                        return (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                              {nutrientName}
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 text-right font-semibold">
                              {typeof value === "number"
                                ? value.toFixed(2)
                                : value}
                              <span className="text-gray-500 ml-1 font-normal">
                                {key.includes("energy-kcal")
                                  ? "kcal"
                                  : key.includes("energy") &&
                                    !key.includes("kcal")
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
            </div>

            {/* Mobile-friendly message */}
            <p className="text-xs text-gray-500 mt-3 md:hidden text-center">
              Scroll horizontally to view full table
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;
