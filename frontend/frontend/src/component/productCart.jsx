import React from "react";
import { motion } from "framer-motion";
import useCartStore from "../lib/useCartStore.js";

const ProductCart = ({ product }) => {

const {  addToCart } = useCartStore();



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="h-52 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold truncate">
          {product.name}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCart;
