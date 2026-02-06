import mongoose, { trusted } from "mongoose";

const ProductSchema  = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Product name is required"]
        },
        description:{
            type:String,
            required:[true,"product descrition is required"]
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        stock:{
            type:Number,
            default:0
        },
        isFeatured:{
            type:Boolean,
            default:false
            }
        },{timestamps:true}
    
)
const Product = mongoose.model("Product",ProductSchema)
export default Product;

