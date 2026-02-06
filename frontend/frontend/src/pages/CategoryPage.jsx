import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../lib/useProductStore.jsx";
import ProductCart from "../component/productCart.jsx";

const CategoryPage = () => {
  const { category } = useParams();
  const { getCategoryProducts, products } = useProductStore();

  useEffect(() => {
    getCategoryProducts(category);
  }, [category, getCategoryProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize">
          {category}
        </h1>
        <p className="text-gray-500 mt-1">
          {products.length} products found
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
