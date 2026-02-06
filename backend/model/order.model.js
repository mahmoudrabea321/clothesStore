import mongoose from "mongoose";
import Stripe from "stripe";

const OrderSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        products:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                },
                quantity:{
                    type:Number,
                    default:1
                },
                price:{
                    type:Number,
                    required:true,
                    min:0
                }, 
            }
        ],
        totalAmount:{
            type:Number,
            required:true
        },
       stripeSessionId: {
            type: String,
            unique: true,
            sparse: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "PAID"],
            default: "PENDING",
        },
        },
        {timestamps:true}
)

const Order = mongoose.model("Order",OrderSchema);

export default Order;