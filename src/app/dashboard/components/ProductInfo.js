import Image from "next/image";

function ProductInfo({ data }) {
  if (!data) return null;

  const product = data;

  return (
    <div className="mt-6 bg-white rounded-xl shadow p-5 space-y-4">
      {product.image_front_url && (
        <Image
          src={product.image_front_url}
          alt={product.product_name}
          width={400}
          height={250}
          className="rounded-lg w-full object-cover"
        />
      )}

      <div>
        <h2 className="text-2xl font-bold">{product.product_name}</h2>
        <p className="text-gray-600">
          {product.brands} • {product.quantity}
        </p>
      </div>

      <div className="flex gap-3">
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
          NutriScore {product.nutriscore_grade?.toUpperCase()}
        </span>
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
          NOVA {product.nova_group}
        </span>
      </div>

      <div>
        <h3 className="font-semibold">Ingredients</h3>
        <p className="text-sm text-gray-700">{product.ingredients_text}</p>
      </div>

      <div>
        <h3 className="font-semibold">Allergens from ingredients</h3>

        {product?.allergens_hierarchy?.map((item, index) => (
          <p className="text-sm text-gray-700" key={index}>
            {item.replace("en:", "").toUpperCase()}
          </p>
        ))}
      </div>
      <div>
        <h3 className="font-semibold">Nutriments (per 100g)</h3>

        {product?.nutriments ? (
          <div className="space-y-1 mt-2">
            {Object.entries(product.nutriments)
              .filter(([key]) => key.endsWith("_100g")) // show only per 100g values
              .map(([key, value], index) => (
                <p className="text-sm text-gray-700" key={index}>
                  <span className="font-medium">
                    {key.replace("_100g", "").replace(/-/g, " ").toUpperCase()}
                  </span>
                  : {value}
                </p>
              ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No nutriment data available</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold">Nutrition (per 100g)</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Energy: {product.nutriments?.["energy-kcal_100g"]} kcal</p>
          <p>Fat: {product.nutriments?.fat_100g} g</p>
          <p>Sugar: {product.nutriments?.sugars_100g} g</p>
          <p>Salt: {product.nutriments?.salt_100g} g</p>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
