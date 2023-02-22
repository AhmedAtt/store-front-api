import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
} from "../handlers/products.handler";
import {authorize} from "../middleware/auth";

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', authorize, createProduct);

export default router;