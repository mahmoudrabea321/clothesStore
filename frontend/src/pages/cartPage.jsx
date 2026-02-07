import {React , useEffect} from "react";
import useCartStore from "../lib/useCartStore.js";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js"
import axios from "../lib/axios.jsx";

const CartPage = () => {
  const { cart, totalAmount, totalQuantity , getCartItems , removeFromCart, updateCartItemQuantity } = useCartStore();
  const stripePromise = loadStripe("pk_test_51SeuRKCFmwfpLUfnVuidwNa33obdWInvnWQmiW9Jbp1FxAGfk7L1DXntQ62BiGZBzE48YCSglKUqbB1sM2M1j61M00ZOeEgdaL")

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);


  const handlePayment = async () => {
  const stripe = await stripePromise;

  const response = await axios.post(
    "/payment/checkout_session_Id",
    {
      cartItems: cart, 
    }
  );

  window.location.href = response.data.url;
};


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500 mb-6">
            Your cart is empty.
          </p>
          <Link
            to="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Total</th>
                  </tr>
                </thead>

               <tbody>
                {cart
                .filter(item => item?.product) 
                .map((item, index) => (
                  <tr key={item.product._id || index} className="border-b">
                    <td>{item.product.name}</td>

                    <td>${item.product.price}</td>

                    <td className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateCartItemQuantity(item.product._id, item.quantity - 1);
                          } else {
                            removeFromCart(item.product._id);
                          }
                        }}
                        className="p-1 border rounded"
                      >
                        <Minus size={16} />
                      </button> 

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                        className="p-1 border rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </td>

                    <td>${item.product.price * item.quantity}</td>

                    <td>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Total items</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="flex justify-between mb-6 text-lg font-bold">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            onClick={ handlePayment }>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
