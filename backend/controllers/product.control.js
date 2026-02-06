import Product from '../model/product.model.js';
import cloudinary from '../lib/cloudinary.js';

export const getAllProducts = async(req,res)=>{

    try{
        const products = await Product.find({});
        return res.status(200).json({products});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Server error"})
    }
    };


export const getFeaturedProducts = async(req,res)=>{
    try{
        const products = await Product.find({isFeatured:true});
        return res.status(200).json({products});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"})
    }
}

export const createProduct = async (req,res)=>{
    try{
        const{ name , description , price , category , image , isFeatured }= req.body;
        let cloudinaryResponse = null;
        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image,{
                folder:"products"
            })
        }
        const newProduct = new Product({
            name,
            description,
            price: Number(price),
            category,
            image: cloudinaryResponse?.secure_url || '',
            isFeatured: Boolean(isFeatured),
        });
         if (!name || !description || !price || !category || !image) {
        return res.status(400).json({ message: "All fields are required" });
         }
        await newProduct.save();
        return res.status(201).json({message:"product created successfully",product:newProduct})
        }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
}

export const deleteProduct =  async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        if(product.image){
            const publicId = product.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`products/${publicId}`);
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({message:"product deleted successfully"});
        
    }

export const toggleProducts = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
           return res.status(404).json({message:"product not found"});
        }
        product.isFeatured = !product.isFeatured;
        await product.save();
        return res.status(200).json({message:"product toggled successfully",product});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
}
export const getCategoryProducts = async (req,res)=>{
    try{
        const category = req.params.category;
        const products = await Product.find({category});
        return res.status(200).json({products});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
}

export const getRecommendedProducts = async (req,res)=>{
    try{
        const products = await Product.find({}).limit(10);
        return res.status(200).json({products});
    
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
}