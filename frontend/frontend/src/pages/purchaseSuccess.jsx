import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../lib/axios.jsx";
import useCartStore from "../lib/useCartStore.js";

const PurchaseSuccess = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) return;

      try {
        await axios.post("/payment/checkout_success", { sessionId });
        clearCart(); // ✅ clear frontend AFTER backend success
      } catch (error) {
        console.error("Payment confirmation failed:", error);
      }
    };

    confirmPayment();
  }, [sessionId, clearCart]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <Confetti width={width} height={height} numberOfPieces={300} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully
          and is being processed.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/orders"
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
          >
            View My Orders
          </Link>

          <Link
            to="/"
            className="border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-medium transition"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccess;
