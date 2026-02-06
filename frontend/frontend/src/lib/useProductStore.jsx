import { create } from "zustand";
import axios from "./axios.jsx";

const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,

  // 🔹 Get all products
  getAllProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get("/products");
      set({ products: data.products, loading: false });
    } catch (err) {
      console.error("Get products error:", err);
      set({ error: err, loading: false });
    }
  },

  // 🔹 Get featured products
  getFeaturedProducts: async () => {
    try {
      const { data } = await axios.get("/products/featured");
      set({ featuredProducts: data.products });
    } catch (err) {
      console.error("Get featured error:", err);
    }
  },

  // 🔹 Create product (Admin)
  createProduct: async (productData) => {
    try {
      const { data } = await axios.post("/products", productData);
      set({ products: [...get().products, data.product] });
      return data.product;
    } catch (err) {
      console.error("Create product error:", err);
      throw err;
    }
  },

  // 🔹 Delete product (Admin)
  deleteProduct: async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      set({
        products: get().products.filter((p) => p._id !== id),
      });
    } catch (err) {
      console.error("Delete product error:", err);
      throw err;
    }
  },

  // 🔹 Toggle featured
  toggleProducts: async (id) => {
    try {
      const { data } = await axios.patch(`/products/toggle/${id}`);
      set({
        products: get().products.map((p) =>
          p._id === id ? data.product : p
        ),
      });
    } catch (err) {
      console.error("Toggle product error:", err);
      throw err;
    }
  },

  // 🔹 Category products
  getCategoryProducts: async (category) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(
        `/products/category/${category}`
      );
      set({ products: data.products, loading: false });
    } catch (err) {
      console.error("Category error:", err);
      set({ loading: false });
    }
  },

  // 🔹 Recommended products
  getRecommendedProducts: async () => {
    try {
      const { data } = await axios.get("/products/recommended");
      set({ products: data.products });
    } catch (err) {
      console.error("Recommended error:", err);
    }
  },
}));

export default useProductStore;
