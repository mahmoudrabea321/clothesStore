import User from "../model/user.model.js";
import Product from "../model/product.model.js";


export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.cartItems) {
      user.cartItems = [];
    }

    const existingItem = user.cartItems.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cartItems.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      cartItems: user.cartItems
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params; 
    const { quantity } = req.body;
    const user = req.user;

    if (!user || !user.cartItems) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const cartItem = user.cartItems.find(
      item => item.productId.toString() === id
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      user.cartItems = user.cartItems.filter(
        item => item.productId.toString() !== id
      );
    } else {
      cartItem.quantity = quantity;
    }

    await user.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cartItems: user.cartItems
    });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // productId
    const user = req.user;

    if (!user || !user.cartItems) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    user.cartItems = user.cartItems.filter(
      item => item.productId.toString() !== id
    );

    await user.save();

    res.status(200).json({
      message: "Item removed from cart successfully",
      cartItems: user.cartItems
    });
  } catch (error) {
    console.error("REMOVE FROM CART ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getCartItems = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.cartItems || user.cartItems.length === 0) {
      return res.status(200).json({ cartItems: [] });
    }

    const products = await Product.find({
      _id: { $in: user.cartItems.map(item => item.productId) }
    });

    const cartItems = user.cartItems
  .map(item => {
    const product = products.find(
      p => p._id.toString() === item.productId.toString()
    );

    if (!product) return null; 

    return {
      product,
      quantity: item.quantity,
    };
  })
  .filter(Boolean); 

    res.status(200).json({ cartItems });

  } catch (error) {
    console.error("GET CART ITEMS ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.cartItems = []; 
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
