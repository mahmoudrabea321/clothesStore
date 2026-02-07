import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const PurchaseCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <XCircle size={64} className="mx-auto text-red-500 mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made.
          You can return to your cart and try again anytime.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/cart"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Back to Cart
          </Link>

          <Link
            to="/"
            className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCancel;
