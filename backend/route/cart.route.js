import express from "express";
import { addToCart, getCartItems, removeFromCart, updateCartItemQuantity, clearCart } from "../controllers/cart.control.js";
import { protectRoute } from "../middleware/auth.middleware.js";
 
const router = express.Router();

router.post("/", protectRoute ,addToCart);
router.get("/",protectRoute,getCartItems);
router.delete("/:id",protectRoute,removeFromCart);
router.put("/:id",protectRoute,updateCartItemQuantity);
router.delete("/clear", clearCart);


export default router;