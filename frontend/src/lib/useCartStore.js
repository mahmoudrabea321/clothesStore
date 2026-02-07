import { create } from "zustand";
import axios from "./axios.jsx";
import toast from "react-hot-toast";

const useCartStore = create((set, get) => ({
  cart: [],
  totalAmount: 0,
  totalQuantity: 0,

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });

      const existingItem = get().cart.find(item => item.product._id === product._id);
      let newCart;
      if (existingItem) {
        newCart = get().cart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...get().cart, { product, quantity: 1 }];
      }

      const totalQuantity = newCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newCart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

      set({ cart: newCart, totalQuantity, totalAmount });
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  },

  removeFromCart: async (id) => {
    try {
      await axios.delete(`/cart/${id}`);
      const newCart = get().cart.filter(item => item.product._id !== id);

      const totalQuantity = newCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newCart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

      set({ cart: newCart, totalQuantity, totalAmount });
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  },
  

  updateCartItemQuantity: async (id, quantity) => {
    try {
      await axios.put(`/cart/${id}`, { quantity });

      const newCart = get().cart.map(item =>
        item.product._id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0); 
      const totalQuantity = newCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newCart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

      set({ cart: newCart, totalQuantity, totalAmount });
    } catch {
      toast.error("Failed to update quantity");
    }
  },

  getCartItems: async () => {
    try {
      const { data } = await axios.get("/cart");

      const validCart = data.cartItems.filter(item => item.product);

      const totalQuantity = validCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = validCart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

      set({ cart: validCart, totalQuantity, totalAmount });
    } catch {
      toast.error("Failed to fetch cart");
    }
  },

  clearCart: async () => {
      try {
        await axios.delete("/cart/clear");
        set({ cart: [], totalAmount: 0, totalQuantity: 0 });
        toast.success("Cart cleared");
      } catch {
        toast.error("Failed to clear cart");
      }
},

}));

export default useCartStore;
