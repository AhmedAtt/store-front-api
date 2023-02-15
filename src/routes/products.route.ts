import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    getTopFiveProducts,
    getProductsByCategory
} from "../handlers/products.handler";
import {authorize} from "../middleware/auth";

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', authorize, createProduct);
router.get('/products/topfive', getTopFiveProducts);
router.get('/products/category/:category', getProductsByCategory);

export default router;