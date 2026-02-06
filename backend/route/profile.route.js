import express from "express";
import {
  getProfile,
  updateProfile,
  getOrderHistory,
} from "../controllers/profile.control.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getProfile);
router.put("/", protectRoute, updateProfile);
router.get("/orders", protectRoute, getOrderHistory);

export default router;
