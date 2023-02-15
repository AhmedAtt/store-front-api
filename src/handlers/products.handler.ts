import { Request, Response } from 'express';
import { Product, ProductsModel } from '../models/product';

const model = new ProductsModel();

// list products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await model.index();
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}



// get product by id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = await model.show(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}


// create product[token required]
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
        const newProduct: Product = await model.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

// retrieve top 5 most popular products [optional]
export const getTopFiveProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await model.topFive();
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

// retrieve product by category [optional]

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: Product[] = await model.showByCategory(req.params.category);
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}