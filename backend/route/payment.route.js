import express from "express";
import { createCheckoutSession,checkoutSuccess } from "../controllers/payment.control.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/checkout_session_Id",protectRoute , createCheckoutSession);
router.post("/checkout_success",protectRoute ,checkoutSuccess); 
 
export default router;
