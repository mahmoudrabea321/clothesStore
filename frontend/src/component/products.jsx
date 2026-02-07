import React, { useEffect } from "react";
import useProductStore from "../lib/useProductStore.jsx";

const Products = () => {
  const { products, getAllProducts, toggleProducts, deleteProduct } =
    useProductStore();

  // Fetch products on component mount
  useEffect(() => {
    getAllProducts();
  }, []);

  const handleToggle = (productId) => {
    toggleProducts(productId);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-zinc-900 text-white">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <table className="w-full table-auto border-collapse border border-zinc-700">
        <thead>
          <tr className="bg-zinc-800">
            <th className="border border-zinc-700 px-4 py-2">Name</th>
            <th className="border border-zinc-700 px-4 py-2">Image</th>
            <th className="border border-zinc-700 px-4 py-2">Price</th>
            <th className="border border-zinc-700 px-4 py-2">Featured</th>
            <th className="border border-zinc-700 px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No products available
              </td>
            </tr>
          )}

          {products.map((product) => (
            <tr key={product._id} className="bg-zinc-800 hover:bg-zinc-700">
              <td className="border border-zinc-700 px-4 py-2">
                {product.name}
              </td>

              <td className="border border-zinc-700 px-4 py-2">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  "No image"
                )}
              </td>

              <td className="border border-zinc-700 px-4 py-2">
                ${product.price}
              </td>

              <td className="border border-zinc-700 px-4 py-2">
                {product.isFeatured ? "Yes" : "No"}
              </td>

              <td className="border border-zinc-700 px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleToggle(product._id)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Toggle
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
