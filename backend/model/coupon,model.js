import mongoose from "mongoose";

const CouponSchema  = new mongoose.Schema({
    code:{
        type:String,
        required:[true,"Coupon code is required"],
    },
    discountPrecentage:{
        type:Number,
        required:[true,"Discount precentage is required"],
        min:1,
        max:100
    },
    expirationDate:{
        type:Date,
        required:[true,"Expiration date is required"]
    },
    isActive:{
        type:Boolean,
        default:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{timestamps:true})


const Coupon = mongoose.model("Coupon",CouponSchema)
export default Coupon;