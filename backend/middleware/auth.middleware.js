import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protectRoute = async (req,res,next)=>{
    try{
        const accessToken = req.cookies.access_token;
        if(!accessToken){
            return res.status(404).json({message:"not authorized"});
        }
        const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({message:"not authorized"});
        }
        req.user = user;
        next();

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
}
export const adminRoute = async (req,res,next)=>{
    try{
        if (req.user && req.user.role === "admin"){
            next()
        }else{
            return res.status(403).json({message:"admin access only"});
        }
        }catch(err){
            console.error(err);
            return res.status(500).json({messge:"server error"});
        }
    }
