import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME || 'den1qdi8n', 
        api_key: process.env.API_KEY || '251682685178562', 
        api_secret: process.env.API_SECRET 
    });
    
    export default cloudinary;
