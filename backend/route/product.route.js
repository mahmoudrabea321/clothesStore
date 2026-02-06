import express from 'express';
import {getAllProducts,
        getRecommendedProducts,
        getCategoryProducts,
        createProduct, 
        deleteProduct,
        toggleProducts,
        getFeaturedProducts

} from '../controllers/product.control.js';

import { protectRoute ,adminRoute } from '../middleware/auth.middleware.js';

const route = express.Router();

route.get('/',getAllProducts);
route.get('/featured',getFeaturedProducts);
route.get('/recommended',getRecommendedProducts);
route.post('/',createProduct);
route.delete('/:id',deleteProduct);
route.patch('/toggle/:id',toggleProducts);
route.get('/category/:category',getCategoryProducts);

export default route;