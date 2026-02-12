import express from "express";
import dotenv from "dotenv";
import AuthRoute from "./route/auth.route.js";
import { connectDB } from "./lib/data.js";
import cookieParser from "cookie-parser"; 
import Cart from "./route/cart.route.js";
import coupon from "./route/coupon.route.js";
import Product from "./route/product.route.js";
import cors from "cors";
import Payment from "./route/payment.route.js";
import profile from "./route/profile.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
 

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser()); 
app.use(
  cors({
    origin:true,
    credentials: true,
  })
);
app.use('/api/auth', AuthRoute);
app.use('/api/products',Product);
app.use('/api/cart', Cart);
app.use('/api/coupon', coupon);
app.use('/api/payment',Payment)
app.use('/api/profile',profile)

const frontendPath = path.join(__dirname, "..", "frontend", "dist");

app.use(express.static(frontendPath));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


app.listen(process.env.PORT, () => {
  console.log(`The server is running on ${process.env.PORT}`);
});



 