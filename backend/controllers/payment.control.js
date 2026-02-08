import Stripe from "stripe";
import Order from "../model/order.model.js";
import User  from "../model/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE CHECKOUT SESSION
export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const user = req.user._id;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    //  Create a new Stripe session for each order
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        user: user.toString(),
      },
    });

    if (!session || !session.id) {
      return res.status(500).json({ message: "Stripe session failed to create" });
    }

    // Create order in DB with stripeSessionId
    const order = await Order.create({
      user,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount,
      stripeSessionId: session.id, 
      status: "PENDING",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error.message);
    res.status(500).json({ message: "Checkout failed" });
  }
};

// CHECKOUT SUCCESS
export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID missing" });
    }

    // ✅ 1. Ask Stripe if payment is real
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(401).json({ message: "Payment not completed" });
    }

    // ✅ 2. Get logged-in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ 3. Clear cart in DB
    user.cartItems = [];
    await user.save();

    // ✅ 4. Update order status (if you have orders)
    await Order.findOneAndUpdate(
      { stripeSessionId: session.id },
      { status: "PAID" }
    );

    res.status(200).json({ message: "Payment confirmed & cart cleared" });

  } catch (error) {
    console.error("Checkout success error:", error);
    res.status(500).json({ message: "Server error" });
  }
};