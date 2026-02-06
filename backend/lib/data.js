import { truncates } from "bcryptjs";
import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
     console.log(" connected to data")

    } catch (error) {
        console.log("cannot to connect the database")
    }
}